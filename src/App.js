import React from 'react';
import './App.css';



const numPads = [
  {symbol: '7', id:"seven"},
  {symbol: '8', id:"eight"},
  {symbol: '9', id:"nine"},
  {symbol: '4', id:"four"},
  {symbol: '5', id:"five"},
  {symbol: '6', id:"six"},
  {symbol: '1', id:"one"},
  {symbol: '2', id:"two"},
  {symbol: '3', id:"three"},
  {symbol: '0', id:"zero"},
  {symbol:'.', id:"decimal"}
];

const operatorPads = [
  {symbol: '+',id:"add"},
  {symbol: '-', id:"subtract"},
  {symbol: '/', id:"divide"},
  {symbol: '*', id:"multiply"}

]

const NUMERIC_FORMAT = /^\d*\.?\d*$/;


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputs:[],
      nums:"0",
      result:"",
      previousResult:""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEvaluation = this.handleEvaluation.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleClick(e){
    if(e.target.classList[0] === 'number'){
      let nDigit = e.target.innerHTML.toString();
      if(this.state.nums.length < 16){
        if(nDigit !== '.'){
          if(!this.state.nums.match(/[\+\-\*\/]/)){
            this.setState({nums: this.state.nums === '0' ? nDigit: this.state.nums + nDigit , result:""});
          }else{
            this.setState({inputs:[...this.state.inputs,this.state.nums],nums:nDigit});
          }
        }else if(this.state.nums.indexOf('.') < 0){
          this.setState({nums: this.state.nums + nDigit});
        }
      }
    }else{
      let nOperator = e.target.innerHTML.toString();

      if(this.state.previousResult !== "" && this.state.inputs.length === 0){
        this.setState({inputs:[this.state.previousResult],nums:nOperator,result:""});
      }else if(this.state.nums.match(NUMERIC_FORMAT)){

        this.setState({inputs:[...this.state.inputs,this.state.nums],nums:nOperator});
      }else{

        this.setState({nums:nOperator});
      }
    }
  }

  clearInput(){
    this.setState({
      inputs:[],
      nums:"0",
      result:"",
      previousResult:""
    });
  }

  handleEvaluation(){
    if(this.state.inputs.length >= 2){
      this.setState({inputs:[...this.state.inputs,this.state.nums]},function(){
        this.setState({inputs:[],nums:'0',result:eval(this.state.inputs.join(''))}, function(){this.setState({previousResult:this.state.result})});
      });
    }
  }

  render(){
    const numbers = numPads.map((x,index) => <div id={x.id} className={"number pad item"+index} key={x.symbol} onClick={this.handleClick}>{x.symbol}</div>);
    const operators = operatorPads.map((x,index) => <div id={x.id} className={"operator pad operator"+index} key={x.symbol} onClick={this.handleClick}>{x.symbol}</div>);
    return (
      <div className="App">
          <div className="pad-container">
            <div id="display1" className="display">{this.state.inputs}</div>
            <div id="display" className="display">{this.state.result === "" ? this.state.nums : this.state.result}</div>
              <div id="clear" className="clear pad" onClick={this.clearInput}>AC</div>
              {numbers}
              {operators}
              <div id="equals" className="equal pad" onClick={this.handleEvaluation}>=</div>
          </div>
          
      </div>
    );  
  }
}

export default App;
