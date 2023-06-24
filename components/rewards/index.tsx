import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './rewards.module.css';
import { useRewards } from '../../providers/RewardProvider';
import { IRewards } from '../../providers/RewardProvider/context';
import axios from 'axios';

function RewardsTables() {
  const { getReward, getRewards } = useRewards();
  const [rewardData, setRewardData] = useState([]);

  useEffect(() => {
    getReward();
  }, []);

  console.log('getRewards:', getRewards);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchedData = [];

        for (const reward of getRewards.items) {
          console.log('pics:', reward.id);
          const response = await axios.get(
            `https://localhost:44311/api/services/app/Reward/GetStoredFile?id=${reward.id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              responseType: 'blob',
            }
          );

          const imageBlob = new Blob([response.data], {
            type: response.headers['content-type'],
          });
          const imageUrl = URL.createObjectURL(imageBlob);
          console.log('imageUrl:', imageUrl);

          fetchedData.push({ rewardId: reward.id, imageUrl });

          setRewardData(fetchedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [getRewards]);

  return (
    <div className={styles.formBackground}>
    <div className={styles.formContainers}>
      {/* <h1>Rewards</h1> */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {getRewards.items.map((reward) => {
          const rewardDataItem = rewardData.find((dataItem) => dataItem.rewardId === reward.id);
          const imageUrl = rewardDataItem ? rewardDataItem.imageUrl : null;

          return (
            <Card
              key={reward.id}
              title={reward.file}
              style={{ width: 300, margin: '16px' }}
              actions={[
                <Button icon={<ExportOutlined />} />,
                <Button icon={<DeleteOutlined />} />,
              ]}
            >
              <div style={{ textAlign: 'center' }}>
                {imageUrl && <img src={imageUrl} alt="Reward" style={{ maxWidth: '100%', height: 'auto' }} />}
              </div>
              <p>
                <strong>Incident Type: </strong>
                {reward.incidentType}
              </p>
              <p>
                <strong>Reward Amount: </strong>
                {reward.rewardAmount}
              </p>
              <p>
                <strong>Reward Date: </strong>
                {moment(reward.rewardDate).format('YYYY-MM-DD')}
              </p>
              <p>
                <strong>Description: </strong>
                {reward.comment}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default RewardsTables;
