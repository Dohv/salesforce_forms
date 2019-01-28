import React from 'react';
// import {Link} from "react-router-dom";

class EKlikList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  
  render() {
    return (
      <div className='sidebar-content' id='sidebarId'>
        <div className="stepLink" id="e1">General Information</div>
        <div className="stepLink" id="e2">Basic Setup</div>
        <div className="stepLink" id="e3">Account Masking</div>
      </div> 
    )
  }
}

export default EKlikList;

{/* <Link id={'e1'} className='stepLink' to={'/forms/eKlik/1'} onClick={() =>{this.props.handleCurrentFormPage(1); window.scrollTo(0, 0); this.props.updateClass(1)}}><div className='stepLinkTitle'>General Information</div></Link>
<Link id={'e2'} className='stepLink' to={'/forms/eKlik/2'} onClick={() =>{this.props.handleCurrentFormPage(2); window.scrollTo(0, 0);this.props.updateClass(2)}}><div className='stepLinkTitle'>Basic Setup</div></Link>
<Link id={'e3'} className='stepLink' to={'/forms/eKlik/3'} onClick={() =>{this.props.handleCurrentFormPage(3);window.scrollTo(0, 0); this.props.updateClass(3)}}><div className='stepLinkTitle'>Account Masking</div></Link> */}