import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Divider,
  List,
  Avatar,
  Skeleton,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ill from "../../images/undraw_dashboard_re_3b76.svg";

import { BookService } from "../../api/api";

import {
  BookOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

function LibraryDashboard() {
  const [loading, setLoading] = useState(false);
  const [izdate, setIzdate] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // Ovdje pozovite funkciju za dohvaćanje stvarnih izdatih knjiga, npr. fetchBooksIzdavanjaList
    fetchBooksIzdavanjaList()
      .then((response) => {
        // Ovdje možete ažurirati stanje sa stvarnim izdatim knjigama
        setIzdate([...izdate, ...response.data]);

        // Nakon što se podaci ažuriraju, možete postaviti loading na false
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [izdateBroj, setIzdateBroj] = useState(0);
  const [preokoraceneBroj, setPreokoraceneBroj] = useState(0);
  const [rezervisaneBroj, setRezervisaneBroj] = useState(0);

  const fetchBooksIzdavanja = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      const izdateKnjige = response.data.data.izdate;
      setIzdateBroj(izdateKnjige.length);
    } catch (error) {
      console.log("Error fetching to give info:", error);
    }
  };

  const fetchBooksIzdavanjaList = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      setIzdate(response.data.data.izdate);
    } catch (error) {
      console.log("Error fetching to givelist info:", error);
    }
  };

  const fetchBooksPreokoracene = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      const preokoraceneKnjige = response.data.data.prekoracene;
      setPreokoraceneBroj(preokoraceneKnjige.length);
    } catch (error) {
      console.log("Error fetching to overdate book info:", error);
    }
  };

  const fetchBooksRezervisane = async () => {
    try {
      const response = await BookService.GetAllReserveBook();
      const rezervisaneKnjige = response.data.data.active;
      setRezervisaneBroj(rezervisaneKnjige.length);
    } catch (error) {
      console.log("Error fetching to reserved book info:", error);
    }
  };

  useEffect(() => {
    loadMoreData();
    fetchBooksIzdavanja();
    fetchBooksPreokoracene();
    fetchBooksRezervisane();
  }, []);

  return (
    <Fragment>
      <div className="naslov">
        <div className="illustrations">
          <img src={ill} className="illustration" />
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="line2"></div>
      <div style={{ padding: "24px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              {izdateBroj ? (
                <Statistic
                  title="Izdanih Knjiga"
                  value={izdateBroj}
                  prefix={<BookOutlined />}
                />
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {preokoraceneBroj ? (
                <Statistic
                  title="Knjiga u Prekoracenju"
                  value={preokoraceneBroj}
                  prefix={<ExclamationCircleOutlined />}
                />
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {rezervisaneBroj ? (
                <Statistic
                  title="Rezervisanih Knjiga"
                  value={rezervisaneBroj}
                  prefix={<CalendarOutlined />}
                />
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
        </Row>
        <Divider style={{ margin: "24px 0" }} />
        <div style={{ textAlign: "center" }}>
          <h2>Aktivnosti</h2>
        </div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
      <InfiniteScroll
  dataLength={izdate.length}
  next={loadMoreData}
  hasMore={izdate.length < 50}
  loader={
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    </div>
  }
  endMessage={<Divider plain>To je sve 🤐</Divider>}
  scrollableTarget="scrollableDiv"
>
            <List
              dataSource={izdate} // Koristite izdateKnjige kao dataSource
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.bibliotekar0.photoPath} />}
                    title={<a href="https://ant.design">IZDAVANJE KNJIGA</a>}
                    description={`Knjiga "${item.knjiga.title}" je izdata korisniku ${item.student.name} ${item.student.surname} od strane bibliotekara ${item.bibliotekar0.name} ${item.bibliotekar0.surname} dana ${item.borrow_date}`}
                  />
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
