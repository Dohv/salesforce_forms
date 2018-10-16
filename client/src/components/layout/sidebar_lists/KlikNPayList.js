import React from 'react';
import {Link} from "react-router-dom";

const EKlikList = () => {
  return (
      <ul className='sidebar-content'>
        <li className="active"><Link to={'/forms/eKlik/1'}>General Information</Link></li>
        <li><Link to={'/forms/eKlik/2'}>Basic Setup</Link></li>
        <li><Link to={'/forms/eKlik/3'}>Account Masking</Link></li>
      </ul>
  )
}

export default EKlikList;