import React, { Component } from 'react';
import './App.css';
import Table from './table/index.js';
import data from './table/data.js'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      available:[]
    }
	}
	
	//to  every object in our database assign active key
componentDidMount(){
  if(data){
   this.setState({
     data: data.map(rows => Object.assign({}, rows, { active: false})
   )})
  }
}

handleClick = (selectedRow) => {
  // iterate through state , if name matches then return same element with changed keys
  const newState = this.state.data.map(rowElement => {
    if(rowElement.name === selectedRow.name) {
      return Object.assign({},rowElement, { 
        active: !rowElement.active ,
      })
    }else {
  // otherwise just return element
      return rowElement
    }
  })
  // update state with newState and call activeItems
  this.setState({data: newState},this.activeItems) 
}

  // will update state
activeItems = () => { 
  const available = this.state.data.filter(elem => elem.active === true)
  this.setState({
    available: available,
  })
}

downloadAvailable = () => {
  // only select elements with available status and active status
  const downloadable = this.state.data
    .filter(rowElement => rowElement.status === 'available' && rowElement.active)
    .map(row => `${row.device}: ${row.path}`)
    .join('\n');
// select everything with active key
  const selected = this.state.data
    .filter(rowElement => rowElement.active)
    .map(row => `${row.device}: ${row.path}`)
    .join('\n');
      alert(selected, downloadable);
}

handleSelectAll = () => {
  const data = this.state.data
	const helper = data.filter(row => row.active)
	
  if(helper.length === data.length) {
    const newState = data.map(row => Object.assign({}, row, {
      active: false,
    }))
    this.setState({data: newState})
  } else {
    const newState = data.map(row => Object.assign({}, row, {active: true,}))
    this.setState({data: newState})
  }
}

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
          <h1 className="App-title">:)</h1>
          {this.state.data && 
            <Table 
              data={this.state.data}
              handleClick={this.handleClick}
              downloadAvailable={this.downloadAvailable}
              handleSelectAll={this.handleSelectAll}             
            />
          }       
      </div>);
	}
}


export default App;
