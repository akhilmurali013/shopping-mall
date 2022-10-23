import React from "react";

import { Button, UploadProps } from "antd";

import Icon from "common/components/icon";
import { Upload } from "common/components/image-upload";

import { ReactComponent as FileLogo } from "./assets/file-logo.svg";

import "./styles.less";

const FilePreview: React.FC<{
  fileUrl: string;
  fileName: string;
  fileSize?: string;
  onDeleteClick?: () => void;
  isEditable: boolean;
}> = ({ fileUrl, fileName, fileSize, onDeleteClick, isEditable }) => (
  <div className={isEditable ? "file-preview-editable" : "file-preview"}>
    <FileLogo />
    <div>
      <span className="file-name">{fileName}</span>
      <br />
      {fileSize}
    </div>
    <div style={{ marginLeft: "auto" }}>
      {isEditable ? (
        <Button type="text" onClick={onDeleteClick}>
          <Icon name="bin" />
        </Button>
      ) : fileUrl ? (
        <a rel="noreferrer" target="_blank" href={fileUrl}>
          View Document
        </a>
      ) : (
        ""
      )}
    </div>
  </div>
);

type FileUploadProps = {
  blob: File;
  defaultURL: string;
  defaultFileName: string;
  onDelete?: () => void;
  onChange: UploadProps["onChange"];
  isEditable: boolean;
};

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

const FileUpload: React.FC<FileUploadProps> = ({
  blob,
  defaultURL,
  defaultFileName,
  onDelete,
  onChange,
  isEditable,
}) => {
  if (!blob && !defaultURL)
    return <Upload supportedFiles="PDF, PNG, JPG" onChange={onChange} />;
  if (blob)
    return (
      <FilePreview
        fileName={blob?.name}
        fileSize={formatBytes(blob?.size)}
        onDeleteClick={onDelete}
        fileUrl={URL.createObjectURL(blob)}
        isEditable={isEditable}
      />
    );
  return (
    <FilePreview
      fileName={defaultFileName}
      onDeleteClick={onDelete}
      fileUrl={defaultURL}
      isEditable={isEditable}
    />
  );
};

export default FileUpload;
