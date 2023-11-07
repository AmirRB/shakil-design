import classNames from "classnames";
import * as React from "react";
import { composeRef } from "reactjs-view-core";
import { useStyles } from "./style";
import TextInputState from "./TextInputState";
import { TextInputProps } from "./types";
import { useFonts } from "../../atoms/text/style";
import { pxToVh, pxToVhString } from "@shakil-design/utils";
import { BaseIcon } from "../../atoms";
import { useState } from "react";

/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */
const isSelectionStale = (
  node: { selectionEnd: any; selectionStart: any },
  selection: { start: any; end?: any },
) => {
  const { selectionEnd, selectionStart } = node;
  const { start, end } = selection;
  return start !== selectionStart || end !== selectionEnd;
};

/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */
const setSelection = (node: any, selection: { start: any; end?: any }) => {
  if (isSelectionStale(node, selection)) {
    const { start, end } = selection;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {}
  }
};

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent: any) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}

type TextInputSupportedProps =
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  | React.InputHTMLAttributes<HTMLInputElement>;

type SupportedProps = Omit<TextInputSupportedProps, "value"> & {
  value?: string | number | null;
};

const TextInput = React.forwardRef<HTMLElement, TextInputProps>(
  (
    {
      autoCapitalize = "sentences",
      autoComplete,
      autoCompleteType,
      autoCorrect = true,
      blurOnSubmit,
      clearTextOnFocus,
      editable = true,
      keyboardType = "default",
      multiline = false,
      numberOfLines = 1,
      onBlur,
      onChange,
      onChangeText,
      onContentSizeChange,
      onFocus,
      onKeyPress,
      onSelectionChange,
      onSubmitEditing,
      returnKeyType,
      secureTextEntry = false,
      selection,
      selectTextOnFocus,
      spellCheck,
      className,
      testID,
      disabled,
      theme,
      unit = "viewport",
      AddonAfter,
      addonBefore,
      addonAfterClassName,
      addonBeforeClassName,
      addonAfterStyle,
      addonBeforeStyle,
      value,
      onClear,
      wrapperStyle,
      allowClear,
      wrapperClassName,
      ...rest
    },
    forwardedRef,
  ) => {
    const classes = useStyles();
    const [isHover, setIsHover] = useState<boolean>(false);
    let type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    let inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"];

    switch (keyboardType) {
      case "email-address":
        type = "email";
        break;
      case "number-pad":
      case "numeric":
        inputMode = "numeric";
        type = "number";
        break;
      case "decimal-pad":
        inputMode = "decimal";
        break;
      case "phone-pad":
        type = "tel";
        break;
      case "search":
      case "web-search":
        type = "search";
        break;
      case "url":
        type = "url";
        break;
      default:
        type = "text";
    }

    if (secureTextEntry) {
      type = "password";
    }

    const dimensions = React.useRef({ height: 0, width: 0 });
    const hostRef = React.useRef(null);

    const handleContentSizeChange = React.useCallback(
      (hostNode: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
        if (multiline && onContentSizeChange && hostNode != null) {
          const newHeight = hostNode.scrollHeight;
          const newWidth = hostNode.scrollWidth;
          if (
            newHeight !== dimensions.current.height ||
            newWidth !== dimensions.current.width
          ) {
            dimensions.current.height = newHeight;
            dimensions.current.width = newWidth;
            onContentSizeChange({
              nativeEvent: {
                contentSize: {
                  height: dimensions.current.height,
                  width: dimensions.current.width,
                },
              },
            });
          }
        }
      },
      [multiline, onContentSizeChange],
    );

    const imperativeRef = React.useMemo(
      () => (hostNode: any) => {
        // TextInput needs to add more methods to the hostNode in addition to those
        // added by `usePlatformMethods`. This is temporarily until an API like
        // `TextInput.clear(hostRef)` is added to React Native.
        if (hostNode != null) {
          hostNode.clear = function () {
            if (hostNode != null) {
              hostNode.value = "";
            }
          };
          hostNode.isFocused = function () {
            return (
              hostNode != null &&
              TextInputState.currentlyFocusedField() === hostNode
            );
          };
          handleContentSizeChange(hostNode);
        }
      },
      [handleContentSizeChange],
    );

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      TextInputState._currentlyFocusedNode = null;
      if (onBlur) {
        //@ts-ignore
        e.nativeEvent.text = e.target.value;
        onBlur(e);
      }
    }

    function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      const hostNode = e.target;
      const text = hostNode.value;
      //@ts-ignore
      e.nativeEvent.text = text;
      handleContentSizeChange(hostNode);
      if (onChange) {
        onChange(e);
      }
      if (onChangeText) {
        onChangeText(text);
      }
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      const hostNode = e.target;
      if (onFocus) {
        //@ts-ignore
        e.nativeEvent.text = hostNode.value;
        onFocus(e);
      }
      if (hostNode != null) {
        TextInputState._currentlyFocusedNode = hostNode;
        if (clearTextOnFocus) {
          hostNode.value = "";
        }
        if (selectTextOnFocus) {
          // Safari requires selection to occur in a setTimeout
          setTimeout(() => {
            hostNode.select();
          }, 0);
        }
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const hostNode = e.target;
      // Prevent key events bubbling (see #612)
      e.stopPropagation();

      const isBlurOnSubmitDefault = !multiline;
      const shouldBlurOnSubmit =
        blurOnSubmit == null ? isBlurOnSubmitDefault : blurOnSubmit;

      const nativeEvent = e.nativeEvent;
      const isComposing = isEventComposing(nativeEvent);

      if (onKeyPress) {
        onKeyPress(e);
      }

      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        // Do not call submit if composition is occuring.
        !isComposing &&
        !e.isDefaultPrevented()
      ) {
        if ((blurOnSubmit || !multiline) && onSubmitEditing) {
          // prevent "Enter" from inserting a newline or submitting a form
          e.preventDefault();
          //@ts-ignore
          nativeEvent.text = e.target.value;
          onSubmitEditing(e);
        }
        if (shouldBlurOnSubmit && hostNode != null) {
          //@ts-ignore
          hostNode.blur();
        }
      }
    }

    const handleSelectionChange = (
      e: React.SyntheticEvent<HTMLInputElement, Event>,
    ) => {
      if (onSelectionChange) {
        try {
          const _e = e as Omit<
            React.SyntheticEvent<HTMLInputElement, Event>,
            "nativeEvent" | "target"
          > & {
            nativeEvent: Event & {
              selection: { start: number; end: number };
              text: string;
            };
            target: EventTarget & {
              selectionStart: number;
              selectionEnd: number;
              value: string;
            };
          };
          const node = _e.target as EventTarget & {
            selectionStart: number;
            selectionEnd: number;
            value: string;
          };

          const { selectionStart, selectionEnd } = node;

          const nativeEvent = _e.nativeEvent as Event & {
            selection: { start: number; end: number };
            text: string;
          };

          nativeEvent.selection = {
            start: selectionStart,
            end: selectionEnd,
          };

          nativeEvent.text = node.value;
          onSelectionChange(_e);
        } catch (_e) {}
      }
    };

    const onMouseEnter = () => {
      setIsHover(true);
    };
    const onMouseLeave = () => {
      setIsHover(false);
    };

    React.useEffect(() => {
      const node = hostRef.current;
      if (node && selection) {
        setSelection(node, selection);
      }
      if (document.activeElement === node) {
        TextInputState._currentlyFocusedNode = node;
      }
    }, [hostRef, selection]);

    const supportedProps: SupportedProps = rest;

    supportedProps.value;

    supportedProps.autoCapitalize = autoCapitalize;
    supportedProps.autoComplete = autoComplete || autoCompleteType || "on";
    supportedProps.autoCorrect = autoCorrect ? "on" : "off";

    (supportedProps as any).enterKeyHint = returnKeyType;
    supportedProps.onBlur = handleBlur;
    supportedProps.onChange = handleChange;
    supportedProps.onFocus = handleFocus;
    supportedProps.onKeyDown = handleKeyDown;
    supportedProps.onSelect = handleSelectionChange;
    supportedProps.readOnly = !editable;
    // @ts-ignore
    supportedProps.rows = multiline ? numberOfLines : undefined;
    supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
    // supportedProps.style = style;
    (supportedProps as React.InputHTMLAttributes<HTMLInputElement>).type = (
      multiline ? undefined : type
    ) as string;
    supportedProps.inputMode = inputMode;

    const setRef = composeRef(hostRef, imperativeRef, forwardedRef);

    const themes = useFonts();
    const _height = unit === "viewport" ? pxToVhString(32) : 32;
    const _borderRadius = unit === "viewport" ? pxToVhString(7) : 7;
    const _paddingBlock = unit === "viewport" ? pxToVhString(8) : 8;
    const _paddingInline = unit === "viewport" ? pxToVhString(10) : 10;
    const _fontSize = unit === "viewport" ? pxToVhString(14) : 14;
    const _clearIconSize = unit === "viewport" ? pxToVh(12) : 12;
    const _value = value === null || value === undefined ? "" : value;
    const _clearIcon =
      typeof allowClear === "object"
        ? allowClear
        : typeof allowClear === "boolean" && (
            <BaseIcon
              onClick={onClear}
              wrapperStyle={{
                cursor: "pointer",
                visibility: isHover && _value ? "visible" : "hidden",
              }}
              name="Every-Boxes-_-Cross-Icon"
              unit={unit}
              size={{ height: _clearIconSize, width: _clearIconSize }}
            />
          );

    const addOnAfterIcon =
      isHover && _value && allowClear
        ? _clearIcon
        : AddonAfter
        ? AddonAfter
        : null;

    return multiline ? (
      <textarea
        ref={setRef}
        {...(supportedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={classNames(
          classes["inputWrapper"],
          wrapperClassName && wrapperClassName,
        )}
        style={wrapperStyle}
      >
        <input
          {...(supportedProps as React.InputHTMLAttributes<HTMLInputElement>)}
          value={_value}
          className={classNames(
            classes["textInput"],
            disabled && classes.disabled,
            themes[theme || "Regular"],
            className,
          )}
          ref={setRef}
          type={rest.type}
          disabled={disabled}
          style={{
            height: _height,
            borderRadius: _borderRadius,
            paddingInline: _paddingInline,
            paddingBlock: _paddingBlock,
            fontSize: _fontSize,
            ...supportedProps.style,
          }}
        />
        {addonBefore ? (
          <div
            className={classNames(
              classes["addonBefore"],
              addonBeforeClassName && addonBeforeClassName,
            )}
            style={addonBeforeStyle}
          >
            {addonBefore}
          </div>
        ) : null}

        {addOnAfterIcon ? (
          <div
            className={classNames(
              classes["addonAfter"],
              addonAfterClassName && addonAfterClassName,
            )}
          >
            {addOnAfterIcon}
          </div>
        ) : null}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export type { TextInputProps };
export { TextInput };
