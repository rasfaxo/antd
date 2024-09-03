import {
  Modal,
  Table,
  Popconfirm,
  Button,
  message,
  FloatButton,
  Avatar,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import supabase from "../connector";
import ModalForm from "../components/ModalForm";
import Chance from "chance";
import { IoIosAdd } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import ModalFormEdit from "../components/ModalFormEdit";
import { useQuery } from "@tanstack/react-query";

const ListMahasiswa = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataMhs, setDataMhs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const chance = new Chance();
  const { confirm } = Modal;
  const { Search } = Input;
  const { success } = message;

  //handle generate fake data
  function genFakeData() {
    confirm({
      title: "apakah anda ingin menambah 20 fake data?",
      onOk() {
        let fakeData = [];

        for (let i = 0; i <= 20; i++) {
          let name = chance.name();
          let nim = chance.integer();
          let alamat = chance.address();
          let telp = chance.phone();

          fakeData.push({
            name: name,
            nim: nim,
            alamat: alamat,
            telp: telp,
          });
        }

        supabase
          .from("mahasiswa")
          .insert(fakeData)
          .then((res) => {
            setRefresh((prev) => (prev = !prev));
            success("Berhasil menambahkan 20 data");
          });
      },
    });
  }
  //handle refresh
  function handleRefresh() {
    setRefresh((prev) => !prev);
  }

  // column table
  const column = [
    // {
    //   title: "No",
    //   dataIndex: "id",
    // },
    {
      title: "Nama Mahasiswa",
      dataIndex: "name",
      render: (text) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar src={`https://picsum.photos/200/300?random=${chance.integer()}`} />
            <p>{text}</p>
          </div>
        );
      },
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
    {
      title: "Action",
      render: (content, data) => (
        <div className="flex gap-3">
          <div>
            <Popconfirm
              title="Apakah anda yakin ingin delete data ini ?"
              okText="Delete"
              onConfirm={() => handleSingleDelete(data.id)}
              cancelText="Tidak "
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setDataEdit(data);
              setOpenModalEdit(true);
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];
  // row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //handle single delete
  function handleSingleDelete(id) {
    supabase
      .from("mahasiswa")
      .delete()
      .eq("id", id)
      .then((res) => {
        setRefresh((prev) => (prev = !prev));
      });
  }

  //handle multiple delete
  function handleMultipleDelete() {
    confirm({
      title: "Apakah anda ingin menghapus data ini?",
      onOk() {
        supabase
          .from("mahasiswa")
          .delete()
          .in("id", selectedRowKeys)
          .then((res) => {
            setRefresh((prev) => (prev = !prev));
            setSelectedRowKeys([]);
            success("Berhasil menghapus data");
          });
      },
    });
  }

  //handle row selection
  function onSelectChange(newSelectedRowKeys) {
    setSelectedRowKeys(newSelectedRowKeys);
  }

  function handleSearch(e) {
    if (e !== "") {
      supabase
        .from("mahasiswa")
        .select("*")
        .ilike("name", `%${e}%`)
        .order("id", { ascending: false })
        .then((res) => {
          setDataMhs(res.data);
        });
    }
    supabase
      .from("mahasiswa")
      .select("*")
      .order("id", { ascending: false })
      .then((res) => {
        setDataMhs(res.data);
      });
    return;
  }

  //fetch data
  // useEffect(() => {
  //   supabase
  //     .from("mahasiswa")
  //     .select("*")
  //     .order("id", { ascending: false })
  //     .then((res) => {
  //       setDataMhs(res.data);
  //     });
  // }, [refresh]);

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["read_mhs"],
    queryFn: async () => {
      try {
        const response = await supabase
          .from("mahasiswa")
          .select("*")
          .order("id", { ascending: false });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <main className="font-sans">
      {openModal && (
        <ModalForm
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onRefresh={() => setRefresh(!refresh)}
          isRefresh={handleRefresh}
        />
      )}
      {openModalEdit && (
        <ModalFormEdit
          isOpen={openModalEdit}
          onCancel={() => setOpenModalEdit(false)}
          onRefresh={() => setRefresh(!refresh)}
          isRefresh={handleRefresh}
          data={dataEdit}
        />
      )}
      <div className="w-[95%] mx-auto">
        <header className=" flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-500 font-thin">
              Search, filter, and manage your users with ease
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Search
              allowClear
              enterButton
              onSearch={handleSearch}
              placeholder="Search"
              className="w-[200px]  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="px-4 py-[5px] border border-gray-300 rounded-md flex items-center gap-2 text-gray-500 hover:border-gray-500 transition-all duration-300">
              <IoFilterSharp className="text-gray-500" /> Filters
            </button>
            <button
              className="px-2 py-[5px] bg-black r text-white rounded-md flex items-center hover:bg-black/80 transition-all duration-300"
              onClick={() => setOpenModal(true)}
            >
              <IoIosAdd size={21} /> Add user
            </button>
            <FloatButton
              type="primary"
              icon={<IoIosAdd />}
              onClick={genFakeData}
            />
            {selectedRowKeys.length > 0 && (
              <button
                className="px-4 py-[5px] bg-red-500 text-white rounded"
                type="primary"
                danger
                onClick={handleMultipleDelete}
              >
                Hapus {selectedRowKeys.length} data
              </button>
            )}
          </div>
        </header>
        <div className="overflow-hidden">
          <Table
            rowKey="id"
            columns={column}
            rowSelection={rowSelection}
            dataSource={data || []}
            pagination={{ pageSize: 6, position: ["bottomCenter"] }}
          />
        </div>
      </div>
    </main>
  );
};

export default ListMahasiswa;
