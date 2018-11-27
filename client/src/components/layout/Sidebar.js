import React from 'react';
import EKlikList from '../layout/sidebar_lists/EKlikList'
import KlikNPayList from '../layout/sidebar_lists/KlikNPayList';
import RemitList from '../layout/sidebar_lists/RemitList';


const Sidebar = ({currentFormPage, handleCurrentFormPage, updateClass, location}) => {
  let formType = localStorage.getItem("selectedForm");
  if(formType === "eKlik") {
    var list = <EKlikList currentFormPage={currentFormPage} handleCurrentFormPage={handleCurrentFormPage} updateClass={updateClass} location={location} />
  } else if(formType === "KlikNPay") {
    list = <KlikNPayList />
  } else if(formType === "Remit") {
    list = <RemitList handleCurrentFormPage={handleCurrentFormPage} updateClass={updateClass} />
  } else {
    console.log('error with formType in Sidebar.js');
  }
  
  // console.log(currentFormPage, 'in Sidebar.js');
  return (
    <div className="leftNavContainer">
      {list}
    </div>
  )
}

export default Sidebar;