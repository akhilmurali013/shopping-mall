import React from "react";

import DeleteDialog from "common/components/delete-dialog";

const EventDeleteModal: React.FC<{
  eventName: string;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}> = ({ eventName, onClose, onDelete, loading }) => (
  <DeleteDialog
    open
    header={`Delete ${eventName}`}
    description={`Are you sure you want to delete ${eventName} from  Events?`}
    onClose={onClose}
    onDeleteClick={onDelete}
    loading={loading}
  />
);

export default EventDeleteModal;
