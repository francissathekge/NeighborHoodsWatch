import React, { useState } from 'react';
import styles from './header.module.css';
import { Menu, Drawer } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import Link from 'next/link';

function AppMenu({ isInline = false }) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>
      <Menu
        mode={isInline ? "inline" : "horizontal"}
        className={styles.nevbar}
      >
        <Menu.Item key="home">
          <Link href="/homes">Home</Link>
        </Menu.Item>
        <Menu.Item key="report-incident">
          <Link href="/incident">Report Incident</Link>
        </Menu.Item>
        <Menu.Item key="schedule-patrol">
          <Link href="/patrol">Schedule Patrol</Link>
        </Menu.Item>
        <Menu.Item key="rewards">
          <Link href="/rewards">Rewards</Link>
        </Menu.Item>
        <Menu.Item key="about-us">
          <Link href="/about-us">About Us</Link>
        </Menu.Item>
        <Menu.Item key="fund-us">
          <Link href="/donation">Fund Us</Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Link href="/account">Account</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div className={styles.headers}>
        <MenuOutlined onClick={() => setOpenMenu(true)} />
      </div>
      <div className={styles.header}>
        <span className={styles.headerMenu}>
          <AppMenu />
        </span>
        <Drawer
          placement="left"
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          closable={false}
        >
          <AppMenu isInline />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
