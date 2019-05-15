import React from 'react';
import './App.css';
import Pad from './Pad'


const numPads = [
  {padType:'number', symbol: '7'},
  {padType:'number', symbol: '8'},
  {padType:'number', symbol: '9'},
  {padType:'number', symbol: '4'},
  {padType:'number', symbol: '5'},
  {padType:'number', symbol: '6'},
  {padType:'number', symbol: '1'},
  {padType:'number', symbol: '2'},
  {padType:'number', symbol: '3'},
];

const operatorPads = [
  {padType:'operator', symbol: '+'},
  {padType:'operator', symbol: '-'},
  {padType:'operator', symbol: '/'},
  {padType:'operator', symbol: '*'},
  {padType:'operator', symbol: '='}
]


function App() {

  const numbers= numPads.map( (x,index) => <Pad key={index} padType={x.padType} symbol={x.symbol}></Pad>)
  const operators = operatorPads.map( (x,index) => <Pad key={index} padType={x.padType} symbol={x.symbol}></Pad>)
  
  return (
    <div className="App">
        <div>{numbers}</div>
        <div>{operators}</div>
    </div>
  );
}

export default App;
