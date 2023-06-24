import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, message, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExportOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useRewards } from '../../providers/RewardProvider';
import { IRewards } from '../../providers/RewardProvider/context';
import styles from './reward.module.css';
import moment from 'moment';
import Prize from '../../pages/prize';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, WhatsAppOutlined } from '@ant-design/icons';

const { Search } = Input;

function RewardsTable() {
  const { getReward, getRewards, deleteReward } = useRewards();
  const [sortedInfo, setSortedInfo] = useState<{ columnKey: string; order: string } | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [sharedItem, setSharedItem] = useState<IRewards | null>(null);

  useEffect(() => {
    getReward();
  }, []);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleDelete = async (rewardId: string) => {
    try {
      await deleteReward(rewardId);
      message.success('Reward deleted successfully.');
    } catch (error) {
      message.error('Failed to delete the reward.');
    }
  };

  const handleShare = (item: IRewards) => {
    setSharedItem(item);
    setIsShareModalVisible(true);
  };

  const handleCancelShare = () => {
    setIsShareModalVisible(false);
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };
  
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    const message = `Check out this reward: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const filteredData = getRewards.items.filter(
    (item) =>
      item.incidentType &&
      item.incidentType.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IRewards> = [
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
          <ShareAltOutlined className={styles.share} onClick={() => handleShare(record)} />
          <Popconfirm
            title="Are you sure you want to delete this reward?"
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
      <div className={styles.uploadIcon}><Prize/></div> 
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

      <Modal
        title="Share on Social Media"
        visible={isShareModalVisible}
        onCancel={handleCancelShare}
        footer={null}
      >
        {sharedItem && (
    <div >
    <FacebookOutlined
      onClick={shareOnFacebook}
      className={styles.icon}
    />
    <TwitterOutlined
      onClick={shareOnTwitter}
      className={styles.icon}
    />
    <LinkedinOutlined
      onClick={shareOnLinkedIn}
      className={styles.icon}
    />
    <WhatsAppOutlined
      onClick={shareOnWhatsApp}
      className={styles.icon}
    />
  </div>
        )}
      </Modal>
    </div>
  );
}

export default RewardsTable;
