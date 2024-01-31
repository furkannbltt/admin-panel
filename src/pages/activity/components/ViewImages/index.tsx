import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, Space, UploadProps } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { ImageModel } from "../../types";
import {
  addActivityImage,
  deleteActivityImage,
} from "../../../../services/activity/activity";

interface ImagesModalProps {
  visible: boolean;
  activityId: number;
  images: ImageModel[];
  onCancel: () => void;
}

const ImagesModal: React.FC<ImagesModalProps> = ({
  images,
  visible,
  activityId,
  onCancel,
}) => {
  const [fileList, setFileList] = useState<UploadFile<ImageModel>[]>([]);

  const convertToUploadFileList = (
    images: ImageModel[]
  ): UploadFile<ImageModel>[] => {
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
    await deleteActivityImage(file.uid);
    const currentImages = fileList.filter((image) => image.uid !== file.uid);
    setFileList(currentImages);
  };

  const customRequest: UploadProps<
    UploadFile<ImageModel>
  >["customRequest"] = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      // Dosyaları bir dizi olarak yolla
      await addActivityImage({
        images: [file as File],
        activitieId: activityId,
      }).then((response) => {
        const addedImage = response[0];
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
      title="Aktivite Görselleri"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Kapat
        </Button>
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
