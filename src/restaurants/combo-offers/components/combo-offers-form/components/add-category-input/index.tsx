import React, { useEffect } from "react";

import { Button, ButtonProps, Form, FormListFieldData, Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";
import TableForm from "common/components/table-form";
import { useGetRestaurantNameIdMap } from "restaurants/combo-offers/hooks";

import useGetRestaurantDishDetails from "../../hooks/get-restaurant-details";

import "./styles.less";

const DeleteButton: React.FC<ButtonProps> = ({ ...props }) => (
  <Button htmlType="button" size="large" className="delete-button" {...props}>
    <Icon name="bin" style={{ marginTop: "5px" }} />
  </Button>
);

const ItemSubForm: React.FC<{
  itemField: FormListFieldData;
  itemIndex: number;
  categoryIndex: number;
  onRemove: () => void;
  disabled: boolean;
}> = ({ itemField, itemIndex, categoryIndex, onRemove, disabled }) => {
  const restaurantNameIdMap = useGetRestaurantNameIdMap();
  const form = Form.useFormInstance();
  const restaurantId = Form.useWatch(
    [
      "comboCategories",
      `${categoryIndex}`,
      "items",
      `${itemIndex}`,
      "restaurantId",
    ],
    form
  );
  const dishId = Form.useWatch(
    ["comboCategories", `${categoryIndex}`, "items", `${itemIndex}`, "dishId"],
    form
  );
  const dishVariantId = Form.useWatch(
    [
      "comboCategories",
      `${categoryIndex}`,
      "items",
      `${itemIndex}`,
      "dishVariantId",
    ],
    form
  );

  const clearFields = {
    dishId: () =>
      form.setFieldValue(
        [
          "comboCategories",
          `${categoryIndex}`,
          "items",
          `${itemIndex}`,
          "dishId",
        ],
        undefined
      ),
    variantId: () =>
      form.setFieldValue(
        [
          "comboCategories",
          `${categoryIndex}`,
          "items",
          `${itemIndex}`,
          "dishVariantId",
        ],
        undefined
      ),
  };

  const { restaurantDishIdNameMap, dishVariantMap, variantIdMap } =
    useGetRestaurantDishDetails(restaurantId);

  useEffect(() => {
    if (dishVariantId) {
      form.setFieldValue(
        [
          "comboCategories",
          `${categoryIndex}`,
          "items",
          `${itemIndex}`,
          "price",
        ],
        variantIdMap?.[dishVariantId]?.price
      );
    }
  }, [dishVariantId, variantIdMap]);

  return (
    <TableForm.Item
      label={`Item ${itemIndex + 1}`}
      labelClassName="hide-top-border"
    >
      <div className="inner-item-wrapper">
        <div className="inner-item-restaurant">
          <Label>Restaurant</Label>
          <Form.Item
            name={[itemField.name, "restaurantId"]}
            rules={[{ required: true, message: "Required field" }]}
          >
            <Select
              className="add-category-input-item"
              size="large"
              options={restaurantNameIdMap}
              onChange={() => {
                clearFields.dishId();
                clearFields.variantId();
              }}
            />
          </Form.Item>
        </div>
        <div className="inner-item-dish">
          <Label>Dish</Label>
          <Form.Item
            name={[itemField.name, "dishId"]}
            rules={[{ required: true, message: "Required field" }]}
          >
            <Select
              className="add-category-input-item"
              size="large"
              options={restaurantDishIdNameMap ?? []}
              onChange={() => {
                clearFields.variantId();
              }}
            />
          </Form.Item>
        </div>
        <div className="inner-item-variant">
          <Label>Variant</Label>
          <Form.Item
            name={[itemField.name, "dishVariantId"]}
            rules={[{ required: true, message: "Required field" }]}
          >
            <Select
              className="add-category-input-item"
              size="large"
              options={
                dishVariantMap?.[dishId]?.map((variant) => ({
                  label: variant.variantName,
                  value: variant.dishVariantId,
                })) ?? []
              }
            />
          </Form.Item>
        </div>
        <div className="inner-item-cost">
          <Label>Cost</Label>
          <Form.Item>
            <Input
              className="add-category-input-item"
              size="large"
              prefix="₹"
              disabled
              value={variantIdMap?.[dishVariantId]?.price}
            />
          </Form.Item>
        </div>
        {!disabled && itemIndex !== 0 && (
          <Form.Item className="inner-item-bin">
            <DeleteButton onClick={onRemove} />
          </Form.Item>
        )}
      </div>
    </TableForm.Item>
  );
};

const AddCategory: React.FC<{ disabled: boolean }> = ({ disabled }) => (
  <Form.List name="comboCategories">
    {(fields, { add, remove }) => (
      <>
        {fields?.map((field, index) => (
          <>
            <TableForm.Item label={`Combo Category ${index + 1}`}>
              <div>
                <Label>Category Name</Label>
                <div className="category-input-wrapper">
                  <Form.Item
                    name={[field.name, "comboCategoryName"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input className="add-category-input-item" size="large" />
                  </Form.Item>
                  {!disabled && index !== 0 && (
                    <Form.Item className="inner-item-bin">
                      <DeleteButton onClick={() => remove(index)} />
                    </Form.Item>
                  )}
                </div>
              </div>
            </TableForm.Item>
            <Form.List name={[field.name, "items"]}>
              {(itemFields, { add: itemAdd, remove: itemRemove }) => (
                <>
                  {itemFields.map((itemField, itemFieldIndex) => (
                    <ItemSubForm
                      itemField={itemField}
                      itemIndex={itemFieldIndex}
                      categoryIndex={index}
                      onRemove={() => itemRemove(itemFieldIndex)}
                      disabled={disabled}
                    />
                  ))}
                  {!disabled && (
                    <TableForm.Item
                      label={`Item ${(itemFields?.length ?? 0) + 1}`}
                      labelClassName="hide-top-border"
                    >
                      <Form.Item>
                        <Button
                          size="large"
                          onClick={() =>
                            itemAdd({
                              restaurantId: "",
                              dishId: "",
                              dishVariantId: "",
                            })
                          }
                        >
                          Add new item
                        </Button>
                      </Form.Item>
                    </TableForm.Item>
                  )}
                </>
              )}
            </Form.List>
          </>
        ))}
        {!disabled && (
          <TableForm.Item label={`Combo Category ${(fields?.length ?? 0) + 1}`}>
            <Form.Item>
              <Button
                size="large"
                onClick={() =>
                  add({
                    comboCategoryName: "",
                    items: [
                      {
                        restaurantId: "",
                        dishId: "",
                        dishVariantId: "",
                      },
                    ],
                  })
                }
              >
                Add new Category
              </Button>
            </Form.Item>
          </TableForm.Item>
        )}
      </>
    )}
  </Form.List>
);

export default AddCategory;
