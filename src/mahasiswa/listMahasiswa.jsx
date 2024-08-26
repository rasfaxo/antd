import { Table } from "antd";
import React, { useEffect, useState } from "react";
import supabase from "../connector";
import ModalForm from "../components/ModalForm";

const ListMahasiswa = () => {
  const [openModal, setOpenModal] = useState(true);
  const [dataMhs, setDataMhs] = useState([]);

  const column = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Nama Mahasiswa",
      dataIndex: "name",
    },
    {
      title: "NIM",
      dataIndex: "nim",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
    },
    {
      title: "Telepon",
      dataIndex: "telp",
    },
  ];

  useEffect(() => {
    supabase
      .from("mahasiswa")
      .select("*")
      .then((res) => {
        setDataMhs(res.data);
      });
  }, []);

  return (
    <main>
      {openModal && (
        <ModalForm
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={() => setOpenModal(false)}
          title="Add user"
        />
      )}
      <header className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-500 font-semibold">Search, filter, and manage your users with ease</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded"
          />
          <button className="px-4 py-2 bg-gray-200 rounded">Filters</button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setOpenModal(true)}
          >
            Add user
          </button>
        </div>
      </header>
      <div className="overflow-hidden w-[90%] mx-auto">
        <Table
          rowKey="id"
          columns={column}
          rowSelection={true}
          dataSource={dataMhs}
        />
      </div>
    </main>
  );
};

export default ListMahasiswa;
