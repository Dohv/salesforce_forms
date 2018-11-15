import React from 'react';
import {Link} from "react-router-dom";

class EKlikList extends React.Component {
  constructor(props) {
    super(props);
  }
  //currentFormPage, handleCurrentFormPage, updateClass


  render() {
      // this.props.updateClass(this.props.location)
    return (
      <ul className='sidebar-content' id='sidebarId'>
        <li id={'eklik1'} className="eklikList"><Link className='stepLink' to={'/forms/eKlik/1'} onClick={() =>{this.props.handleCurrentFormPage(1); window.scrollTo(0, 0); this.props.updateClass(1)}}>General Information</Link></li>
        <li id={'eklik2'} className='eklikList'><Link className='stepLink' to={'/forms/eKlik/2'} onClick={() =>{this.props.handleCurrentFormPage(2); window.scrollTo(0, 0);this.props.updateClass(2)}}>Basic Setup</Link></li>
        <li id={'eklik3'} className='eklikList'><Link className='stepLink' to={'/forms/eKlik/3'} onClick={() =>{this.props.handleCurrentFormPage(3);window.scrollTo(0, 0); this.props.updateClass(3)}}>Account Masking</Link></li>
      </ul>
    )
  }
}

export default EKlikList;