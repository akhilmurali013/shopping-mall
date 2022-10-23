import React, { useMemo } from "react";

import { useDeepCompareEffect } from "ahooks";
import { Button, Form, Input } from "antd";

import { CuisineStyle, DishCategory } from "app/types/restaurant";
import FloorSelector from "common/components/floor-selector";
import FormItemFileUpload from "common/components/form-item-file-upload";
import FormItemImageUpload from "common/components/form-item-image-upload";
import ModuleLayout from "common/components/module-layout";
import PhoneNumberInput from "common/components/phone-number-input";
import TableForm from "common/components/table-form";
import TimingSelect from "common/components/time-range-select";
import { useDeleteRestaurantFile } from "restaurants/hooks";
import RestaurantFileCategory from "restaurants/services/restaurent-file-category";

import BankAccountDetails from "./components/bank-account-details";
import CuisineStyleSelector from "./components/cuisine-style-selector";
import DishCategorySelector from "./components/dish-categories-selector";

import "./styles.less";

export type RestaurantFormValues = {
  restaurantName: string;
  ownerName: string;
  restaurantPhoneNumber: number[];
  ownerPhoneNumber: number[];
  emailId: string;
  location: string;
  cuisineStyles: CuisineStyle[];
  dishCategories: DishCategory[];
  brandLogo: {
    url: string;
    blob?: File;
  };
  timing: {
    open: string;
    close: string;
  };
  bankDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
  };
  menuImage: {
    url: string;
    blob?: File;
  };
  panFile: {
    url: string;
    blob?: File;
  };
  gstCertificate: {
    url: string;
    blob?: File;
  };
  fssaiCertificate: {
    url: string;
    blob?: File;
  };
};

const RestaurantForm: React.FC<{
  submitButtonText?: string;
  cancelButton?: React.ReactNode;
  formName: string;
  onSubmit?: (v: RestaurantFormValues) => void;
  defaultValues?: Partial<RestaurantFormValues>;
  variant: "create-form" | "update-form" | "view";
  loading?: boolean;
  restaurantId?: string;
}> = ({
  submitButtonText,
  cancelButton,
  formName,
  onSubmit,
  defaultValues,
  variant,
  loading,
  restaurantId,
}) => {
  const { mutateAsync } = useDeleteRestaurantFile();
  const disabled = useMemo(() => variant === "view", [variant]);
  const [form] = Form.useForm();

  const deleteFile = (fileCategory: RestaurantFileCategory) => {
    if (restaurantId) {
      const { setFieldValue } = form;
      mutateAsync({
        restaurantId,
        fileCategory,
      }).then(() => {
        switch (fileCategory) {
          case RestaurantFileCategory.RESAURANT_MENU_IMAGE:
            setFieldValue("menuImage", undefined);
            break;
          case RestaurantFileCategory.RESTAURANT_FSSAI_CERTIFICATE:
            setFieldValue("fssaiCertificate", undefined);
            break;
          case RestaurantFileCategory.RESTAURANT_GST_CERTIFICATE:
            setFieldValue("gstCertificate", undefined);
            break;
          case RestaurantFileCategory.RESTAURANT_LOGO:
            setFieldValue("brandLogo", undefined);
            break;
          case RestaurantFileCategory.RESTAURANT_PAN:
            setFieldValue("panFile", undefined);
            break;
          default:
            break;
        }
      });
    }
  };

  useDeepCompareEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        ...defaultValues,
        restaurantPhoneNumber: defaultValues?.restaurantPhoneNumber?.length
          ? defaultValues.restaurantPhoneNumber
          : [""],
        ownerPhoneNumber: defaultValues?.ownerPhoneNumber?.length
          ? defaultValues?.ownerPhoneNumber
          : [""],
      });
      form.validateFields();
    } else {
      form.setFieldsValue({
        restaurantPhoneNumber: [""],
        ownerPhoneNumber: [""],
      });
    }
  }, [form, defaultValues]);

  return (
    <div>
      <div className="restaurant-form-module-header">
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
          <TableForm.Item label="Restaurant name">
            <Form.Item
              name="restaurantName"
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
          <TableForm.Item label="Restaurant Phone number">
            <Form.Item name="restaurantPhoneNumber">
              <PhoneNumberInput
                name="restaurantPhoneNumber"
                maximumAllowed={2}
              />
            </Form.Item>
          </TableForm.Item>
          <TableForm.Item label="Owner Phone number">
            <Form.Item name="ownerPhoneNumber">
              <PhoneNumberInput name="ownerPhoneNumber" maximumAllowed={2} />
            </Form.Item>
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
          <TableForm.Item label="Location">
            <FloorSelector name="location" />
          </TableForm.Item>
          <TableForm.Item label="Type">
            <CuisineStyleSelector />
          </TableForm.Item>
          <TableForm.Item label="Food Catagories">
            <DishCategorySelector />
          </TableForm.Item>
          <TableForm.Item label="Brand Logo" subLabel="State with image">
            <FormItemImageUpload
              name="brandLogo"
              deleteImage={() =>
                deleteFile(RestaurantFileCategory.RESTAURANT_LOGO)
              }
            />
          </TableForm.Item>
          <TableForm.Item label="Store timing">
            <TimingSelect
              startTimeNamePath={["timing", "open"]}
              endTimeNamePath={["timing", "close"]}
              startTimeLabel="Opens at"
              closeTimeLabel="Close at"
            />
          </TableForm.Item>
          <TableForm.Item label="Bank account details">
            <BankAccountDetails />
          </TableForm.Item>
          <TableForm.Item
            label="Upload menu photos"
            subLabel="Customers will choose items from this menu while placing online orders"
          >
            <FormItemImageUpload
              name="menuImage"
              deleteImage={() =>
                deleteFile(RestaurantFileCategory.RESAURANT_MENU_IMAGE)
              }
            />
          </TableForm.Item>
          <TableForm.Item label="Upload PAN details">
            <FormItemImageUpload
              name="panFile"
              deleteImage={() =>
                deleteFile(RestaurantFileCategory.RESTAURANT_PAN)
              }
            />
          </TableForm.Item>
          <TableForm.Item label="Upload GST certificate">
            <FormItemFileUpload
              name="gstCertificate"
              defaultFileName="GST Certificate"
              isEditable={!disabled}
            />
          </TableForm.Item>
          <TableForm.Item label="Upload FSSAI certificate">
            <FormItemFileUpload
              name="fssaiCertificate"
              defaultFileName="FSSAI Certificate"
              isEditable={!disabled}
            />
          </TableForm.Item>
        </TableForm.Layout>
      </Form>
    </div>
  );
};

export default RestaurantForm;
