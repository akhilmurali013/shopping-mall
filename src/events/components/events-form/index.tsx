import React, { useEffect, useMemo } from "react";

import { useDeepCompareEffect } from "ahooks";
import { Button, Form, Input } from "antd";
import { Moment } from "moment";

import { EventType } from "app/types/events";
import FormItemImageUpload from "common/components/form-item-image-upload";
import ModuleLayout from "common/components/module-layout";
import Radio, { RadioGroup } from "common/components/radio";
import TableForm from "common/components/table-form";

import DateInput from "./components/date-input";
import TimeInput from "./components/time-input";

import "./styles.less";

const { TextArea } = Input;

export type EventFormValues = {
  eventType: EventType;
  name: string;
  description: string;
  date: {
    startDate: Moment;
    endDate?: Moment;
  };
  time?: {
    startTime: string;
    endTime: string;
  };
  poster: {
    url: string;
    blob?: File;
  };
  banner: {
    url: string;
    blob?: File;
  };
};

const EventForm: React.FC<{
  submitButtonText?: string;
  cancelButton?: React.ReactNode;
  formName: string;
  onSubmit?: (v: EventFormValues) => void;
  defaultValues?: Partial<EventFormValues>;
  variant: "form" | "view";
  loading?: boolean;
}> = ({
  submitButtonText,
  cancelButton,
  formName,
  onSubmit,
  defaultValues,
  variant,
  loading,
}) => {
  const disabled = useMemo(() => variant === "view", [variant]);

  const [form] = Form.useForm<EventFormValues>();

  useDeepCompareEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
      form.validateFields();
    }
  }, [form, defaultValues]);

  const eventType = Form.useWatch(["eventType"], form);

  useEffect(() => {
    if (eventType === EventType.ALL_DAY) {
      form.setFieldValue(["date", "endDate"], undefined);
      form.setFieldValue(["time"], undefined);
    }
    if (eventType === EventType.MULTI_DAY) {
      form.setFieldValue(["time"], undefined);
    }
  }, [eventType]);

  return (
    <div>
      <div className="event-form-module-header">
        <ModuleLayout.Header header={formName}>
          {cancelButton}
          {variant === "form" && (
            <Button
              loading={loading}
              size="large"
              type="primary"
              htmlType="button"
              disabled={disabled}
              onClick={form.submit}
            >
              {submitButtonText}
            </Button>
          )}
        </ModuleLayout.Header>
      </div>

      <Form form={form} onFinish={onSubmit} disabled={disabled}>
        <TableForm.Layout>
          <TableForm.Item label="Event type">
            <Form.Item
              name="eventType"
              rules={[{ required: true, message: "Required field" }]}
            >
              <RadioGroup isCustom>
                <Radio value={EventType.ALL_DAY}>All day</Radio>
                <Radio value={EventType.MULTI_DAY}>Multi day</Radio>
                <Radio value={EventType.SCHEDULED}>Scheduled</Radio>
              </RadioGroup>
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Event name">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Overview">
            <Form.Item name="description">
              <TextArea autoSize={{ minRows: 2, maxRows: 6 }} size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Date">
            <DateInput />
          </TableForm.Item>
          {eventType === EventType.SCHEDULED && (
            <TableForm.Item label="Time">
              <TimeInput />
            </TableForm.Item>
          )}
          <TableForm.Item
            label="Event Poster"
            subLabel="This image will come in Event cards"
          >
            <FormItemImageUpload name="poster" disabled={disabled} />
          </TableForm.Item>
          <TableForm.Item
            label="Event Banner"
            subLabel="This image will come in Event detail page"
          >
            <FormItemImageUpload name="banner" disabled={disabled} />
          </TableForm.Item>
        </TableForm.Layout>
      </Form>
    </div>
  );
};

export default EventForm;
