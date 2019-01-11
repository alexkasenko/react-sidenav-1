/* eslint no-prototype-builtins: 0 */
import React from 'react';
import { NavItem, NavIcon, NavText } from '../SideNav';
import SvgIcon from './svg';

const generateMenu = (content, onToggle) => {
    return content.map((item) => {
        return (
            <NavItem
                key={item.id}
                id={item.id}
                toggleExpanded={onToggle}
                eventKey={item.to ? item.to : item.id}
            >
                {item.icon &&
                <NavIcon title={item.label}>
                    <SvgIcon />
                </NavIcon>
                }
                <NavText>
                    {item.label}
                </NavText>
                {item.hasOwnProperty('content') && generateMenu(item.content)}
            </NavItem>
        );
    });
};

export default generateMenu;
