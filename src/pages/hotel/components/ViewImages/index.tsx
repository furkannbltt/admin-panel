import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, Space, UploadProps } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { HotelImage } from "../../types";
import {
  addHotelImage,
  deleteHotelImage,
} from "../../../../services/hotel/hotel";

interface ImagesModalProps {
  visible: boolean;
  hotelId: number;
  images: HotelImage[];
  onCancel: () => void;
}

const ImagesModal: React.FC<ImagesModalProps> = ({
  images,
  visible,
  hotelId,
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
      url: `${process.env.REACT_APP_CDN_URL}${image.imageUrl}`,
    }));
  };

  useEffect(() => {
    setFileList(convertToUploadFileList(images));
  }, [images]);

  const onRemove = async (file: UploadFile) => {
    await deleteHotelImage(file.uid);
    const currentImages = fileList.filter((image) => image.uid !== file.uid);
    setFileList(currentImages);
  };

  const customRequest: UploadProps<
    UploadFile<HotelImage>
  >["customRequest"] = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      await addHotelImage({
        images: [file as File],
        hotelId: hotelId,
      }).then((response) => {
        const addedImage = response.data[0];
        setFileList((prevFileList) => [
          ...prevFileList,
          {
            uid: addedImage.id.toString(),
            name: addedImage.id.toString(),
            status: "done",
            url: `${process.env.REACT_APP_CDN_URL}${addedImage.imageUrl}`,
          },
        ]);
      });

      // @ts-ignore
      onSuccess();
    } catch (error) {
      // @ts-ignore
      onError();
    }
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
