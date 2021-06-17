import React, { Component } from 'react';

export class DraggableShapes extends Component {
  static displayName = DraggableShapes.name;

  constructor(props) {
    super(props);
    this.state = { shapes: [], loading: true };
  }

  componentDidMount() {
    this.populateShapeList();
  }

  static renderShapesList(shapes) {
    for(var i=0; i<shapes.length; i++) {
      var optn = shapes[i];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      document.getElementById('arr').appendChild(el);
    }
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
          <select id='arr'></select>
        </div>
    );
  }

  async populateShapeList() {
    console.log("here");
    const response = await fetch('shapes');
    const data = await response.body;
    console.log(data);
    this.setState({ shapes: data, loading: false });
  }
}
