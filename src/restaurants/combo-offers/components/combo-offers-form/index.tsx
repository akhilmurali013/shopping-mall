import React, { useEffect, useMemo } from "react";

import { Button, Form, Input } from "antd";

import FormItemImageUpload from "common/components/form-item-image-upload";
import ModuleLayout from "common/components/module-layout";
import TableForm from "common/components/table-form";

import AddCategory from "./components/add-category-input";

import "./styles.less";

export type ComboOffersFormValue = {
  comboName: string;
  cost: number;
  comboImage: {
    url: string;
    blob?: File;
  };
  description: string;
  comboCategories: {
    comboCategoryName: string;
    items: {
      restaurantId: string;
      dishId: string;
      dishVariantId: string;
      price?: number;
    }[];
  }[];
};

const { TextArea } = Input;

const ComboOffersForm: React.FC<{
  submitButtonText?: string;
  cancelButton?: React.ReactNode;
  formName: string;
  onSubmit?: (v: ComboOffersFormValue) => void;
  defaultValues?: Partial<ComboOffersFormValue>;
  variant: "create-form" | "update-form" | "view";
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
  const [form] = Form.useForm<ComboOffersFormValue>();

  useEffect(() => {
    form.setFieldsValue({
      ...defaultValues,
      comboCategories: defaultValues?.comboCategories?.length
        ? defaultValues?.comboCategories
        : variant === "view"
        ? undefined
        : [
            {
              comboCategoryName: "",
              items: [
                {
                  restaurantId: "",
                  dishId: "",
                  dishVariantId: "",
                },
              ],
            },
          ],
    });
  }, [form, defaultValues, variant]);

  const comboCategories = Form.useWatch(["comboCategories"], form);

  useEffect(() => {
    const totalPrice = comboCategories?.reduce((price, category) => {
      const sum = category?.items?.reduce(
        (acc, item) => acc + (item?.price ?? 0),
        0
      );
      return price + sum;
    }, 0);
    form.setFieldValue(["cost"], totalPrice);
  }, [form, comboCategories]);

  return (
    <div>
      <div className="combo-form-module-header">
        <ModuleLayout.Header header={formName}>
          {cancelButton}
          {(variant === "create-form" || variant === "update-form") && (
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
          <TableForm.Item label="Combo offer name">
            <Form.Item
              name="comboName"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input size="large" />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item
            label="Cost"
            subLabel="Automatically calculated as you add items"
          >
            <Form.Item
              name="cost"
              rules={[{ required: true, message: "Required field" }]}
            >
              <Input
                type="number"
                size="large"
                prefix="₹"
                className="amount-input-field"
              />
            </Form.Item>
          </TableForm.Item>
          <AddCategory disabled={disabled} />
          <TableForm.Item
            label="Combo image"
            subLabel="This image will come in combo cards"
          >
            <FormItemImageUpload name="comboImage" disabled={disabled} />
          </TableForm.Item>
          <TableForm.Item label="Combo description">
            <Form.Item name="description">
              <TextArea autoSize={{ minRows: 2, maxRows: 6 }} size="large" />
            </Form.Item>
          </TableForm.Item>
        </TableForm.Layout>
      </Form>
    </div>
  );
};

export default ComboOffersForm;
