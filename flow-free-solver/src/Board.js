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
            colorsArray:["white","red","blue","green","yellow","#FF7F00","cyan","purple","brown","#e75480"],
            squares: Array(n*m).fill(0),
            outputSquares: Array(n*m).fill(0),
            currentColor: 0,
        };
        this.handleNChange = this.handleNChange.bind(this);
        this.handleMChange = this.handleMChange.bind(this);
        this.produceOutput = this.produceOutput.bind(this);
        this.clearScreen = this.clearScreen.bind(this);
    }
    clearScreen() {
        var length = this.state.n * this.state.m;
        this.setState({squares: Array(length).fill(0),
            outputSquares: Array(length).fill(0)});
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

    renderFixSquare(index) {
        return (<FixSquare 
            index={index} //colorVal={this.state.squares[i*this.m+j]}
            colorVal={this.state.colorsArray[this.state.outputSquares[index]]}
            />);
    }

    renderColorBox(color) {
        return <ColorBox color={this.state.colorsArray[color]} onClick={()=>this.handleColorChoose(color)}/>;
    }

    handleNChange(event) {
        console.log(event.target.value);
        var newLength = this.state.m*event.target.value;
        this.setState({n:parseInt(event.target.value),
                        squares: Array(newLength).fill(0),
                        outputSquares: Array(newLength).fill(0)});
    }

    handleMChange(event) {
        var newLength = this.state.n*event.target.value;
        this.setState({m:parseInt(event.target.value),
                        squares: Array(newLength).fill(0),
                        outputSquares: Array(newLength).fill(0)});
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
        for (var i =0;i < this.state.n;i++)
        {
            var row = []
            for (var j = 0;j < this.state.m; j++) {
                const index = i*this.state.m+j;
                row.push(this.renderFixSquare(index));
            }
            rows.push(<div className="board-row">{row}</div>);
        }
        return rows
    }

    produceOutput() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({"N":  this.state.n,
                                "M":    this.state.m,
                                "input":this.state.squares})
        };

        fetch('http://localhost:5000/get-solution/',requestOptions)
            .then(response => response.json())
            .then(data => this.setState({outputSquares: data.output}))
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
        var outputRows = this.renderOutputGrid()
        return (
        <div>
            <div className="option-menu">    
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
            
                <div className="color-grid">
                    {colorRows}
                </div>
                <button onClick={this.produceOutput}>
                    Solve
                </button>
                <button onClick={this.clearScreen} >
                    Clear
                </button>
            </div>
            <div className="grid-mat">
                <div className="grid" style={{float:"left"}}>
                    {rows}
                </div>
                <div className="grid" style={{float:"right"}}>
                    {outputRows}
                </div>
            </div>
        
            
        </div>
        );
    }
}

export default Board;