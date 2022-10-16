import React from "react";

import { Radio as AntDRadio, RadioGroupProps, RadioProps } from "antd";

import "./styles.less";

const Radio: React.FC<RadioProps> = ({ ...props }) => <AntDRadio {...props} />;

export const RadioGroup: React.FC<{ isCustom?: boolean } & RadioGroupProps> = ({
  isCustom,
  ...props
}) => (
  <AntDRadio.Group
    className={isCustom ? "custom" : props?.className}
    {...props}
  />
);

export default Radio;
