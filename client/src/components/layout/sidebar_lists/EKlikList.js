import React from 'react';
import {Link} from "react-router-dom";

const EKlikList = ({currentFormPage, handleCurrentFormPage, updateClass}) => {

  return (
      <ul className='sidebar-content' id='sidebarId'>
        <li id={'eklik1'} className="eklikList"><Link className='stepLink' to={'/forms/eKlik/1'} onClick={() =>{handleCurrentFormPage(1); updateClass(1)}}>General Information</Link></li>
        <li id={'eklik2'} className='eklikList'><Link className='stepLink' to={'/forms/eKlik/2'} onClick={() =>{handleCurrentFormPage(2); updateClass(2)}}>Basic Setup</Link></li>
        <li id={'eklik3'} className='eklikList'><Link className='stepLink' to={'/forms/eKlik/3'} onClick={() =>{handleCurrentFormPage(3); updateClass(3)}}>Account Masking</Link></li>
      </ul>
  )
}

export default EKlikList;