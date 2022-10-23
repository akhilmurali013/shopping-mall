import React from "react";

import DeleteDialog from "common/components/delete-dialog";

const RestaurantDeleteModal: React.FC<{
  restaurantName: string;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}> = ({ restaurantName, onClose, onDelete, loading }) => (
  <DeleteDialog
    open
    header={`Delete ${restaurantName}`}
    description={`Are you sure you want to delete ${restaurantName} from  restaurants? This action cannot be undone.`}
    onClose={onClose}
    onDeleteClick={onDelete}
    loading={loading}
  />
);

export default RestaurantDeleteModal;
