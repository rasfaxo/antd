import { Modal } from 'antd'
import React from 'react'

const ModalForm = ({open, onCancel, onOk, title, children}) => {
  return (
    <div>
        <Modal
        open={open}
        footer={false}
        onCancel={onCancel}
        onOk={onOk}
        title={title}
        >
            {children}

        </Modal>
    </div>
  )
}

export default ModalForm