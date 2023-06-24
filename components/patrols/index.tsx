import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePatrols } from '../../providers/PatrolProvider';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPatrols } from '../../providers/PatrolProvider/context';
import moment from 'moment';

const { Search } = Input;

function PatrolsTable() {
  const { getPatrol, getPatrols } = usePatrols();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getPatrol();
  }, []);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
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
          <ExportOutlined />
          <DeleteOutlined />
        </div>
      ),
    },
  ];

  return (
    <div style={{ textAlign: 'right' }}>
      {/* <h1>Patrols</h1> */}
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
    </div>
  );
}

export default PatrolsTable;
