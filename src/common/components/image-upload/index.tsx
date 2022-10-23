import React from "react";

import { Upload as AntDUpload, Button, Image, UploadProps } from "antd";

import { ReactComponent as UploadIcon } from "./assets/upload-icon.svg";

import "./styles.less";

const { Dragger } = AntDUpload;

export const Upload: React.FC<UploadProps & { supportedFiles?: string }> = ({
  supportedFiles = "PNG, JPG, JPEG",
  ...props
}) => (
  <Dragger beforeUpload={() => false} {...props}>
    <div className="upload-icon-style">
      <UploadIcon />
    </div>
    <div className="upload-info-text">
      <span className="upload-info-text-blue">Click to upload</span>&nbsp;or
      drag and drop, {supportedFiles}
    </div>
  </Dragger>
);

const ImageViewer: React.FC<{
  url?: string;
  clearImage: () => void;
  deleteImage?: () => void;
}> = ({ url, clearImage, deleteImage }) => (
  <div className="image-preview-wrapper">
    <Image className="image-preview" src={url} />
    <div>
      {deleteImage && (
        <Button onClick={deleteImage} type="text">
          Delete
        </Button>
      )}
      <Button onClick={clearImage} type="link">
        Update
      </Button>
    </div>
  </div>
);

const ImageUpload: React.FC<{
  defaultImageUrl?: string;
  imageBlobUrl?: string;
  onChange: UploadProps["onChange"];
  clearImage: () => void;
  deleteImage?: () => void;
}> = ({ defaultImageUrl, imageBlobUrl, onChange, clearImage, deleteImage }) => {
  if (defaultImageUrl || imageBlobUrl) {
    return (
      <ImageViewer
        url={defaultImageUrl || imageBlobUrl}
        clearImage={clearImage}
        deleteImage={deleteImage}
      />
    );
  }
  return <Upload onChange={onChange} />;
};

export default ImageUpload;
