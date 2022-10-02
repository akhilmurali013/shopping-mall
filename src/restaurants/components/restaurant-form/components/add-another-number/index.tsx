import React from "react";

import { Button, ButtonProps } from "antd";

const AddAnotherNumber: React.FC<ButtonProps> = ({ ...props }) => (
  <Button
    style={{ marginBottom: "24px" }}
    type={"default" as const}
    {...props}
    size="large"
  >
    Add another number
  </Button>
);

export default AddAnotherNumber;
