import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePatrols } from '../../providers/PatrolProvider';
import { usePersons } from '../../providers/PersonProvider';
import styles from './patrols.module.css';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPatrols } from '../../providers/PatrolProvider/context';
import moment from 'moment';

const { Search } = Input;

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
            title="Are you sure you want to delete this reward?"
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
          title="Patrol Details"
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          <p>
            <strong>Period: </strong>
            {selectedPatrol.period}
          </p>
          <p>
            <strong>Location: </strong>
            {selectedPatrol.location}
          </p>
          <p>
            <strong>No. of Guards: </strong>
            {selectedPatrol.noOfGuards}
          </p>
          <p>
            <strong>Start Time: </strong>
            {moment(selectedPatrol.startTime).format('YYYY-MM-DD HH:mm:ss')}
          </p>
          <p>
            <strong>End Time: </strong>
            {moment(selectedPatrol.endTime).format('YYYY-MM-DD HH:mm:ss')}
          </p>
          <p>
            <strong>Amount: </strong>
            {selectedPatrol.amount}
          </p>
          {selectedPerson && (
            <div>
              <h3>Person Information:</h3>
              <p>
                <strong>User Name:</strong> {selectedPerson.userName}
              </p>
              <p>
                <strong>Name:</strong> {selectedPerson.name}
              </p>
              <p>
                <strong>Surname:</strong> {selectedPerson.surname}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedPerson.phoneNumber}
              </p>
              <p>
                <strong>Email Address:</strong> {selectedPerson.emailAddress}
                <strong>Street:</strong> {selectedPerson.address.street}
              </p>
              {/* Display other person information properties as needed */}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default PatrolsTable;
