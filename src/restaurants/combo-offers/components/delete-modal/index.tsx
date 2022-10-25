import React from "react";

import DeleteDialog from "common/components/delete-dialog";

const ComboDeleteModal: React.FC<{
  comboName: string;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}> = ({ comboName, onClose, onDelete, loading }) => (
  <DeleteDialog
    open
    header={`Delete ${comboName}`}
    description={`Are you sure you want to delete ${comboName} from  restaurants? This action cannot be undone.`}
    onClose={onClose}
    onDeleteClick={onDelete}
    loading={loading}
  />
);

export default ComboDeleteModal;
