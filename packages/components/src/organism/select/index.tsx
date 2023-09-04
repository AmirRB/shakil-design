import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { BaseIcon, ScrollView } from "../../atoms";
import { TextInput } from "../../molecules/textInput";
import { useOnClickOutSide } from "@shakil-design/utils";
import { Option } from "./option";
import { useStyles } from "./style";
import { Default, SelectProps, Value } from "./types";
import classnames from "classnames";
import { Clear } from "./clear";

const Select = <T extends Record<string, unknown> = Default>({
  data,
  value: propValue,
  labelExtractor = (item: T) => item.label as string,
  valueExtractor = (item: T) => item.value as Value,
  onChange,
  onClear,
  disabled,
  unit = "viewport",
  allowClear,
  AddonAfter,
  addonAfterClassName,
  addonAfterStyle,
  addonBefore,
  addonBeforeClassName,
  addonBeforeStyle,
  className,
  onBlur,
  onFocus,
  placeholder,
  style,
  wrapperClassName,
  wrapperStyle,
  popupClassName,
  popupStyles,
  multiple,
}: SelectProps<T>) => {
  const classes = useStyles();
  const [internalValue, setInternalValue] = useState<Value | Value[] | null>(
    null,
  );
  const body = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);
  const [isHoverd, setIsHovered] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles: poperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom",
      strategy: "fixed",
      modifiers: [{ name: "offset", options: { offset: [0, 2] } }],
    },
  );
  useEffect(() => {
    body.current = document.body;
  }, []);

  useEffect(() => {
    setInternalValue(null);
  }, [multiple]);

  useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  const handleOnClick = () => {
    if (disabled) return;
    setVisible((prev) => !prev);
  };

  const handleRefOfRefrenceElement = (node: HTMLDivElement) => {
    setWidth(node?.getBoundingClientRect().width);
    setReferenceElement(node);
  };
  const handleOnChange = (selectedItemValue: Value) => {
    if (multiple) {
      const alreadyExist = ((internalValue || []) as Value[]).find(
        (item) => item === selectedItemValue,
      );
      if (alreadyExist) {
        const items = ((internalValue || []) as Value[]).filter((item) => {
          return item !== selectedItemValue;
        });
        onChange?.(items);
        !propValue && setInternalValue(items);
      } else {
        onChange?.([...((internalValue || []) as Value[]), selectedItemValue]);
        !propValue &&
          setInternalValue([
            ...((internalValue || []) as Value[]),
            selectedItemValue,
          ]);
      }
      return;
    }
    !propValue && setInternalValue(selectedItemValue);
    onChange?.(selectedItemValue);
    setVisible(false);
  };

  const handleOnClear = () => {
    setInternalValue(null);
    setVisible(false);
    onClear?.();
    onChange?.(null);
  };

  useOnClickOutSide({
    element: popperElement,
    extraElement: referenceElement,
    handler() {
      setVisible(false);
    },
  });

  const onMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
  };

  let _value: Value = null;
  if (multiple) {
    _value =
      Array.isArray(internalValue) && internalValue.length
        ? `${internalValue?.length} Items Selected`
        : undefined;
  } else {
    _value = internalValue as Value;
  }

  return (
    <>
      <TextInput
        {...{
          AddonAfter,
          addonAfterClassName,
          addonAfterStyle,
          addonBefore,
          addonBeforeClassName,
          addonBeforeStyle,
          className,
          onBlur,
          onFocus,
          wrapperClassName,
          wrapperStyle,
        }}
        onClear={handleOnClear}
        ref={handleRefOfRefrenceElement}
        onClick={handleOnClick}
        value={_value}
        style={{
          ...style,
        }}
        className={classes["textInput"]}
        unit={unit}
        placeholder={placeholder}
        allowClear={allowClear}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        AddonAfter={
          <Clear
            handleOnClear={handleOnClear}
            whatVisible={
              isHoverd && _value
                ? "cross"
                : !isHoverd || !_value
                ? "arrow"
                : null
            }
            isVisible={isVisible}
          />
        }
      />

      {body.current && isVisible
        ? ReactDOM.createPortal(
            <>
              <div
                ref={setPopperElement}
                style={poperStyles.popper}
                {...attributes.popper}
              >
                <div
                  style={{ width, ...popupStyles }}
                  className={classnames(popupClassName, classes["overlay"])}
                >
                  <div className={classes["inputWrapper"]}>
                    <TextInput
                      placeholder="Search"
                      unit="pixel"
                      AddonAfter={
                        <BaseIcon
                          color={"#d1d1d1"}
                          name="Search-Box_Search-Icon"
                          unit="pixel"
                          size={{ height: 15, width: 15 }}
                        />
                      }
                    />
                  </div>
                  <ScrollView style={{ flex: 1 }}>
                    {data.map((item) => {
                      const isSelected =
                        multiple && Array.isArray(internalValue)
                          ? Boolean(
                              internalValue.find(
                                (_item) => _item === valueExtractor(item),
                              ),
                            )
                          : _value === valueExtractor(item);
                      return (
                        <Option
                          multiple={multiple}
                          isSelected={isSelected}
                          value={{
                            label: labelExtractor(item),
                            value: valueExtractor(item),
                          }}
                          onClick={handleOnChange}
                          key={valueExtractor(item)}
                        >
                          {labelExtractor(item)}
                        </Option>
                      );
                    })}
                  </ScrollView>
                </div>
              </div>
            </>,
            body.current,
          )
        : null}
    </>
  );
};

export { Select };
