import React from 'react';
import {Link} from "react-router-dom";

const RemitList = ({handleCurrentFormPage, updateClass}) => {
  return (
      <div className='sidebar-content' id='sidebarId'>
        <Link id={'r1'} className='stepLink' to={'/forms/Remit/1'} onClick={() =>{handleCurrentFormPage(1); window.scrollTo(0, 0); updateClass(1)}}><div className='stepLinkTitle'>General Information</div></Link>
      </div>
  )
}

export default RemitList;