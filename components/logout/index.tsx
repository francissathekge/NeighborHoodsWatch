import React from 'react';
import { Modal, Button, message, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from './logout.module.css';

function Logout() {
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const router = useRouter();
  const logout = () => {

    setTimeout(() => {
      localStorage.removeItem('token'); 
      localStorage.clear();
      setConfirmVisible(false);
      message.success('Successfully logged out.');
      router.push(`/login`);
    }, 200);
  };

  const showConfirm = () => {
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <div>
      <Button type="primary" className={styles.logouticon} onClick={showConfirm} icon={<PoweroffOutlined />}>
      </Button>
      <Modal
        title="Logout"
        open={confirmVisible}
        onOk={logout}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default Logout;