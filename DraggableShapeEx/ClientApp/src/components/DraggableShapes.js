import React, { Component } from 'react';
import Draggable from "react-draggable";
/*
function changeObject(e) {
  shapes.forEach(function update(item, index, arr) {
    let dropdown = document.getElementById('arr');
    console.log(dropdown.value + " and " + item['name'])
    if(item['name'] === dropdown.value) {
      console.log(item['name'])
      return ( <div class={dropdown.value}></div> )
    }
  })
}
*/

export class DraggableShapes extends Component {
  static displayName = DraggableShapes.name;

  constructor(props) {
    super(props);
    this.state = { shapes: [], loading: true, currentShape: null};
  }

  
  componentDidMount() {
    this.populateShapeList();
  }
  
  static renderShapesList(shapes) {
    
    for(var i=0; i<shapes.length; i++) {
      var optn = shapes[i]['name'];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      document.getElementById('arr').appendChild(el);
    }
    //return (document.getElementById('arr').addEventListener('change', changeObject(shapes)))
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : DraggableShapes.renderShapesList(this.state.shapes);
        
        
        
    return (
        <div>
          <h1 id="tabelLabel" >Shapes List</h1>
          <p>This component demonstrates fetching data from the server.</p>
          {contents}
          <Draggable>
            <div id='drag-wrapper' className={this.state.currentShape} style={{background: this.getBoundingClientRect().left/255 }}></div></Draggable>
          <select id='arr' onChange={e => this.setState({"currentShape": e.target.value})}></select>
        </div>
        
    );
  }


  
  async populateShapeList() {
    const response = await fetch('shape');
    const data = await response.json();
    console.log(data);
    this.setState({ shapes: data, loading: false });
  }
}
