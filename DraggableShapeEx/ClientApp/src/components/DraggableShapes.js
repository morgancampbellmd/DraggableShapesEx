import React, { Component } from "react";
import Draggable from "react-draggable";
import $ from "jquery";

export class DraggableShapes extends Component {
  static displayName = DraggableShapes.name;

  constructor(props) {
    super(props);
    this.state = { shapes: [], loading: true, currentShape: null, 
      
      currentColor: "rgb(0, 0, 0)",
      
      isDragging: false, 
      
      originalX: 0, originalY: 0, 
      
      translateX: 0, translateY: 0, 
      
      lastTranslateX: 0, lastTranslateY: 0};
  }

  
  componentDidMount() {
    this.populateShapeList();
  }
  
  renderShapesList(shapes) {
    
    for(let i=0; i<shapes.length; i++) {
      let optn = shapes[i]["name"];
      let optnExists = false;
      $("#arr option").each(function() {
        if($(this).text() === optn) {
          optnExists = true;
        }
      })
      if(!optnExists) {
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        document.getElementById("arr").appendChild(el);
        this.state.currentShape = optn;
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
    
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(prevState => ({
      translateX: clientX - prevState.originalX + prevState.lastTranslateX,
      translateY: clientY - prevState.originalY + prevState.lastTranslateY
    }), () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
    this.setState({
      currentColor: "rgb( " + this.state.translateX / window.innerWidth * 255 + 
          ", " + this.state.translateY / window.innerHeight * 255 + 
          ", " + (1 - (this.state.translateX / window.innerWidth + this.state.translateY / window.innerHeight)/2) * 255 + 
          ")"
    });
    
    if(this.state.currentShape === "triangle") { 
      document.getElementById("drag-shape").style.borderBottomColor = this.state.currentColor;
      document.getElementById("drag-shape").style.background = "";
    }
    else {
      document.getElementById("drag-shape").style.borderBottom = "";
      document.getElementById("drag-shape").style.background = this.state.currentColor;
    }
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    
    this.setState(
        {
          originalX: 0,
          originalY: 0,
          lastTranslateX: this.state.translateX,
          lastTranslateY: this.state.translateY,

          isDragging: false
        },
        () => {
          if (this.props.onDragEnd) {
            this.props.onDragEnd();
          }
        }
    );
  };
  
  
  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderShapesList(this.state.shapes);
        
    return (
        <div>
          <h1 id="tabelLabel">Shapes List</h1>
          <p>This component demonstrates fetching data from the server.</p>
          {contents}
          <select id="arr" onChange={e => this.setState({"currentShape": e.target.value})}></select>
          <Draggable id="draggable"
                     onMouseDown={this.handleMouseDown}>
            <div id="drag-shape" className={this.state.currentShape}></div>
          </Draggable>
            
        </div> 
        
    );
  }
  
  async populateShapeList() {
    const response = await fetch("shape");
    const data = await response.json();
    this.setState({ shapes: data, loading: false });
  }
}
