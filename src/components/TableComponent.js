import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import './TableComponent.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectTextRow} from '../actions/index';
class TableComponent extends Component {
    state = {  }

    renderRows(){
        const {data} = this.props;
        return data.map((data,index)=>{
          data.index = index;
            return (
                <tr key={index}>
                    <td>{index+1}</td>
            <td className="text">{data.text}</td>
            {data.label?<td className="">{data.label}</td>:<td>-</td>}
            <td>
               <Link to="/modify" onClick={(e)=>{
                 this.props.selectTextRow(data);
               }}> <i className="fas fa-mouse"></i></Link>
            </td>
                </tr>
            )
        });
    }
    render() { 
        return ( <Table striped  hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Text</th>
            <th style={{width:"20%"}}>Label</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
         
        </tbody>
      </Table> );
    }
}

const mapDispatchToProps = {
  selectTextRow
}

export default connect(null,mapDispatchToProps)(TableComponent);