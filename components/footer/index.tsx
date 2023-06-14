import React from 'react';
import { Layout, Row, Col } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
  InstagramOutlined,
  AppleOutlined, 
  GoogleOutlined,
  AndroidOutlined 
} from '@ant-design/icons';
import styles from './Footer.module.css';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    
    <Footer className={styles.footer}>
      <Row className={styles.container} justify="space-between">
        <Col className={styles.box}>
          <p>
          Copyright 2023 - Neighbourhood Watch SA
          </p>
        </Col>
        <Col className={styles.box}>
          <h3>Follow Us</h3>
          <FacebookOutlined className={styles.icon} />
          <TwitterOutlined className={styles.icon} />
          <GithubOutlined className={styles.icon} />
          <InstagramOutlined className={styles.icon} />
        </Col>
        <Col className={styles.box}>
          <h3>We available on</h3>
          <AppleOutlined className={styles.icon} />
          <GoogleOutlined className={styles.icon} />
          <AndroidOutlined className={styles.icon} />
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
