import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Upload, UploadFile } from "antd";
import { UploadProps } from "antd/es/upload";
import ContentHeader from "../../components/ContentHeader";
import { SiteSettingsModel } from "./types";
import {
  getSiteSettings,
  updateSettings,
} from "../../services/siteSettings/siteSettings";
import ReactQuill from "react-quill";

const SiteSettingsPage: React.FC = () => {
  const homePageTextRef = useRef<ReactQuill>(null);
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<UploadFile<any>[]>([]);
  const [initialValues, setInitialValues] = useState<
    Partial<SiteSettingsModel>
  >({
    id: 1,
    homePageText: "",
    phoneNumber: "",
    mail: "",
    address: "",
    image: "" as any,
  });

  const convertToUploadFileList = (image: string): UploadFile<any>[] => {
    return [
      {
        uid: "image",
        name: "inage",
        status: "done",
        url: `${process.env.REACT_APP_CDN_URL}${image}`,
      },
    ];
  };

  const loadComponent = async () => {
    try {
      const response = await getSiteSettings();
      setInitialValues(response);
      form.setFieldsValue(response);
      setFile(
        response.image ? convertToUploadFileList(response.image as any) : []
      );
    } catch (error) {
      console.error("Failed to load site settings", error);
    }
  };

  useEffect(() => {
    loadComponent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleEditOk = async (values: SiteSettingsModel) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        image: file && (file[0] as any),
      };

      await updateSettings(payload);
      await loadComponent();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const customRequest: UploadProps<UploadFile<File>>["customRequest"] = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }) => {
    try {
      // Dosyaları bir dizi olarak yolla
      setFile([file] as any);

      // @ts-ignore
      onSuccess();
    } catch (error) {
      // @ts-ignore
      onError();
    }
  };

  const handleRemove = () => {
    setFile([]);
  };

  return (
    <>
      <ContentHeader title={"Site Ayarları"} />

      <Form
        form={form}
        name="siteSettings"
        onFinish={handleEditOk}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item name="image" label="Karşılama Resmi">
          <Upload
            customRequest={customRequest}
            listType="picture-card"
            onRemove={handleRemove}
            maxCount={1}
            accept="image/*"
            fileList={file}
          >
            {!file.length && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item name="homePageText" label="Karşılama Metni">
          <ReactQuill ref={homePageTextRef} placeholder="Metin giriniz" />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Telefon Numarası">
          <Input />
        </Form.Item>
        <Form.Item name="mail" label="Mail">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Adres">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SiteSettingsPage;
