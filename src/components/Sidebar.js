import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="/">
          <Link to="/">Product Details</Link>
        </Menu.Item>
        <Menu.Item key="/compare">
          <Link to="/compare">Compare Products</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
