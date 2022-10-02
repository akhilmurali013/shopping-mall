import React, { useCallback, useMemo, useRef, useState } from "react";

import { useClickAway } from "ahooks";
import { Input } from "antd";

import Icon from "../icon";

import "./styles.less";

const SelectedOption: React.FC<{
  value: string;
  label: string;
  onClick: (v: string) => void;
}> = ({ label, value, onClick }) => (
  <button
    type="button"
    className="selected-option-item"
    onClick={() => onClick(value)}
  >
    {label}
    <Icon name="close" />
  </button>
);

const MultiSelect: React.FC<{
  options?: { label: string; value: string }[];
  values?: string[];
  removeSelectedOptions?: boolean;
  onOptionSelect: (v: string) => void;
  onOptionDeselect: (v: string) => void;
}> = ({
  options,
  values,
  removeSelectedOptions,
  onOptionSelect,
  onOptionDeselect,
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
    <div ref={ref} className="multi-select">
      <Input
        className="multi-select-input"
        size="large"
        placeholder="Search"
        prefix={<Icon name="search" />}
        value={searchString}
        onChange={updateSearchString}
        onFocus={onFocus}
      />
      {showDropdown && (
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
      <div className="options-selected-wrapper">
        {selectedOptions?.map((option) => (
          <SelectedOption
            key={option.value}
            value={option.value}
            label={option.label}
            onClick={onOptionDeselect}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
