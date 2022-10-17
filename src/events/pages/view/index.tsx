import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Icon from "common/components/icon";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import EventDeleteModal from "events/components/event-delete-modal";
import EventForm from "events/components/events-form";
import { useDeleteEvent, useGetEvent } from "events/hooks";
import routes from "events/routes";
import mapToEventForm from "events/services/map-to-event-form";

const ViewEvent: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const { id } = useParams();
  const { mutateAsync, isLoading: isDeleting } = useDeleteEvent();
  const { data, isLoading } = useGetEvent(id);

  const event = data?.data;

  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Events", "details"]} />
        {isLoading && <Loader />}
        {event && (
          <EventForm
            formName={event?.name ?? ""}
            defaultValues={mapToEventForm(event)}
            cancelButton={
              <>
                <Button onClick={() => toggleDeleteModal(true)} size="large">
                  <Icon name="bin" style={{ marginTop: "5px" }} />
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate(routes.edit)}
                  disabled={false}
                >
                  Edit Details
                </Button>
              </>
            }
            variant="view"
            loading={isLoading}
          />
        )}
      </ModuleLayout>
      {showDeleteModal && event?.eventId && (
        <EventDeleteModal
          eventName={event?.name ?? ""}
          onClose={() => toggleDeleteModal(false)}
          onDelete={() =>
            mutateAsync({ id: event?.eventId }).then(() => {
              toggleDeleteModal(false);
              navigate(`/a/${routes.root}`);
            })
          }
          loading={isDeleting}
        />
      )}
    </>
  );
};

export default ViewEvent;
