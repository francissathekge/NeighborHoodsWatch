import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRewards } from '../../providers/RewardProvider';
import { IRewards } from '../../providers/RewardProvider/context';
import moment from 'moment';

const { Search } = Input;

function RewardsTable() {
  const { getReward, getRewards } = useRewards();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getReward();
  }, []);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = getRewards.items.filter(
    (item) =>
      item.incidentType &&
      item.incidentType.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IRewards> = [
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
    },
    {
      title: 'Incident Type',
      dataIndex: 'incidentType',
      key: 'incidentType',
    },
    {
      title: 'Reward Amount',
      dataIndex: 'rewardAmount',
      key: 'rewardAmount',
      sorter: (a, b) => a.rewardAmount - b.rewardAmount,
    },
    {
      title: 'Reward Date',
      dataIndex: 'rewardDate',
      key: 'rewardDate',
      sorter: (a, b) => moment(a.rewardDate).unix() - moment(b.rewardDate).unix(),
      render: (rewardDate) => moment(rewardDate).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Description',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IRewards) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Render actions */}
          <ExportOutlined />
          <DeleteOutlined />
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
        pagination={{ pageSize: 6 }}
        className="ant-table"
        bordered
        onChange={handleChange}
      />
    </div>
  );
}

export default RewardsTable;
