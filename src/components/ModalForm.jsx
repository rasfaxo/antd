import { Button, Form, Input, Modal } from "antd";
import React from "react";
import supabase from "../connector";

const ModalForm = ({ open, onCancel, onRefresh }) => {
  const handleSubmit = (e) => {
    supabase
      .from("mahasiswa")
      .insert(e)
      .then((res) => {
        onCancel();
        onRefresh();
      });
  };
  return (
    <div>
      <Modal open={open} onCancel={onCancel} footer={false}>
        <h1 className="text-center text-2xl font-bold mb-4">Add User</h1>
        <Form
          layout="vertical"
          className="mt-2 grid grid-cols-2 gap-3"
          onFinish={handleSubmit}
        >
          <Form.Item 
          label="Nama Mahasiswa" 
          name="name"
          rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="NIM Mahasiswa"
            name="nim"
            rules={[{ required: true, message: "NIM tidak boleh kosong" }]}
          >
            <Input placeholder="Enter your nim" />
          </Form.Item>

          <Form.Item
            label="Alamat"
            name="alamat"
            rules={[{ required: true, message: "Alamat tidak boleh kosong" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Telepon"
            name="telp"
            rules={[{ required: true, message: "Telepon tidak boleh kosong" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="relative left-1/2 "
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalForm;
