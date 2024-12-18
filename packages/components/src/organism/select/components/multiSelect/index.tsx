import { SelectProps } from "../../types";
import { MultiSelectList } from "../list/multiSelectList";
import { Template } from "../selectTemplate";
import { isNullish } from "@shakil-design/utils/src";

export interface MultiSelectProps<T extends Record<string, any>>
  extends Omit<SelectProps<T>, "data"> {
  value?: T[keyof T][];
  onChange?: (item: T[keyof T][]) => void;
  mode: "multi";
  data: T[];
}

export type InternalValue<T> = T[];

const MultiSelect = <T extends Record<string, any>>({
  onChange,
  value,
  data,
  valueExtractor = (item) => item.value,
  labelExtractor = (item) => item.label,
  onClear,
  ...props
}: MultiSelectProps<T>) => {
  const handleOnChange = (selectedItemValue: T[keyof T]) => {
    const alreadyExist = value?.find((item) => item === selectedItemValue);
    if (!isNullish(alreadyExist)) {
      const items = (value || []).filter((item) => {
        return item !== selectedItemValue;
      });
      onChange?.(items);
    } else {
      onChange?.([...(value || []), selectedItemValue]);
    }
  };

  const displayValue = (value || []).length
    ? `${value?.length} Items Selected`
    : "";

  return (
    <Template
      {...props}
      onClear={onClear}
      displayValue={displayValue}
      data={data}
      labelExtractor={labelExtractor}
      renderOverlay={({ filteredData }) => {
        return (
          <MultiSelectList
            labelExtractor={labelExtractor}
            valueExtractor={valueExtractor}
            value={value || []}
            onClick={handleOnChange}
            rawData={data}
            filteredData={filteredData}
          />
        );
      }}
    />
  );
};

export { MultiSelect };
