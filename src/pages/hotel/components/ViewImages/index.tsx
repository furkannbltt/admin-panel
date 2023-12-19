import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, Space, UploadProps } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { HotelImage } from "../../types";
import { addHotelImage } from "../../../../services/hotel/hotel";

interface ImagesModalProps {
  visible: boolean;
  hotelId: number;
  images: HotelImage[];
  onCancel: () => void;
  onDelete: (imageId: string) => void;
}

const ImagesModal: React.FC<ImagesModalProps> = ({
  images,
  visible,
  hotelId,
  onCancel,
  onDelete,
}) => {
  const [fileList, setFileList] = useState<UploadFile<HotelImage>[]>([]);

  const convertToUploadFileList = (
    images: HotelImage[]
  ): UploadFile<HotelImage>[] => {
    return images.map((image) => ({
      uid: image.id.toString(),
      name: image.id.toString(),
      status: "done",
      url: `${process.env.REACT_APP_API_BASE_URL}${image.imageUrl}`,
    }));
  };

  useEffect(() => {
    setFileList(convertToUploadFileList(images));
  }, [images]);

  const onRemove = async (file: UploadFile) => {
    const imageId = file.uid;
    onDelete(imageId);
  };

  const customRequest: UploadProps<
  UploadFile<HotelImage>
>["customRequest"] = async ({ file, onSuccess, onError, onProgress }) => {
  try {
    const response = await addHotelImage({
      images: [file as File],
      hotelId: hotelId,
    });

    const addedImage = response.data[0]; 
    setFileList((prevFileList) => [
      ...prevFileList,
      {
        uid: addedImage.id.toString(),
        name: addedImage.id.toString(),
        status: "done",
        url: `${process.env.REACT_APP_API_BASE_URL}${addedImage.imageUrl}`,
      },
    ]);

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
