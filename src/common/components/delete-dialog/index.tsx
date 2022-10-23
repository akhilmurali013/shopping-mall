import React, { useRef } from "react";

import ReactDOM from "react-dom";

import { useClickAway, useKeyPress } from "ahooks";
import { Button } from "antd";

import { ReactComponent as DeleteInfoIcon } from "./assets/delete-info-icon.svg";

import "./styles.less";

const DialogWrapper: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  ...props
}) => <div {...props} className="dialog-root-wrapper" />;
const DialogContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  ...props
}) => <div {...props} className="dialog-container" />;

type DialogProps = {
  confirmButtonLabel?: string;
  icon?: React.ReactNode;
  header: string;
  description: string;
  onDeleteClick: () => void;
  onClose: () => void;
  loading?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
  confirmButtonLabel,
  header,
  description,
  onClose,
  onDeleteClick,
  loading,
  icon,
}) => {
  const dialogRef = useRef(null);
  useClickAway(() => {
    onClose();
  }, dialogRef);
  useKeyPress("Escape", () => {
    onClose();
  });
  return (
    <DialogWrapper>
      <DialogContainer ref={dialogRef}>
        {icon ?? <DeleteInfoIcon />}
        <div className="header">{header}</div>
        {description && <div className="description">{description}</div>}
        <div className="actions">
          <Button block size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="delete-btn"
            block
            size="large"
            danger
            type="primary"
            onClick={onDeleteClick}
            loading={loading}
          >
            {confirmButtonLabel ?? "Delete"}
          </Button>
        </div>
      </DialogContainer>
    </DialogWrapper>
  );
};

const DeleteDialog: React.FC<DialogProps & { open: boolean }> = (props) => {
  const { open } = props;

  if (open) {
    return ReactDOM.createPortal(
      <Dialog {...props} />,
      document.getElementById("dialog-root") as HTMLElement
    );
  }
  return null;
};

export default DeleteDialog;
