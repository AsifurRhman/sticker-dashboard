
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, message, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "./DashboardModal";
import Cookies from "js-cookie"; // For managing cookies
import { baseUrl } from "../constant/contant";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);              
  const [modalData, setModalData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const componentRef = useRef(); // Reference for printing
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPayments: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [queryString, setQueryString] = useState(`limit=5&page=1`);
  const navigate = useNavigate();
  // Function to fetch data from API
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("session");
      if (!token) {
        navigate("/auth");
        return message.error("please logged in first")
   }
      const response = await fetch(`${baseUrl}/transaction/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data?.payments);
        setPaginationData({
          currentPage: result.data.currentPage,
          totalPayments: result.data.totalPayments,
          totalPages: result.data.totalPages,
        });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
    setLoading(false);
  };

  // Fetch data on component mount and whenever queryString changes
  useEffect(() => {
    fetchTransactions();
  }, []);

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
      render: (text, record) => <div>{record?.userName }</div>,
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

  const handleChangePage = (page) => {
    setQueryString(`limit=5&page=${page}`);
    setCurrentPage(page);
  };

  // Print function
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
      height: 100vh; /* Ensure full height centering */
      margin: 0;
      font-size: 20px;
    }

    h6 {
      font-size: 15px; /* Increased title size */
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px; /* Add more space under the title */
    }

    p {
      font-size: 20px; /* Increased paragraph size */
      margin: 10px 0;
      text-align: center; /* Center align text */
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%; /* Ensure content is vertically centered */
    }

    @media print {
      /* Hide print buttons during PDF generation */
      .print-hidden {
        display: none;
      }
           /* Attempt to hide headers and footers using page CSS */
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
        height: 100vh; /* Ensure full height centering */
        margin: 0;
        font-size: 20px;
      }
  
      h6 {
        font-size: 15px; /* Increased title size */
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px; /* Add more space under the title */
      }
  
      p {
        font-size: 20px; /* Increased paragraph size */
        margin: 10px 0;
        text-align: center; /* Center align text */
      }
  
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%; /* Ensure content is vertically centered */
      }
  
      @media print {
        /* Hide print buttons during PDF generation */
        .print-hidden {
          display: none;
        }
             /* Attempt to hide headers and footers using page CSS */
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
  return (
    <div className="bg-grayground rounded-lg py-[16px]">
      <div>
        <h3 className="text-xl font-medium text-[#464343] px-6 pb-5">
          Recent Transactions
        </h3>
        <Table
          columns={columns}
          dataSource={transactions}
          loading={loading}
          pagination={false}
          // pagination={{
          //   position: ["bottomCenter"],
          //   current: paginationData.currentPage,
          //   pageSize: 5, // Fixed page size to 5 per the initial query
          //   total: paginationData.totalPayments,
          //   onChange: handleChangePage,
          // }}
          scroll={{ x: "max-content" }}
        />
      </div>
      <DashboardModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {/* Wrap the modal content with a ref */}
        <div ref={componentRef}  className="h-[560px] flex flex-col justify-between">
          <div className="space-y-[36px] text-sm text-[#222222] py-2">
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
              <p className="font-medium">{modalData.amount}$</p>
            </div>
          </div>
          <div className="flex gap-5 pb-[40px]">
  <Button
    onClick={generatePdf}
    style={{ height: "44px" }}
    className="w-full rounded-xl font-medium text-primary border-primary print:hidden"  // Add print:hidden class here
  >
    Download
  </Button>
  <Button
    onClick={handlePrint} // This will trigger the print
    style={{
      height: "44px",
      backgroundColor: "#1D7151",
      color: "white",
    }}
    className="w-full rounded-xl font-medium print:hidden"  // Add print:hidden class here
  >
    Print
  </Button>
</div>

        </div>
      </DashboardModal>
    </div>
  );
};

export default DashboardHomeTable;


