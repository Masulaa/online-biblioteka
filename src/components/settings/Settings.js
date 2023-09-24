import {react, useState, useEffect} from "react"
import "./Settings.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookService } from "../../api/api";

import settigsIcon from "../../images/undraw_typewriter_re_u9i2.svg"

import { Tabs, Table, } from "antd";

import { DatabaseOutlined, ProfileOutlined } from "@ant-design/icons";


const Settings = () =>{

  const Lorem = `Lorem ipsum dolor sit amet,
  consectetur adipisicing elit.
   Earum eligendi nihil, vel 
   necessitatibus saepe laboriosam!
    Perspiciatis laboriosam culpa veritatis
     ea voluptatum commodi tempora unde, dolorum
      debitis quia id dicta vitae. `

      const [currentStep, setCurrentStep] = useState(1);

      const [book, setBook] = useState([]);

      useEffect(() => {
        const fetchBookCategories = async () => {
          try {
            const response = await BookService.CreateBookInfo();
            setBook(response.data.data.categories);
          } catch (error) {
            console.log("Error fetching book:", error);
          }
        };
    
        fetchBookCategories();
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
    
      const renderCategories = (text, book) => {
        return (
          <span>
  {  book.name}
          </span>
        );
      };
    
    
      const columns = [
        {
          title: "Naziv bibliotekara",
          dataIndex: "name",
          render: renderCategories,
          sorter: (a, b) => compareStrings(a.name, b.name),
          filters: book.map((kategorije) => {
            return {
              text: kategorije.name,
              value: kategorije.name,
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
              <DatabaseOutlined/>
              <span>Kategorije</span>
            </div>
          ),
          children: (
             <Table
            className="tabela"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={book}
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
          children: (<div></div>
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

