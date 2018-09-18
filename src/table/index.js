import React from 'react'
import './index.css'
import PropTypes from 'prop-types';

const Table = (props) => {
  const data = props.data
  const handleClick = props.handleClick
  const numberOfActive = props.data.filter(row => row.active).length
  	return (
      <div className="component">
      	<div className="select_bar">
        	<button onClick={props.handleSelectAll} type="button">{numberOfActive === data.length ? '-' : numberOfActive === 0 ? '+' : '*'}</button>
          <li>Selected&nbsp;{numberOfActive}</li>  
          <li className="row_elements"onClick={props.downloadAvailable}><i className="fas fa-arrow-down"></i>&nbsp;Download Selected</li> 
      	</div>
        <div className="wrapper">
          <div className="categories">
						<p>Name</p>
						<p >Device</p>
						<p>Path</p> 
						<p>Status</p> 
          </div>
          <div className="columns">
            {data.map(row =>{
              return (
								<div 
									key={row.name}
									status={row.satus}
									className={`row_elements ${row.active ? "selected" : ''}`}
									onClick={()=>handleClick(row)}
								>
									<input type="checkbox" checked={row.active} />
									<div className="row-name">{row.name}</div>
									<div className="row-device">{row.device}</div>
									<div className="row-path">{row.path}</div>
									<div className="row-status">
										{row.status === 'available' ? <i className="fas fa-circle"></i> : ''}
                      {row.status}
                	</div>
              	</div>)
            })}
          </div>
        </div>
    	</div>
    )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  downloadAvailable: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired
}

export default Table;