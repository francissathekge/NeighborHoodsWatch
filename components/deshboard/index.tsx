
import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import styles from './desh.module.css'
import {
  MenuFoldOutlined,
  HomeOutlined ,
  MenuUnfoldOutlined,
  SafetyOutlined,
  UserOutlined,
  NotificationOutlined,
  HeartOutlined ,
  MessageOutlined,
} from '@ant-design/icons';
import { FaAmazonPay } from "react-icons/fa";
import Logout from '../logout';
import Donation from '../../pages/donation';
import PatrolsTable from '../../pages/patrols'
import Incidentss from '../../pages/incidents';
import Profiles from '../../pages/profile';
import Donnationss from '../../pages/donations';
import Reward from '../../pages/reward';

const { Header, Sider, Content } = Layout;

const Desh: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const { colorBgContainer } = theme.useToken().token;

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  return (
    <Layout className={styles.deshLayout} >
      <Sider  trigger={null} collapsible collapsed={collapsed} collapsedWidth={80}>
        <div className="demo-logo-vertical" />
        <div className={styles.logo}>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          className={styles.menu}
          
          items={[
            
            {
              key: '1',
              icon: <HomeOutlined  />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <SafetyOutlined />,
              label: 'Patrols',
            },
            {
              key: '3',
              icon: <NotificationOutlined />,
              label: 'Incidents',
            },
            {
              key: '4',
              icon: <HeartOutlined />,
              label: 'Donations',
            },
            {
              key: '5',
              icon: <MessageOutlined />,
              label: 'Rewards',
            },
            {
              key: '6',
              icon: <UserOutlined />,
              label: 'Profile',
            },
           
          ]}
          
        />
        <div className={styles.icons} > <Logout /></div>
        
      </Sider>
      <Layout>
        <Header className={styles.header}  style={{ padding: 0, background: colorBgContainer }}>
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'darkblue',
            }}
          />
          NeighbourHood Watch Dashboard
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {selectedKey === '1' && <div><Donation/></div>}
          {selectedKey === '2' && <div><PatrolsTable /></div>}
          {selectedKey === '3' && <div><Incidentss/></div>}
          {selectedKey === '4' && <div><Donnationss/></div>}
          {selectedKey === '5' && <div><Reward/></div>}
          {selectedKey === '6' && <div><Profiles/></div>}
     
        </Content>
      </Layout>
    </Layout>
  );
};

export default Desh;