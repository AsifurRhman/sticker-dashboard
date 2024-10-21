import React, { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Input, message, Table, Pagination } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { baseUrl } from "../../../constant/contant";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPayments: 0,
    totalPages: 0,
    pageSize: 10,
  });
  
  const [filters, setFilters] = useState({ name: "", date: "" });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("session");
      if (!token) {
        navigate("/auth");
        return message.error("Please log in first");
      }
      const queryString = `limit=${paginationData.pageSize}&page=${paginationData.currentPage}${
        filters.name ? `&name=${filters.name}` : ""
      }${filters.date ? `&date=${filters.date}` : ""}`;

      const response = await fetch(`${baseUrl}/transaction/all?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data?.payments || []);
        setPaginationData(prev => ({
          ...prev,
          currentPage: result.data.currentPage,
          totalPayments: result.data.totalPayments,
          totalPages: result.data.totalPages,
        }));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, paginationData.currentPage, paginationData.pageSize]);

  const handleSearch = () => {
    setPaginationData(prev => ({ ...prev, currentPage: 1 }));
    fetchTransactions();
  };

  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : "";
    setFilters({ ...filters, date: formattedDate });
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "name",
      render: (text, record) => <div>{record?.userName}</div>,
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Button
          onClick={() => showModal(data)}
          type="text"
          shape="circle"
          className="px-0 py-0 text-primary"
        >
          <FiAlertCircle size={22} />
        </Button>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setPaginationData(prev => ({ ...prev, currentPage: page, pageSize: pageSize }));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Transaction Details",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
  
      @import url('https://fonts.googleapis.com/css2?family=Nerko+One&display=swap');
      
      body {
        font-family: 'Nerko One', cursive;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-size: 20px;
      }
  
      h6 {
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
      }
  
      p {
        font-size: 20px;
        margin: 10px 0;
        text-align: center;
      }
  
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
  
      @media print {
        .print-hidden {
          display: none;
        }
        @page {
          margin: 0;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
      }
    `
  });
  
  const generatePdf = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Transaction Details",
    pageStyle: handlePrint.pageStyle,
  });

  return (
    <div className="space-y-[24px]">
      <div className="bg-grayground rounded-lg py-[16px]">
        <div>
          <div className="px-6 pb-5 flex justify-between items-center">
            <h3 className="text-xl font-medium text-primary">
              {"Recent Transactions"}
            </h3>
            <div className="flex justify-end gap-x-4">
              <DatePicker
                placeholder="Date"
                style={{ width: "150px" }}
                className="custom-datepicker focus:outline-none border-none rounded-full text-[#222222] px-3.5 text-sm"
                onChange={handleDateChange}
              />
              <Input
                className="focus:outline-none outline-none border-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
                placeholder="Name"
                onChange={handleNameChange}
              />
              <Button
                className="bg-primary text-white border-none"
                type="primary"
                shape="circle"
                icon={<IoSearch />}
                onClick={handleSearch}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={transactions}
            loading={loading}
            pagination={false}
          />
          <div className="flex justify-center mt-4">
            <Pagination
              current={paginationData.currentPage}
              total={paginationData.totalPayments}
              pageSize={paginationData.pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} transactions`}
            />
          </div>
        </div>
        <DashboardModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          <div ref={componentRef} className="h-[560px] flex flex-col justify-between">
            <div className="space-y-[36px] text-sm text-[#181414] py-2">
              <h6 className="font-medium text-center">Transaction Details</h6>
              <div className="flex justify-between">
                <p>Transaction ID :</p>
                <p className="font-medium">{modalData.transactionId}</p>
              </div>
              <div className="flex justify-between">
                <p>Date :</p>
                <p className="font-medium">{modalData.date}</p>
              </div>
              <div className="flex justify-between">
                <p>User name :</p>
                <p className="font-medium">{modalData.userName}</p>
              </div>
              <div className="flex justify-between">
                <p>Transaction amount :</p>
                <p className="font-medium">{modalData.amount}</p>
              </div>
            </div>
            <div className="flex gap-5 pb-[40px]">
              <Button
                onClick={generatePdf}
                style={{ height: "44px" }}
                className="w-full rounded-xl font-medium text-primary border-primary print:hidden"
              >
                Download
              </Button>
              <Button
                onClick={handlePrint}
                style={{
                  height: "44px",
                  backgroundColor: "#1D7151",
                  color: "white",
                }}
                className="w-full rounded-xl font-medium print:hidden"
              >
                Print
              </Button>
            </div>
          </div>
        </DashboardModal>
      </div>
    </div>
  );
};

export default Earnings;