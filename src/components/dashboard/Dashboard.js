import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Divider, List, Avatar, Skeleton } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  BookOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

function LibraryDashboard() {
  // Dummy podaci
  const issuedBooks = 50;
  const overdueBooks = 10;
  const reservedBooks = 15;

  // Dummy podaci za aktivnosti
  const activityData = [
    {
      user: {
        name: "John Doe",
        avatar: "URL_DO_SLIKE_KORISNIKA", // Zamijenite URL sa stvarnom putanjom slike korisnika
      },
      action: "Izdavanje knjige",
      book: "Naslov knjige",
      date: "2023-09-26", // Zamijenite sa stvarnim datumom
    },
    // Dodajte druge aktivnosti prema potrebi
  ];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Fragment>
      <div className="naslov">
        <h1>Dashboard</h1>
      </div>
      <div className="line2"></div>
      <div style={{ padding: "24px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Izdanih Knjiga"
                value={issuedBooks}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Knjiga u Prekoracenju"
                value={overdueBooks}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Rezervisanih Knjiga"
                value={reservedBooks}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Divider style={{ margin: "24px 0" }} />
        {/* Grafikon sa statistikom */}
        {/* Ovdje možete koristiti bilo koju biblioteku za grafove kao što je Chart.js ili recharts */}
        {/* Dummy grafikon */}
        <div style={{ textAlign: "center" }}>
          <h2>Aktivnosti</h2>
        </div>
        <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
        <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>To je sve 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      </div>
      </div>
    </Fragment>
  );
}

export default LibraryDashboard;
