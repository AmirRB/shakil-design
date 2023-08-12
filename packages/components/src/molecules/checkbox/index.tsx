import React from "react";
import { Text } from "../../atoms/text";
import { Indeterminate } from "./customRectangle/indeterminate";
import { CustomRectangle } from "./customRectangle/inex";
import { useStyles } from "./style";
import { pxToVhString } from "@shakil-design/utils";
import { Unit } from "../../../types";

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  indeterminate?: boolean;
  mode?: "dark" | "light";
  unit?: Unit;
}

const CheckBox = ({
  checked,
  value,
  onChange,
  children,
  name,
  indeterminate,
  mode = "dark",
  unit = "pixel",
  ...rest
}: CheckBoxProps) => {
  const classes = useStyles();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <label style={{ display: "inline-flex" }}>
      <div
        className={classes["checkBoxWrapper"]}
        style={{
          ...(typeof children !== "undefined" && { marginInlineEnd: 4 }),
        }}
      >
        {indeterminate ? (
          <Indeterminate unit={unit} />
        ) : (
          <CustomRectangle checked={checked} mode={mode} unit={unit} />
        )}

        <input
          className={classes["hiddenInput"]}
          type={"checkbox"}
          value={value}
          name={name}
          checked={checked}
          onChange={onChangeHandler}
          {...rest}
        />
      </div>

      {typeof children === "string" ? (
        <Text size={unit === "viewPort" ? pxToVhString(16) : 16}>
          {children}
        </Text>
      ) : (
        children
      )}
    </label>
  );
};

export { CheckBox };
