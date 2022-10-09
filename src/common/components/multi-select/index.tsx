import React, { useCallback, useMemo, useRef, useState } from "react";

import { useClickAway } from "ahooks";
import { Input, InputProps } from "antd";

import Icon from "../icon";

import "./styles.less";

const SelectedOption: React.FC<{
  value: string;
  label: string;
  onClick: (v: string) => void;
  disabled?: boolean;
}> = ({ label, value, onClick, disabled = false }) => (
  <button
    type="button"
    className="selected-option-item"
    onClick={() => onClick(value)}
    disabled={disabled}
  >
    {label}
    <Icon name="close" />
  </button>
);

const MultiSelect: React.FC<
  InputProps & {
    options?: { label: string; value: string }[];
    values?: string[];
    removeSelectedOptions?: boolean;
    onOptionSelect: (v: string) => void;
    onOptionDeselect: (v: string) => void;
    wrapperStyles?: React.CSSProperties;
    disabled?: boolean;
  }
> = ({
  options,
  values,
  removeSelectedOptions,
  onOptionSelect,
  onOptionDeselect,
  wrapperStyles,
  disabled,
  ...props
}) => {
  const [searchString, setSearchString] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);
  const updateSearchString = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(e?.target?.value?.toLocaleLowerCase());
    },
    []
  );

  useClickAway(() => {
    setShowDropdown(false);
    setSearchString("");
  }, ref);

  const onFocus = () => {
    setShowDropdown(true);
  };

  const filteredOptions = useMemo(() => {
    const optionsFiltered = searchString
      ? options?.filter((option) => option.value.includes(searchString))
      : options;
    if (removeSelectedOptions)
      return optionsFiltered?.filter(
        (option) => !values?.includes(option.value)
      );
    return optionsFiltered;
  }, [searchString, removeSelectedOptions, options]);

  const filteredOptionsProcessed = useMemo(
    () =>
      filteredOptions?.map((v) => ({
        ...v,
        isSelected: values?.includes(v.value),
      })),
    [filteredOptions, values]
  );

  const selectedOptions = useMemo(
    () => options?.filter((option) => values?.includes(option.value)),
    [options, values]
  );

  const onOptionClick = useCallback((value: string, isSelected?: boolean) => {
    if (isSelected) {
      onOptionDeselect(value);
    } else {
      onOptionSelect(value);
    }
  }, []);

  return (
    <div ref={ref} className="multi-select" style={wrapperStyles}>
      <Input
        className="multi-select-input"
        size="large"
        placeholder="Search"
        prefix={<Icon name="search" />}
        value={searchString}
        onChange={updateSearchString}
        onFocus={onFocus}
        {...props}
      />
      {showDropdown && !disabled && (
        <div className="multi-select-option-wrapper">
          {filteredOptionsProcessed?.map((v) => (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {
                onOptionClick(v.value, v?.isSelected);
              }}
              onClick={() => {
                onOptionClick(v.value, v?.isSelected);
              }}
              className={`multi-select-options ${
                v.isSelected ? "selected-option" : ""
              }`}
              key={v.value}
            >
              {v.label}
              {v.isSelected && <Icon name="check" className="icon" />}
            </div>
          ))}
        </div>
      )}
      {!!selectedOptions?.length && (
        <div className="options-selected-wrapper">
          {selectedOptions?.map((option) => (
            <SelectedOption
              key={option.value}
              value={option.value}
              label={option.label}
              onClick={onOptionDeselect}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
