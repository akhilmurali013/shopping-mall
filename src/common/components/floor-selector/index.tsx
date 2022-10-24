import React, { useMemo } from "react";

import { Form } from "antd";
import { NamePath } from "antd/lib/form/interface";

import Select from "common/components/select";

import useGetFloorInfo from "./hooks/get-floor-data";

const LocationSelector: React.FC<{
  name: NamePath;
}> = ({ name }) => {
  const { data } = useGetFloorInfo();

  const floorData = useMemo(
    () => data?.data?.map((floor) => ({ value: floor.id, label: floor.name })),
    [data]
  );

  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Required field" }]}
    >
      <Select
        options={floorData ?? []}
        size="large"
        style={{ maxWidth: "240px" }}
      />
    </Form.Item>
  );
};

export default LocationSelector;
