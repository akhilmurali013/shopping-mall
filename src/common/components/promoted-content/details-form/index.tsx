import React, { useMemo } from "react";

import { Button, Form } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import Select, { SelectOptionsType } from "common/components/select";
import TableForm from "common/components/table-form";

import "./styles.less";

const DetailsForm: React.FC<{
  header: string;
  description: string;
  formItemNos: number;
  selectOptions: SelectOptionsType[];
  values?: string[];
  onSubmit: (values: string[]) => void;
  submitting?: boolean;
  onCancelClick: () => void;
}> = ({
  header,
  description,
  formItemNos,
  selectOptions,
  values,
  onSubmit,
  submitting = false,
  onCancelClick,
}) => {
  const [form] = Form.useForm<{ values: string[] }>();

  const options = useMemo(
    () => [...selectOptions, { label: "None", value: "" }],
    [selectOptions]
  );

  const initialValues = useMemo(
    () =>
      Array.from(Array(formItemNos).keys()).map((key) =>
        key < (values ?? [])?.length ? values?.[key] ?? "" : ""
      ),
    [formItemNos, values]
  );

  const onFormSubmit = (v: { values: string[] }) => {
    onSubmit(v?.values);
  };

  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Promoted content", "Edit"]} />
      <Form
        form={form}
        initialValues={{ values: initialValues }}
        onFinish={onFormSubmit}
      >
        <div className="form-header">
          <ModuleLayout.Header header={header ?? ""}>
            <Button block size="large" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              loading={submitting}
            >
              Save Details
            </Button>
          </ModuleLayout.Header>
          <div className="header-description">{description}</div>
        </div>
        <TableForm.Layout>
          <Form.List name="values">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key} noStyle>
                    <TableForm.Item label={`Position ${index + 1}`}>
                      <Form.Item
                        {...field}
                        shouldUpdate={(prevValue, currentValue) =>
                          prevValue !== currentValue
                        }
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const occurrences = getFieldValue([
                                "values",
                              ])?.filter((item: string) => item === value);
                              if (value && occurrences?.length > 1) {
                                return Promise.reject(
                                  new Error("This item is already selected")
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Select
                          showSearch
                          size="large"
                          options={options}
                          filterOption={(input, option) =>
                            option?.children?.[0]
                              ?.toLowerCase()
                              .includes(input?.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </TableForm.Item>
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
        </TableForm.Layout>
      </Form>
    </ModuleLayout>
  );
};

export default DetailsForm;
