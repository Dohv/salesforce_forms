import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const links = [
        {name: 'Home', url: '/'},
        {name: 'Form1', url: '/form1'},
        {name: 'Form2', url: '/form2'},
        {name: 'Protected', url: '/protected'},
        {name: 'Recurse', url: '/recurse/F15B2A/Parent'},
        {name: 'Not Found', url: '/404'}
    ];

    let linksComponents = links.map((link, index) => {
        return (
            <li key={index} className={'nav'}>
                <NavLink className={'navLink'} activeClassName={'activeNavLink'} to={link.url}
                         exact>{link.name}</NavLink>
            </li>
        );
    });

    return (
        <div className={'leftNavContainer'}>
            <ul>
                {linksComponents}
            </ul>
        </div>
    );
};

export default Sidebar;