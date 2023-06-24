import React, { useEffect, useState } from 'react';
import { Table, Input, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './donations.module.css';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDonations } from '../../providers/DonationProvider';
import { IDonations } from '../../providers/DonationProvider/context';

const { Search } = Input;

function DonationsTable() {
  const { getDonation, getDonations, deleteDonation } = useDonations();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getDonation();
  }, []);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };
  const handleDelete = async (donationId: string) => {
    try {
      await deleteDonation(donationId);
      message.success('Donation deleted successfully.');
    } catch (error) {
      message.error('Failed to delete the donation.');
    }
  };
  

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = getDonations.items.filter(
    (item) =>
      item.title &&
      item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IDonations> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
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
      render: (record: IDonations) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Render actions */}
          <Popconfirm
            title="Are you sure you want to delete this donation?"
            onConfirm={() => handleDelete(record.id)}
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
      {/* <h1>Donations</h1> */}
      <Search
        placeholder="Search by Title"
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

export default DonationsTable;
