import React from 'react';
import {Link} from "react-router-dom";

const RemitList = () => {
  return (
      <ul className='sidebar-content'>
        <li className="active"><Link to={'/forms/Remit/1'}>General Information</Link></li>
      </ul>
  )
}

export default RemitList;