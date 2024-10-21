import React, { useState, useEffect } from "react";
import { Button, DatePicker, Input, Table, Pagination, message } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";
import moment from "moment";
import { baseUrl } from "../../../constant/contant";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalUsers: 0,
    totalPages: 0,
    pageSize: 10,
  });
  
  const [filters, setFilters] = useState({ name: "", date: "" });

  const fetchUsers = async () => {
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

      const response = await fetch(`${baseUrl}/user/user-list?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
     
      if (result.success) {
        setUsers(result.data?.users || []);
        setPaginationData(prev => ({
          ...prev,
          currentPage: result.data.currentPage,
          totalUsers: result.data.totalUsers,
          totalPages: result.data.totalPages,
        }));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, paginationData.currentPage, paginationData.pageSize]);

  const handleSearch = () => {
    setPaginationData((prev) => ({ ...prev, currentPage: 1 }));
    fetchUsers();
  };

  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("DD MMMM YYYY") : "";
    setFilters({ ...filters, date: formattedDate });
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Join Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => showModal(record)}
          type="text"
          shape="circle"
          className="px-0 py-0 text-primary"
        >
          <FiAlertCircle size={22} />
        </Button>
      ),
    },
  ];

  const handleChangePage = (page, pageSize) => {
    setPaginationData((prev) => ({ ...prev, currentPage: page, pageSize: pageSize }));
  };

  return (
    <div className="bg-grayground rounded-lg py-[16px]">
      <div className="px-6 pb-5 flex justify-between items-center">
        <h3 className="text-xl font-medium text-primary">{"User List"}</h3>
        <div className="flex justify-end gap-x-4">
          <DatePicker
            placeholder="Date"
            style={{ width: "150px" }}
            className="custom-datepicker focus:outline-none border-none rounded-full text-[#222222] px-3.5 text-sm"
            onChange={handleDateChange}
          />
          <Input
            className="focus:outline-none outline-none border-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
            placeholder="User Name"
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
        dataSource={users}
        loading={loading}
        pagination={false}
      />
      <div className="flex justify-center mt-4">
        <Pagination
          current={paginationData.currentPage}
          total={paginationData.totalUsers}
          pageSize={paginationData.pageSize}
          onChange={handleChangePage}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} users`}
        />
      </div>
      <DashboardModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <div className="h-[560px] flex flex-col justify-between">
          <div className="space-y-[18px] text-sm text-[#181414] pb-2 divide-y divide-[#B1C5F7]">
            <h6 className="font-medium text-center pt-[18px]">User Details</h6>
            <div className="flex justify-between pt-[18px]">
              <p>User Name</p>
              <p className="font-medium">{modalData.name}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Email</p>
              <p className="font-medium">{modalData.email}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Phone Number</p>
              <p className="font-medium">{modalData.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Address</p>
              <p className="font-medium">{modalData.address || "N/A"}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Join Date</p>
              <p className="font-medium">{modalData.createdAt}</p>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Users;