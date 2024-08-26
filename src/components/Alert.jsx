import React from 'react'
import { Alert } from 'antd'

const AlertMessage = ({message, type, onClose, className}) => {
  return (
    <Alert
      message={message}
      type={type}
      showIcon
      closable
      onClose={onClose}
      className={className}
    />
  )
}

export default AlertMessage