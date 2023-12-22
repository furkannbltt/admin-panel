import { NotificationModel } from "./types";
import "./style.scss";
import { displayedDateFormat } from "../../utils/helper";
import { Button, Col, Row, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface IProps {
  data: NotificationModel;
  onDelete: (id: number) => void;
  onRead: (id: number) => void;
}

const NotificationItem: React.FC<IProps> = ({ data, onDelete, onRead }) => {
  const formatSender = (notification: NotificationModel): string => {
    if (notification.users) {
      return notification.users.name;
    }
    return "Sistem Mesajı";
  };

  const formatDate = (date: Date): string => {
    const today = new Date();

    if (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      return displayedDateFormat(date);
    } else {
      return displayedDateFormat(date, "HH:mm");
    }
  };

  return (
    <div className="notification-item-container">
      <div className={`borderer ${!data.isRead ? "un-read" : ""}`}>
        <Row>
          <Col span={24} className="content">
            <div className="title">{data.title}</div>
            <div className="message">{data.message}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="footer">
            <span className="creator">Gönderen: {formatSender(data)}</span>
            <span className="create-date">
              {formatDate(new Date(data.createDate))}
            </span>
          </Col>
        </Row>

        <div className="delete-button">
          <Tooltip title="Sil">
            <Button
              onClick={() => onDelete(data.id)}
              icon={<DeleteOutlined />}
            ></Button>
          </Tooltip>
        </div>
        <div className="unReadDot"></div>
      </div>
    </div>
  );
};

export default NotificationItem;
