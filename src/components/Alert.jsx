import React, { useEffect, useState } from "react";
import { notification } from "antd";

const AlertMessage = ({ type, message, description }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    if (['success', 'info', 'warning', 'error'].includes(type)) {
      api[type]({
        message: message,
        description: description,
      });
    } else {
      console.error(`Invalid notification type: ${type}`);
    }
  };

  useEffect(() => {
    openNotification();
  }, [message, description, type]); 

  return <>{contextHolder}</>;
};

export default AlertMessage;