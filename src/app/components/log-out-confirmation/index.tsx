import React from "react";

import DeleteDialog from "common/components/delete-dialog";

import { ReactComponent as LogoutIcon } from "./assets/logout-red.svg";

const LogoutConfirmationModal: React.FC<{
  onClose: () => void;
  onDeleteClick: () => void;
}> = ({ onClose, onDeleteClick }) => (
  <DeleteDialog
    icon={<LogoutIcon />}
    open
    onClose={onClose}
    onDeleteClick={onDeleteClick}
    header="Logout from Dashboard"
    description="Are you sure you want to to logout from Dashboard."
    confirmButtonLabel="Confirm"
  />
);

export default LogoutConfirmationModal;
