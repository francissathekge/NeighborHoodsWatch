import React, { useEffect, useState } from 'react';
import { Table, Input, Modal, message, Popconfirm, Col, Row, Button, Typography, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePatrols } from '../../providers/PatrolProvider';
import { usePersons } from '../../providers/PersonProvider';
import styles from './patrols.module.css';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPatrols } from '../../providers/PatrolProvider/context';
import moment from 'moment';

const { Search } = Input;

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

function PatrolsTable() {
  const { getPersonById, getPersonsById } = usePersons();
  const { getPatrol, getPatrols, deletePatrol } = usePatrols();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPatrol, setSelectedPatrol] = useState<IPatrols | null>(null);
  const [selectedPerson, setSelectedPerson] = useState({}); // 'any' type can be replaced with a more specific type if available
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPatrol();
    setSelectedPerson(getPersonsById);
  }, []);

  console.log("jkadhsjk",getPersonsById)

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleViewDetails = (record: IPatrols) => {
    setSelectedPatrol(record);
    setShowModal(true);

    const personId = record.personId;

    getPersonById(personId)
    console.log(personId)
   
  };
  const handleDelete = async (patrolId: string) => {
    try {
      await deletePatrol(patrolId);
      message.success('Patrol deleted successfully.');
    } catch (error) {
      message.error('Failed to delete the patrol.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const filteredData = getPatrols.items.filter(
    (item) =>
      item.location &&
      item.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IPatrols> = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'No. of Guards',
      dataIndex: 'noOfGuards',
      key: 'noOfGuards',
      sorter: (a, b) => a.noOfGuards - b.noOfGuards,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
      render: (startTime) => moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a, b) => moment(a.endTime).unix() - moment(b.endTime).unix(),
      render: (endTime) => moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IPatrols) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SearchOutlined className={styles.view} onClick={() => handleViewDetails(record)} />
          <Popconfirm
            title="Are you sure you want to delete this patrol?"
            onConfirm={() => handleDelete(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className={styles.delete} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ textAlign: 'right' }}>
      <Search
        placeholder="Search by Location"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchText}
        style={{ marginBottom: 20, width: 250 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 6 }}
        className="ant-table"
        bordered
        onChange={handleChange}
      />
      {selectedPatrol && (
        <Modal
          visible={showModal}
          title={<div style={{ color: 'blue' }}>Patrol Details</div>}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
         <Row>
          <Col span={12}>
            <DescriptionItem title="Patrol Days"  content={`${selectedPatrol.period}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="No. of Guards" content={`${selectedPatrol.noOfGuards}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Start Time"  content={`${moment(selectedPatrol.startTime).format('YYYY-MM-DD HH:mm:ss')}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="End Time" content={`${moment(selectedPatrol.endTime).format('YYYY-MM-DD HH:mm:ss')}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Location"  content={`${selectedPatrol.location}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Amount" content={`${selectedPatrol.amount}`} />
          </Col>
        </Row>
        <Divider />
          {selectedPerson && (
            <div>
               <Title level={5} style={{ color: 'blue' }}>Person Information</Title>
               <Row>
          <Col span={12}>
            <DescriptionItem title="Username"  content={`${selectedPerson.userName}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Full Name" content={`${selectedPerson.name}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Surname"  content={`${selectedPerson.surname}`} />
          </Col>
        </Row>
        <Divider />
        <Title level={5} style={{ color: 'blue' }}>Contact</Title>
          <Row>
          <Col span={12}>
            <DescriptionItem title="Phone Number"  content={`${selectedPerson.phoneNumber}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email Address" content={`${selectedPerson.emailAddress}`} />
          </Col>
        </Row>
        <Divider />
        <Title level={5} style={{ color: 'blue' }}>Address</Title>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Street"  content={`${selectedPerson.address.street}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Town" content={`${selectedPerson.address.town}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City"  content={`${selectedPerson.address.city}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Province" content={`${selectedPerson.address.province}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Postal Code"  content={`${selectedPerson.address.postalCode}`} />
          </Col>
        </Row>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default PatrolsTable;
