import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, Space, UploadProps } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { HotelImage } from "../../types";

interface ImagesModalProps {
  visible: boolean;
  images: HotelImage[];
  onCancel: () => void;
}

const ImagesModal: React.FC<ImagesModalProps> = ({
  images,
  visible,
  onCancel,
}) => {
  const [fileList, setFileList] = useState<UploadFile<HotelImage>[]>([]);

  const convertToUploadFileList = (
    images: HotelImage[]
  ): UploadFile<HotelImage>[] => {
    return images.map((image) => ({
      uid: image.id.toString(),
      name: image.id.toString(),
      status: "done",
      url: image.url,
    }));
  };

  useEffect(() => {
    setFileList(convertToUploadFileList(images));
  }, [images]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onRemove = async (file: UploadFile) => {
    const imageId = parseInt(file.uid, 10);
    console.log(imageId, "ekle");
  };

  const customRequest: UploadProps<UploadFile<HotelImage>>["customRequest"] = ({
    file,
    onSuccess,
    onError,
    onProgress,
  }) => {
    console.log(file, "deneme");
  };

  return (
    <Modal
      title="Otel Görselleri"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Kapat
        </Button>,
      ]}
    >
      <Space direction="vertical">
        <Upload
          customRequest={customRequest}
          listType="picture-card"
          fileList={fileList}
          onRemove={onRemove}
          onChange={onChange}
          multiple
          accept="image/*"
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </Space>
    </Modal>
  );
};

export default ImagesModal;
