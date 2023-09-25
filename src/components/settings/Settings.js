import { react, useState, useEffect } from "react"
import "./Settings.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookService } from "../../api/api";

import settigsIcon from "../../images/undraw_typewriter_re_u9i2.svg"

import { Tabs, Table, } from "antd";

import { ProfileOutlined, AppstoreAddOutlined, FileOutlined, SnippetsOutlined, BookOutlined, CompassOutlined, AuditOutlined  } from "@ant-design/icons";


const Settings = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [bookbind, setBookbind] = useState([]);
  const [script, setScript] = useState([]);


  useEffect(() => {
    const fetchBookCategories = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setCategories(response.data.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchBookCategories();
  }, []);

  useEffect(() => {
    const fetchBookGenres = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setGenres(response.data.data.genres);
      } catch (error) {
        console.log("Error fetching genres:", error);
      }
    };

    fetchBookGenres();
  }, []);

  useEffect(() => {
    const fetchBookFormats = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setFormats(response.data.data.formats);
      } catch (error) {
        console.log("Error fetching genres:", error);
      }
    };

    fetchBookFormats();
  }, []);

  useEffect(() => {
    const fetchBookPublishers = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setPublishers(response.data.data.publishers);
      } catch (error) {
        console.log("Error fetching publishers:", error);
      }
    };

    fetchBookPublishers();
  }, []);

  useEffect(() => {
    const fetchBookLanguages = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setLanguages(response.data.data.languages);
      } catch (error) {
        console.log("Error fetching languages:", error);
      }
    };

    fetchBookLanguages();
  }, []);

  useEffect(() => {
    const fetchBookBindings = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setBookbind(response.data.data.bookbinds);
      } catch (error) {
        console.log("Error fetching bookbinds:", error);
      }
    };

    fetchBookBindings();
  }, []);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setScript(response.data.data.scripts);
      } catch (error) {
        console.log("Error fetching scripts:", error);
      }
    };

    fetchScripts();
  }, []);

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }

  const compareStrings = function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  const renderTitles = (text, book) => {
    return (
      <span>
        {book.name}
      </span>
    );
  };


  const columns = [
    {
      title: "Kategorije",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: categories.map((kategorije) => {
        return {
          text: kategorije.name,
          value: kategorije.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns1 = [
    {
      title: "Žanrovi",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: genres.map((zanr) => {
        return {
          text: zanr.name,
          value: zanr.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns3 = [
    {
      title: "Formati",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: formats.map((formati) => {
        return {
          text: formati.name,
          value: formati.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns4 = [
    {
      title: "Izdavači",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: publishers.map((izdavac) => {
        return {
          text: izdavac.name,
          value: izdavac.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns5 = [
    {
      title: "Jezici",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: languages.map((jezik) => {
        return {
          text: jezik.name,
          value: jezik.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns6 = [
    {
      title: "Povez",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: bookbind.map((korice) => {
        return {
          text: korice.name,
          value: korice.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];

  const columns7 = [
    {
      title: "Povez",
      dataIndex: "name",
      render: renderTitles,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: script.map((pismo) => {
        return {
          text: pismo.name,
          value: pismo.name,
        };
      }),
      onFilter: (value, record) =>
        `${record.name}`.startsWith(value),
    }
  ];



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (current, newSize) => {
    setLoading(true);
    setPageSize(newSize);
    setLoading(false);
  };

  const pagination = {
    pageSize: pageSize,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["1", "10", "20", "50"],
    showSizeChanger: true,
    onShowSizeChange: handlePageSizeChange,
  };



  const items = [
    {
      key: "1",
      label: (
        <div>
          <AppstoreAddOutlined />
          <span>Kategorije</span>
        </div>
      ),
      children: (
        <Table
          className="tabela"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={pagination}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <ProfileOutlined />
          <span>Žanrovi</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns1}
        dataSource={genres}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <FileOutlined />
          <span>Formati</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns3}
        dataSource={formats}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
    {
      key: "4",
      label: (
        <div>
          <SnippetsOutlined />
          <span>Izdavači</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns4}
        dataSource={publishers}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
    {
      key: "5",
      label: (
        <div>
          <CompassOutlined />
          <span>Jezici</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns5}
        dataSource={languages}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
    {
      key: "6",
      label: (
        <div>
          <BookOutlined />
          <span>Povez</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns6}
        dataSource={bookbind}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
    {
      key: "7",
      label: (
        <div>
          <AuditOutlined/>
          <span>Pismo</span>
        </div>
      ),
      children: (<Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns7}
        dataSource={script}
        rowKey="id"
        pagination={pagination}
        loading={loading}
      />
      ),
    },
  ];

  return (
    <>
      <div className="naslooov">
        <div className="naslov"><div className="illustrations">
          <img src={settigsIcon} className="illustration"></img>
          <h1>Podešavanja</h1></div>
        </div>
      </div>

      <Tabs
        defaultActiveKey={currentStep.toString()}
        items={items}
        onChange={(key) => setCurrentStep(parseInt(key))}
        tabPosition="top"
      ></Tabs>

    </>
  )
}

export default Settings;

