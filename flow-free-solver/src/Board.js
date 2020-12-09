import React from 'react';
import ReactDOM from 'react-dom';
import './Board.css'

class Square extends React.Component {
    render() {
        return (
            <button 
            className="square"
            style={{backgroundColor:this.props.colorVal}}
            onClick= { () => this.props.onClick() } >
                {this.props.index}
            </button>
        );
    }
}

class FixSquare extends React.Component {
    render() {
        return (
            <button
            className="square"
            style={{backgroundColor:this.props.colorVal}} >
                {this.props.index}
            </button>
        )
    }
}

function ColorBox(props) {
    return (
        <button className="color-box" 
            style={{backgroundColor:props.color}}
            onClick={props.onClick} >
        </button>
    );
}

class Board extends React.Component {

    constructor() {
        super()
        var n = 5;
        var m = 5;
        this.state = {
            n:5,
            m:5,
            colorsArray:["white","red"],
            squares: Array(n*m).fill(0),
            currentColor: 0,
        };
        this.handleNChange = this.handleNChange.bind(this);
        this.handleMChange = this.handleMChange.bind(this);
    }

    handleClick(index) {
        console.log("handleClick" + index);
        var squares = this.state.squares.slice();
        squares[index] = this.state.currentColor;
        this.setState({squares: squares});
        // console.log(this.state.squares);
    }

    handleColorChoose(color) {
        this.setState({currentColor:color});
    }

    renderSquare(index) {
        return (<Square 
            index={index} //colorVal={this.state.squares[i*this.m+j]}
            colorVal={this.state.colorsArray[this.state.squares[index]]}
            onClick = {()=>this.handleClick(index)} />);
    }

    renderColorBox(color) {
        return <ColorBox color={this.state.colorsArray[color]} onClick={()=>this.handleColorChoose(color)}/>;
    }

    handleNChange(event) {
        console.log(event.target.value);
        var newLength = this.state.m*event.target.value;
        this.setState({n:event.target.value,
                        squares: Array(newLength).fill('white')});
    }

    handleMChange(event) {
        var newLength = this.state.n*event.target.value;
        this.setState({m:event.target.value,
                        squares: Array(newLength).fill('white')});
    }

    renderInputGrid() {
        var rows = []
        for (var i =0;i < this.state.n;i++)
        {
            var row = []
            for (var j = 0;j < this.state.m; j++) {
                const index = i*this.state.m+j;
                row.push(this.renderSquare(index));
            }
            rows.push(<div className="board-row">{row}</div>);
        }
        return rows
    }

    renderOutputGrid() {
        var rows = []
        // for()
    }

    renderColorList() {
        var rows = []
        for(var i=0;i<this.state.colorsArray.length;i++)
            rows.push(this.renderColorBox(i));  
        return rows
    }

    render() {
        var rows = this.renderInputGrid()
        var colorRows = this.renderColorList()
        return (
        <div>

            <select value={this.state.n} onChange={this.handleNChange} >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <select value={this.state.m} onChange={this.handleMChange} >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <div className="grid">{rows}</div>

            <div className="grid">
                {colorRows}
                {/* {this.renderColorBox("red")}
                {this.renderColorBox("blue")}
                {this.renderColorBox("green")}
                {this.renderColorBox("yellow")}
                {this.renderColorBox("#FF7F00")}
                {this.renderColorBox("cyan")}
                {this.renderColorBox("purple")}
                {this.renderColorBox("brown")}
                {this.renderColorBox("#e75480")}
                {this.renderColorBox("white")} */}
            </div>

        </div>
        );
    }
}

export default Board;