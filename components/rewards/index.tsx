import React, { useEffect, useState } from 'react';
import { Card, Modal } from 'antd';
import { ShareAltOutlined, NotificationOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined, WhatsAppOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from 'next/router';
import styles from './rewards.module.css';
import { useRewards } from '../../providers/RewardProvider';
import { IRewards } from '../../providers/RewardProvider/context';
import axios from 'axios';

function RewardsTables() {
  const router = useRouter();
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

  const Report = () => {
    Modal.confirm({
      title: 'Report Incident',
      content: 'Are you sure you want to report this incident?',
      onOk: () => {
        router.push('/incident');
      },
    });
  };

  const shareReward = () => {
    const rewardUrl = window.location.href;
    const shareTitle = 'Check out this reward!';
    const shareText = `I found this amazing reward and wanted to share it with you.`;

    // Share on Facebook
    const shareOnFacebook = () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(rewardUrl)}`;
      window.open(url, '_blank');
    };

    // Share on Twitter
    const shareOnTwitter = () => {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(rewardUrl)}`;
      window.open(url, '_blank');
    };

    // Share on LinkedIn
    const shareOnLinkedIn = () => {
      const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(rewardUrl)}&title=${encodeURIComponent(shareTitle)}`;
      window.open(url, '_blank');
    };

    // Share on WhatsApp
    const shareOnWhatsApp = () => {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + rewardUrl)}`;
      window.open(url, '_blank');
    };

    // Call the appropriate share function based on the platform
    Modal.info({
      title: 'Share on Social Media',
      content: (
        <div className={styles.shareContainer}>
          <FacebookOutlined onClick={shareOnFacebook} className={styles.icon} />
          <TwitterOutlined onClick={shareOnTwitter} className={styles.icon} />
          <LinkedinOutlined onClick={shareOnLinkedIn} className={styles.icon} />
          <WhatsAppOutlined onClick={shareOnWhatsApp} className={styles.icon} />
        </div>
      ),
      onOk: () => {},
    });
  };

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
                  <ShareAltOutlined key="share" onClick={shareReward} />,
                  <NotificationOutlined key="notification" onClick={Report} />,
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
