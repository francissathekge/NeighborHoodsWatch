import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Divider } from 'antd';
import axios from 'axios';
import { useUser } from '../../providers/LoginProvider';
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

function UserForm() {
  const { userId } = useUser();
  console.log('UserId:', userId);

  const [currentUser, setCurrentUser] = useState(null);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    const endpointURL = `https://localhost:44311/api/services/app/User/GetAll`;

    axios
      .get(endpointURL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setPerson(response.data.result.items); // Access the 'items' property
        console.log('persons data:', response.data.result.items);

        // Find the matching user
        const matchingUser = response.data.result.items.find(
          (person) => person.id === userId
        );

        if (matchingUser) {
          setCurrentUser(matchingUser);
        }
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: '-40px auto' }}>
      <Title level={4}>Administration Details</Title>
      {currentUser && (
        <div>
         <Title level={4}>Personal</Title>
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
          <Title level={4}>Contact</Title>
          <Row>
          <Col span={12}>
            <DescriptionItem title="Phone Number"  content="083 855 6556" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email Address" content={`${currentUser.emailAddress}`} />
          </Col>
        </Row>
          {/* <Divider />
          <Text strong>Password:</Text>
          <Text>{currentUser.password}</Text>
          <Divider />
          <Text strong>User ID:</Text>
          <Text>{currentUser.id}</Text> */}
          {currentUser.address && (
            <div>
              
              <Title level={2}>Address</Title>
              <Divider />
              {/* <Text strong>ID:</Text>
              <Text>{currentUser.address.id}</Text> */}
              <Text strong>Street:</Text>
              <Text>{currentUser.address.street}</Text>
              <Divider />
              <Text strong>Town:</Text>
              <Text>{currentUser.address.town}</Text>
              <Divider />
              <Text strong>City:</Text>
              <Text>{currentUser.address.city}</Text>
              <Divider />
              <Text strong>Province:</Text>
              <Text>{currentUser.address.province}</Text>
              <Divider />
              <Text strong>Postal Code:</Text>
              <Text>{currentUser.address.postalCode}</Text>
            </div>
          )}
          <Divider />
          <Title level={4}>Roles</Title>
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
  );
}

export default UserForm;
