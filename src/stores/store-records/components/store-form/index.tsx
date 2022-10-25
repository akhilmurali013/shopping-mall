import React, { useMemo } from "react";

import { useDeepCompareEffect } from "ahooks";
import { Button, Form, Input } from "antd";

import { StoreCatagories } from "app/types/store";
import FloorSelector from "common/components/floor-selector";
import FormItemImageUpload from "common/components/form-item-image-upload";
import ModuleLayout from "common/components/module-layout";
import PhoneNumberInput from "common/components/phone-number-input";
import TableForm from "common/components/table-form";
import TimeRangeSelect from "common/components/time-range-select";

import BankDetails from "./components/bank-details";
import StoreCatagoriesSelector from "./components/category-select";

import "./styles.less";

const { TextArea } = Input;

export type StoreFormValues = {
  storeName: string;
  ownerName: string;
  phoneNumbers: number[];
  emailId: string;
  website: string;
  location: number;
  categories: StoreCatagories[];
  storeSize: number;
  brandsAvailable: string;
  description: string;
  timing: {
    open: string;
    close: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    upiId: string;
  };
  brandLogo: {
    url: string;
    blob?: File;
  };
  storeImage: {
    url: string;
    blob?: File;
  };
};

const StoreForm: React.FC<{
  submitButtonText?: string;
  cancelButton?: React.ReactNode;
  formName: string;
  onSubmit?: (v: StoreFormValues) => void;
  defaultValues?: Partial<StoreFormValues>;
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

  const [form] = Form.useForm<StoreFormValues>();

  useDeepCompareEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        ...defaultValues,
        phoneNumbers: defaultValues?.phoneNumbers?.length
          ? defaultValues.phoneNumbers
          : [""],
      });
      form.validateFields();
    } else {
      form.setFieldsValue({ phoneNumbers: [""] });
    }
  }, [form, defaultValues]);

  return (
    <div>
      <div className="store-form-module-header">
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
          <TableForm.Item label="Store name">
            <Form.Item
              name="storeName"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Owner name">
            <Form.Item
              name="ownerName"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Phone number">
            <PhoneNumberInput
              name="phoneNumbers"
              disabled={disabled}
              maximumAllowed={2}
            />
          </TableForm.Item>
          <TableForm.Item label="Email Id">
            <Form.Item
              name="emailId"
              rules={[
                { required: true, message: "Required field" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Website">
            <Form.Item
              name="website"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Location">
            <FloorSelector name="location" />
          </TableForm.Item>
          <TableForm.Item label="Categories">
            <StoreCatagoriesSelector />
          </TableForm.Item>
          <TableForm.Item label="Store Size" subLabel="In Sq ft (Optional)">
            <Form.Item name="storeSize">
              <Input type="number" size="large" style={{ maxWidth: "240px" }} />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Brands Available" subLabel="Optional">
            <div>
              <Form.Item
                name="brandsAvailable"
                className="brands-available-form-item"
              >
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }} size="large" />
              </Form.Item>
              <div className="brands-available-helper-text">
                Type brand name with coma (,)
              </div>
            </div>
          </TableForm.Item>
          <TableForm.Item label="Brief description">
            <Form.Item name="description">
              <TextArea autoSize={{ minRows: 2, maxRows: 6 }} size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item
            label="Brand Logo"
            subLabel="This image will come in store cards and detail page"
          >
            <FormItemImageUpload name="brandLogo" disabled={disabled} />
          </TableForm.Item>
          <TableForm.Item
            label="Store Image"
            subLabel="This image will come in store cards"
          >
            <FormItemImageUpload name="storeImage" disabled={disabled} />
          </TableForm.Item>
          <TableForm.Item label="Store timing">
            <TimeRangeSelect
              startTimeNamePath={["timing", "open"]}
              endTimeNamePath={["timing", "close"]}
              startTimeLabel="pening time"
              closeTimeLabel="Close time"
            />
          </TableForm.Item>
          <TableForm.Item label="Banking details">
            <BankDetails />
          </TableForm.Item>
        </TableForm.Layout>
      </Form>
    </div>
  );
};

export default StoreForm;
