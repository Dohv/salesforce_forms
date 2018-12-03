import React from 'react';
import {Link} from "react-router-dom";

const KlikNPayList = ({handleCurrentFormPage, updateClass}) => {
  return (
      <div className='sidebar-content' id='sidebarId'>
        <Link id={'k1'} className='stepLink' to={'/forms/KlikNPay/1'} onClick={() =>{handleCurrentFormPage(1); window.scrollTo(0, 0); updateClass(1)}}><div className='stepLinkTitle'>KNP1</div></Link>
        <Link id={'k2'} className='stepLink' to={'/forms/KlikNPay/2'} onClick={() =>{handleCurrentFormPage(2); window.scrollTo(0, 0); updateClass(2)}}><div className='stepLinkTitle'>KNP2</div></Link>
        <Link id={'k3'} className='stepLink' to={'/forms/KlikNPay/3'} onClick={() =>{handleCurrentFormPage(3); window.scrollTo(0, 0); updateClass(3)}}><div className='stepLinkTitle'>KNP3</div></Link>
      </div>
  )
}

export default KlikNPayList;