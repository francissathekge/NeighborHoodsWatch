import React from 'react';
import { Button } from 'antd';
import styles from './home.module.css'; // Import the CSS module

function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.logo}></div>
      <div className={styles.container}>
        <Button className={styles.button} type="primary" size="large">
          Sign up
        </Button>
      </div>
      <div className={styles.containers}>
        <Button className={styles.button} type="primary" size="large">
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Home;
