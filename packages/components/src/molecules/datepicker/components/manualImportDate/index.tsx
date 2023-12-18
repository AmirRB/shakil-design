import { TextInput } from "../../..";
import { BaseIcon, Text } from "../../../../atoms";
import { Button } from "../../..";
import { checkIsDateValid } from "../../utils/checkDateIsValid";
import { useStyles } from "./style";
import classNames from "classnames";
import { ManualImportDateContext } from "./context";
import { useContext } from "react";
import { DatePickerContext } from "../../context";
import moment from "moment-jalaali";

interface ManualImportDateProps {
  onConfirmDate: () => void;
  isConfirmed: boolean;
}

const ManualImportDate = ({
  onConfirmDate,
  isConfirmed,
}: ManualImportDateProps) => {
  const { getValues, handleSubmit, setError } =
    ManualImportDateContext.useFormContext();
  const { errors } = ManualImportDateContext.useFormState();

  const {
    selectedDate,
    onShrinkMatrix,
    onSetCurrentDate,
    handleSetSelectedDateFromInputs,
    formats: { FULL_DATE_FORMAT },
    onOkDate,
  } = useContext(DatePickerContext);

  const onConfirm = () => {
    const { year, month, day, hour, minute } = getValues();
    const date = year && day && month ? `${year}/${month}/${day}` : undefined;
    const isDateValid = date && checkIsDateValid(date);
    if (isDateValid) {
      onConfirmDate();
      const date =
        year && day && month
          ? moment(
              `${year}/${month}/${day} ${hour}:${minute}`,
              FULL_DATE_FORMAT,
            )
          : null;
      date && onSetCurrentDate(date);
      date && handleSetSelectedDateFromInputs(date);
      onOkDate?.(date);
      onShrinkMatrix();
    } else {
      setError("day", { message: "invalid" });
      setError("month", { message: "invalid" });
      setError("year", { message: "invalid" });
    }
  };
  const classes = useStyles();

  return (
    <div style={{ position: "relative" }}>
      <div className={classes["wrapper"]}>
        <Text className={classes["title"]} color={"#ABABAB"}>
          Date
        </Text>
        <div style={{ display: "flex" }}>
          <div className={classes["input"]}>
            <ManualImportDateContext.Controller
              rules={{ required: true }}
              name="year"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    placeholder="Year"
                    disabled={isConfirmed}
                    hasError={Boolean(errors.year)}
                    value={value}
                    style={{ textAlign: "center" }}
                    onChangeText={(value) => {
                      if (value.length === 5) return;
                      onChange(value);
                    }}
                  />
                );
              }}
            />
          </div>
          <div className={classNames(classes["minute"], classes["input"])}>
            <ManualImportDateContext.Controller
              rules={{ required: true, min: 1, max: 12 }}
              name="month"
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    placeholder="Month"
                    disabled={isConfirmed}
                    hasError={Boolean(errors.month)}
                    value={value}
                    onChangeText={(value) => {
                      if (value.length === 3) return;
                      onChange(value);
                    }}
                    style={{ textAlign: "center" }}
                  />
                );
              }}
            />
          </div>
          <div className={classes["input"]}>
            <ManualImportDateContext.Controller
              rules={{ required: true, min: 1, max: 31 }}
              name="day"
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    placeholder="Day"
                    disabled={isConfirmed}
                    hasError={Boolean(errors.day)}
                    value={value}
                    onChangeText={(value) => {
                      if (value.length === 3) return;
                      onChange(value);
                    }}
                    style={{ textAlign: "center" }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes["wrapper"]}>
        <Text className={classes["title"]} color={"#ABABAB"}>
          Time
        </Text>
        <div style={{ display: "flex" }}>
          <div className={classes["input"]}>
            <ManualImportDateContext.Controller
              rules={{
                min: 0,
                max: 23,
              }}
              name="hour"
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    placeholder="Hour"
                    disabled={isConfirmed}
                    hasError={Boolean(errors.hour)}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    style={{ textAlign: "center" }}
                  />
                );
              }}
            />
          </div>
          <div className={classNames(classes["input"], classes["minute"])}>
            <ManualImportDateContext.Controller
              name="minute"
              rules={{
                min: 0,
                max: 59,
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    placeholder="Min"
                    disabled={isConfirmed}
                    hasError={Boolean(errors.minute)}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    style={{ textAlign: "center" }}
                  />
                );
              }}
            />
          </div>
          <Button
            className={classes["input"]}
            size="small"
            onClick={handleSubmit(onConfirm)}
          >
            {isConfirmed && selectedDate ? (
              <BaseIcon
                name="Create-Project_Checked-Icon"
                size={{ width: 13, height: 9 }}
              />
            ) : (
              "ok"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ManualImportDate };
