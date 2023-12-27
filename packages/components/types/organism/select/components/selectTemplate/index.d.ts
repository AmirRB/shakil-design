/// <reference types="react" />
import { SelectProps } from "../../types";
interface TemplateProps<T extends Record<string, any>> extends SelectProps<T> {
  displayValue: string;
  renderOverlay: () => React.ReactNode;
}
declare const Template: <T extends Record<string, any>>({
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
  hasSearch,
  onMouseEnter,
  onMouseLeave,
  testid,
  errorMessage,
  errorMessageClassName,
  hasError,
  clearIconColor,
  isLoading,
  displayValue,
  renderOverlay,
}: TemplateProps<T>) => import("react/jsx-dev-runtime").JSX.Element;
export { Template };