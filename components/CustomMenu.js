import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  border: none;
`;

const CustomMenu = (props) => {
  return (
    <StyledMenu className={props.className} theme={props.theme} mode={props.mode} defaultSelectedKeys={props.defaultSelectedKeys}>
      {props.routes.map((route) => {
        return(
          <Menu.Item key={route.route}>
            <Link href={route.route}><a onClick={props.hasOwnProperty("onClick") ? () => props.onClick() : () => void(0)}>{route.name}</a></Link>
          </Menu.Item>
        );
      })}
    </StyledMenu>
  );
}

export default CustomMenu;