import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import AuthProvider from "./context/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotificationProvider from "./context/Notification";
import { ConfigProvider } from "antd";
import  trTR  from 'antd/lib/locale/tr_TR';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <NotificationProvider>
    <ToastContainer position="bottom-right"/>
    <ConfigProvider
    locale={trTR}
    // theme={{
    //   token: {
       
    //     colorBgContainer: '#001529',
    //   },
    // }}
  >
    <App />
  </ConfigProvider>
    
    </NotificationProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
