import React, { Component } from "react";

export class AntSimulator extends Component {
  static displayName = AntSimulator.name;

  constructor(props) {
    super(props);
    this.state = { kMoves: 0, antPositionY: 1, antPositionX: 1, antDirection: 90, board: [4][4]};
    this.animateKMoves = this.animateKMoves.bind(this);
    AntSimulator.updateBoardWhite = AntSimulator.updateBoardWhite.bind(this);
    AntSimulator.updateBoardBlack = AntSimulator.updateBoardBlack.bind(this);
  }

  animateClockwise() {
  }
  
  animateCounterclockwise() {
    
  }
  
  static updateBoardWhite() {
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.add("flipper");
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.add("back");
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.remove("front");
  }
  static updateBoardBlack() {
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.add("flipper");
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.add("front");
    document.getElementById("grid-" + this.state.antPositionY.toString() + this.state.antPositionX.toString()).classList.remove("back");
  }

  animateKMoves(e) {
    e.preventDefault();
    let moves = document.getElementById("moves").value;
    
    for (var i = 0; i < moves; i++) {
      console.log(this.state.board)
      console.log(this.state.antPositionX + ", " + this.state.antPositionY);
      if (this.state.antDirection === 90) {
        if (this.state.board[this.state.antPositionY][this.state.antPositionX] === 1) {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 0;
          AntSimulator.updateBoardWhite();
          this.state.antDirection = 180;
          if(this.state.antPositionY < 3) this.state.antPositionY += 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.top = (-150 + this.state.antPositionY * 100).toString() + "px";
        }
        else {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 1;
          AntSimulator.updateBoardBlack();
          this.state.antDirection = 0;
          if(this.state.antPositionY > 0) this.state.antPositionY -= 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.top = (-150 + this.state.antPositionY * 100).toString() + "px";
        }
      }
      else if (this.state.antDirection === 180) {
        if (this.state.board[this.state.antPositionY][this.state.antPositionX] === 1) {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 0;
          AntSimulator.updateBoardWhite();
          this.state.antDirection = 270;
          if(this.state.antPositionX > 0) this.state.antPositionX -= 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.left = (250 + this.state.antPositionX * 100).toString() + "px";
        }
        else {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 1;
          AntSimulator.updateBoardBlack();
          this.state.antDirection = 90;
          if(this.state.antPositionX < 3) this.state.antPositionX += 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.left = (250 + this.state.antPositionX * 100).toString() + "px";
        }
      }
      else if (this.state.antDirection === 270) {
        if (this.state.board[this.state.antPositionY][this.state.antPositionX] === 1) {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 0;
          AntSimulator.updateBoardWhite();
          this.state.antDirection = 0;
          if(this.state.antPositionY > 0) this.state.antPositionY -= 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.top = (-150 + this.state.antPositionY * 100).toString() + "px";
        }
        else {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 1;
          AntSimulator.updateBoardBlack();
          this.state.antDirection = 180;
          if(this.state.antPositionY < 3) this.state.antPositionY += 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.top = (-150 + this.state.antPositionY * 100).toString() + "px";
        }
      }
      else if (this.state.antDirection === 0) {
        if (this.state.board[this.state.antPositionY][this.state.antPositionX] === 1) {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 0;
          AntSimulator.updateBoardWhite();
          this.state.antDirection = 90;
          if(this.state.antPositionX < 3) this.state.antPositionX += 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.left = (250 + this.state.antPositionX * 100).toString() + "px";
        }
        else {
          this.state.board[this.state.antPositionY][this.state.antPositionX] = 1;
          AntSimulator.updateBoardBlack();
          this.state.antDirection = 270;
          if(this.state.antPositionX > 0) this.state.antPositionX -= 1;
          document.getElementById("ant").style.transform = "rotate(" + this.state.antDirection.toString() + "deg)";
          document.getElementById("ant").style.left = (250 + this.state.antPositionX * 100).toString() + "px";
        }
      }
      
      setTimeout(() => document.getElementById("grid-" + this.state.antPositionX.toString() + this.state.antPositionY.toString()).classList.remove("flipper"), 300);
    }
  }

  
  render() {
    this.state.board = Array(4).fill(1).map(row => new Array(4).fill(1));
    console.log(this.state.board);
    return (
      <div>
        <h1>Simulate K Moves</h1>

        <p>Enter number of moves to simulate, then click 'Apply'.</p>
        <input id="moves" type="number" defaultValue="Enter moves"></input>
        <input id="apply" type="submit" value="Apply" onClick={this.animateKMoves}></input>
        <hr></hr>
        <label>Set Starting X Position</label>
        <input id="xStartingPos" type="number" max="3" onChange={e => this.setState({antPositionX: e.target.value})}></input>
        <hr></hr>
        <label>Set Starting Y Position</label>
        <input id="yStartingPos" type="number" max="3" onChange={e => this.setState({antPositionY: e.target.value})}></input>
        
        <div className="ant-grid-container">
          <div className="ant-grid-item front" id="grid-00"></div>
          <div className="ant-grid-item front" id="grid-01"></div>
          <div className="ant-grid-item front" id="grid-02"></div>
          <div className="ant-grid-item front" id="grid-03"></div>
          <div className="ant-grid-item front" id="grid-10"></div>
          <div className="ant-grid-item front" id="grid-11"></div>
          <div className="ant-grid-item front" id="grid-12"></div>
          <div className="ant-grid-item front" id="grid-13"></div>
          <div className="ant-grid-item front" id="grid-20"></div>
          <div className="ant-grid-item front" id="grid-21"></div>
          <div className="ant-grid-item front" id="grid-22"></div>
          <div className="ant-grid-item front" id="grid-23"></div>
          <div className="ant-grid-item front" id="grid-30"></div>
          <div className="ant-grid-item front" id="grid-31"></div>
          <div className="ant-grid-item front" id="grid-32"></div>
          <div className="ant-grid-item front" id="grid-33"></div>
        </div>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_34175.png&f=1&nofb=1" id="ant" alt="this should be an ant"></img>
      </div>
    );
  }
}
