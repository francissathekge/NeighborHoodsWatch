import React from 'react';
import styles from './home.module.css'; // Import the CSS module

function Home() {
  return (
    <div className={styles['home-container']}>
      <div className={styles['background-image']} style={{ backgroundImage: "url('../../images/8.jpeg')" }} />
      {/* Rest of your content */}
    </div>
  );
}

export default Home;
