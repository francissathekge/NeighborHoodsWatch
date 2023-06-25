import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Divider, Drawer  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useUser } from '../../providers/LoginProvider';
import Logout from '../logout';
import styles from './drawer.module.css'

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const { Title, Text } = Typography;

const App: React.FC = () => {
  const { userId } = useUser();
  // console.log('UserId:', userId);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    const endpointURL = `https://localhost:44311/api/services/app/Person/GetAll`;

    axios
      .get(endpointURL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setPerson(response.data.result.items);
        // console.log('persons data:', response.data.result);

        const matchingUser = response.data.result.find(
          (person) => person.userId === userId
        );

        if (matchingUser) {
          setCurrentUser(matchingUser);
        }
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error);
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  return (
    <>
    <Button
      icon={<UserOutlined style={{ fontSize: '20px' }} />}
      type="primary"
      onClick={showDrawer}
      style={{ background: 'transparent' }}
    >
    </Button>
      <Drawer title=" User Profile" width={400} closable={false} onClose={onClose} open={open}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {currentUser && (
        <div>
         <Title level={4} style={{ color: 'blue' }}>Personal Details</Title>
          <Row>
          <Col span={12}>
            <DescriptionItem title="Username"  content={`${currentUser.userName}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Full Name" content={`${currentUser.name}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Surname"  content={`${currentUser.surname}`} />
          </Col>
        </Row>
          <Divider />
          <Title level={4} style={{ color: 'blue' }}>Contact</Title>
          <Row>
          <Col span={12}>
            <DescriptionItem title="Phone Number"  content={`${currentUser.phoneNumber}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email Address" content={`${currentUser.emailAddress}`} />
          </Col>
        </Row>
          <Divider />
          {/* <Text strong>Password: </Text>
          <Text>{currentUser.password}</Text>
          <Divider /> */}
          {/* <Text strong>User ID:</Text>
          <Text>{currentUser.id}</Text> */}
          {currentUser.address && (
            <div>
              <Title level={4} style={{ color: 'blue' }}>Address</Title>
          <Row>
          <Col span={12}>
            <DescriptionItem title="Street"  content={`${currentUser.address.street}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Town" content={`${currentUser.address.town}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City"  content={`${currentUser.address.city}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Province" content={`${currentUser.address.province}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Postal Code"  content={`${currentUser.address.postalCode}`} />
          </Col>
        </Row>
            </div>
          )}
          <Divider />
          <Title level={4} style={{ color: 'blue' }}>Roles</Title>
          {currentUser.roleNames.length > 0 ? (
            currentUser.roleNames.map((roleName, index) => (
              <Text key={index}>{roleName}</Text>
            ))
          ) : (
            <Text>No roles assigned</Text>
          )}
          <Divider />
        </div>
      )}
     
    </div>
    <div className={styles.buttons}>
    <Logout />
        <Button
         className={styles.logouticon}
         type="primary" onClick={showChildrenDrawer}>
          Account
        </Button>
    </div>
        <Drawer
          title="Account"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
         Account Details
        </Drawer>
      </Drawer>
    </>
  );
};

export default App;