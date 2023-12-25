import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { BaseIcon } from "../../atoms";
import { TextInput } from "../../molecules/textInput";
import { useOnClickOutSide } from "@shakil-design/utils";
import { useStyles } from "./style";
import { Default, InternalValue, SelectProps, Value } from "./types";
import classnames from "classnames";
import { FleshIcon } from "./components/fleshIcon";
import { MultiSelectList } from "./components/list/multiSelect";
import { SingleSelectList } from "./components/list/singleSelect";
import classNames from "classnames";

const Select = <T extends Record<string, unknown> = Default>({
  data,
  value: propValue,
  labelExtractor = (item: T) => item.label as string,
  valueExtractor = (item: T) => item.value as Value,
  onChange,
  onClear,
  disabled,
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
  onSearch,
  hasSearch = true,
  onMouseEnter,
  onMouseLeave,
  testid,
  errorMessage,
  errorMessageClassName,
  hasError,
  clearIconColor,
  isLoading,
}: SelectProps<T>) => {
  const classes = useStyles();
  const [internalValue, setInternalValue] = useState<InternalValue>(null);
  const body = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
    if (disabled || isLoading) return;
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

  let displayValue: string = "";
  if (multiple) {
    displayValue =
      Array.isArray(internalValue) && internalValue.length
        ? `${internalValue?.length} Items Selected`
        : "";
  } else {
    const value = data.find((item) => valueExtractor(item) === internalValue);
    displayValue = value ? labelExtractor(value) : "";
  }

  return (
    <>
      <div ref={handleRefOfRefrenceElement}>
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
            onMouseEnter,
            onMouseLeave,
            errorMessage,
            errorMessageClassName,
            hasError,
            testID: testid?.input,
            clearIconColor,
            isLoading,
          }}
          onClear={handleOnClear}
          onClick={handleOnClick}
          value={displayValue}
          style={{
            ...style,
          }}
          className={classNames(
            classes["text-input"],
            isLoading && `${classes["text-input"]}--loading`,
          )}
          placeholder={placeholder}
          allowClear={allowClear}
          AddonAfter={<FleshIcon isVisible={isVisible} />}
        />
      </div>

      {body.current && isVisible
        ? ReactDOM.createPortal(
            <>
              <div
                ref={setPopperElement}
                style={poperStyles.popper}
                {...attributes.popper}
              >
                <div
                  data-testid={testid?.overlay}
                  style={{ width, ...popupStyles }}
                  className={classnames(popupClassName, classes["overlay"])}
                >
                  {hasSearch ? (
                    <div className={classes["inputWrapper"]}>
                      <TextInput
                        value={searchValue}
                        placeholder="Search"
                        AddonAfter={
                          <BaseIcon
                            color={"#d1d1d1"}
                            name="Search-Box_Search-Icon"
                            size={{ height: 15, width: 15 }}
                          />
                        }
                        onChangeText={(value) => {
                          onSearch?.(value);
                          setSearchValue(value);
                        }}
                      />
                    </div>
                  ) : null}

                  {multiple ? (
                    <MultiSelectList
                      data={data}
                      labelExtractor={labelExtractor}
                      valueExtractor={valueExtractor}
                      internalValue={internalValue}
                      onClick={handleOnChange}
                    />
                  ) : (
                    <SingleSelectList
                      data={data}
                      labelExtractor={labelExtractor}
                      valueExtractor={valueExtractor}
                      internalValue={internalValue}
                      onClick={handleOnChange}
                    />
                  )}
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
