import React from "react";

import DeleteDialog from "common/components/delete-dialog";

const StoreDeleteModal: React.FC<{
  storeName: string;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}> = ({ storeName, onClose, onDelete, loading }) => (
  <DeleteDialog
    open
    header={`Delete ${storeName}`}
    description={`Are you sure you want to delete ${storeName} from  store records? This action cannot be undone.`}
    onClose={onClose}
    onDeleteClick={onDelete}
    loading={loading}
  />
);

export default StoreDeleteModal;
