import React,{useState} from 'react'
import { Menu } from 'antd';
import {  AppstoreOutlined , SettingOutlined ,UserOutlined ,UserAddOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

const Header=()=>{
    const [current,setCurrent]=useState('')

    const handleClick=(e)=>{
        setCurrent(e.key)
    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined/>} className="float-right">
        <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/register">Register</Link>
        </Menu.Item>
       
        
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          
        </SubMenu>
      
      </Menu>
    )
}

export default Header