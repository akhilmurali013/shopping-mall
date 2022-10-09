import React from "react";

import { Upload as AntDUpload, Button, Image, UploadProps } from "antd";

import { ReactComponent as UploadIcon } from "./assets/upload-icon.svg";

import "./styles.less";

const { Dragger } = AntDUpload;

const Upload: React.FC<UploadProps> = ({ ...props }) => (
  <Dragger beforeUpload={() => false} {...props}>
    <div className="upload-icon-style">
      <UploadIcon />
    </div>
    <div className="upload-info-text">
      <span className="upload-info-text-blue">Click to upload</span>&nbsp;or
      drag and drop PDF, PNG, JPG
    </div>
  </Dragger>
);

const ImageViewer: React.FC<{
  url?: string;
  clearImage: () => void;
}> = ({ url, clearImage }) => (
  <div className="image-preview-wrapper">
    <Image className="image-preview" src={url} />
    <Button onClick={clearImage} type="text">
      Delete
    </Button>
  </div>
);

const ImageUpload: React.FC<{
  defaultImageUrl?: string;
  imageBlobUrl?: string;
  onChange: UploadProps["onChange"];
  clearImage: () => void;
}> = ({ defaultImageUrl, imageBlobUrl, onChange, clearImage }) => {
  if (defaultImageUrl || imageBlobUrl) {
    return (
      <ImageViewer
        url={defaultImageUrl || imageBlobUrl}
        clearImage={clearImage}
      />
    );
  }
  return <Upload onChange={onChange} />;
};

export default ImageUpload;
