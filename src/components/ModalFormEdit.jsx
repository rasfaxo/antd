import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import supabase from "../connector";

export const ModalFormEdit = ({isOpen, onCancel, onRefresh, data}) => {
  const [form] = Form.useForm();
  const [dataEdit, setDataEdit] = useState(data);

  useEffect(() => {
    setDataEdit(data);
    form.setFieldsValue(dataEdit);
  }, [data, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const handleSubmit = () => {
    supabase
      .from("mahasiswa")
      .update(dataEdit)
      .eq("id", dataEdit.id)
      .then(({ error }) => {
        if (error) {
          message.error(`Gagal memperbarui data ${error.message}`);
        } else {
          message.success(`Berhasil memperbarui data`);
          form.resetFields();
          onCancel();
          if (typeof onRefresh === "function") {
            onRefresh();
          }
        }
      });
  };

  return (
    <div>
      <Modal
        open={isOpen}
        footer={false}
        onCancel={onCancel}
        className="p-4"
      >
        <h1 className="text-center mt-4 text-2xl text-blue-600">
          Form Mahasiswa
        </h1>
        <Form
          form={form}
          layout="vertical"
          className="mt-2 grid grid-cols-2 gap-4"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Nama Mahasiswa"
            name="name"
            rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
          >
            <Input name="name" value={dataEdit?.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Nim Mahasiswa"
            name="nim"
            rules={[{ required: true, message: "Nim tidak boleh kosong" }]}
          >
            <Input name="nim" value={dataEdit?.nim} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Alamat Mahasiswa"
            name="alamat"
            rules={[{ required: true, message: "Alamat tidak boleh kosong" }]}
          >
            <Input
              name="alamat"
              value={dataEdit?.alamat}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="No Telepon"
            name="telp"
            rules={[
              { required: true, message: "Nomor telepon tidak boleh kosong" },
            ]}
          >
            <Input
              name="telp"
              value={dataEdit?.telp}
              onChange={handleChange}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="relative left-1/2"
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalFormEdit;

