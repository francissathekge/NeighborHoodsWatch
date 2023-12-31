import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIncidents } from '../../providers/IncidentProvider';
import styles from './incidents.module.css';
import { IIncidents } from '../../providers/IncidentProvider/context';
import moment from 'moment';

const { Search } = Input;

function IncidentsTable() {
  const { getIncident, getIncidents, deleteIncident } = useIncidents();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getIncident();
  }, []);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  const handleDelete = async (incidentId: string) => {
    try {
      await deleteIncident(incidentId);
      message.success('Incident deleted successfully.');
    } catch (error) {
      message.error('Failed to delete the incident.');
    }
  };
  

  const filteredData = getIncidents.items.filter(
    (item) =>
      item.incidentType.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IIncidents> = [
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      sorter: (a, b) => a.file.localeCompare(b.file),
    },
    {
      title: 'Incident Date',
      dataIndex: 'incidentDate',
      key: 'incidentDate',
      sorter: (a, b) => moment(a.incidentDate).unix() - moment(b.incidentDate).unix(),
      render: (incidentDate) => moment(incidentDate).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Incident Type',
      dataIndex: 'incidentType',
      key: 'incidentType',
      sorter: (a, b) => a.incidentType.localeCompare(b.incidentType),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IIncidents) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SearchOutlined className={styles.view} />
          <Popconfirm
            title="Are you sure you want to delete this incident?"
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
      {/* <h1>Reported Incidents</h1> */}
      <Search
        placeholder="Search by Incident Type"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchText}
        style={{ marginBottom: 20, width: 250 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        className="ant-table"
        pagination={{ pageSize: 6 }}
        bordered
        onChange={handleChange}
      />
    </div>
  );
}

export default IncidentsTable;
