"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualImportDate = void 0;
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "D:/project/shakil-design-release/packages/components/src/molecules/datepicker/components/manualImportDate/index.tsx";
var __1 = require("../../..");
var atoms_1 = require("../../../../atoms");
var __2 = require("../../..");
var checkDateIsValid_1 = require("../../utils/checkDateIsValid");
var style_1 = require("./style");
var classnames_1 = __importDefault(require("classnames"));
var context_1 = require("./context");
var react_1 = require("react");
var context_2 = require("../../context");
var moment_jalaali_1 = __importDefault(require("moment-jalaali"));
var ManualImportDate = function (_a) {
    var onConfirmDate = _a.onConfirmDate, isConfirmed = _a.isConfirmed;
    var _b = context_1.ManualImportDateContext.useFormContext(), getValues = _b.getValues, handleSubmit = _b.handleSubmit, setError = _b.setError;
    var errors = context_1.ManualImportDateContext.useFormState().errors;
    var _c = (0, react_1.useContext)(context_2.DatePickerContext), selectedDate = _c.selectedDate, onShrinkMatrix = _c.onShrinkMatrix, onSetCurrentDate = _c.onSetCurrentDate, handleSetSelectedDateFromInputs = _c.handleSetSelectedDateFromInputs, FULL_DATE_FORMAT = _c.formats.FULL_DATE_FORMAT, onOkDate = _c.onOkDate;
    var onConfirm = function () {
        var _a = getValues(), year = _a.year, month = _a.month, day = _a.day, hour = _a.hour, minute = _a.minute;
        var date = year && day && month ? "".concat(year, "/").concat(month, "/").concat(day) : undefined;
        var isDateValid = date && (0, checkDateIsValid_1.checkIsDateValid)(date);
        if (isDateValid) {
            onConfirmDate();
            var date_1 = year && day && month
                ? (0, moment_jalaali_1.default)("".concat(year, "/").concat(month, "/").concat(day, " ").concat(hour, ":").concat(minute), FULL_DATE_FORMAT)
                : null;
            date_1 && onSetCurrentDate(date_1);
            date_1 && handleSetSelectedDateFromInputs(date_1);
            onOkDate === null || onOkDate === void 0 ? void 0 : onOkDate(date_1);
            onShrinkMatrix();
        }
        else {
            setError("day", { message: "invalid" });
            setError("month", { message: "invalid" });
            setError("year", { message: "invalid" });
        }
    };
    var classes = (0, style_1.useStyles)();
    return ((0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ style: { position: "relative" } }, { children: [(0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: classes["wrapper"] }, { children: [(0, jsx_dev_runtime_1.jsxDEV)(atoms_1.Text, __assign({ className: classes["title"], color: "#ABABAB" }, { children: "Date" }), void 0, false, { fileName: _jsxFileName, lineNumber: 62, columnNumber: 9 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ style: { display: "flex" } }, { children: [(0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: classes["input"] }, { children: (0, jsx_dev_runtime_1.jsxDEV)(context_1.ManualImportDateContext.Controller, { rules: { required: true }, name: "year", render: function (_a) {
                                        var _b = _a.field, value = _b.value, onChange = _b.onChange;
                                        return ((0, jsx_dev_runtime_1.jsxDEV)(__1.TextInput, { placeholder: "Year", disabled: isConfirmed, hasError: Boolean(errors.year), value: value, style: { textAlign: "center" }, onChangeText: function (value) {
                                                if (value.length === 5)
                                                    return;
                                                onChange(value);
                                            } }, void 0, false, { fileName: _jsxFileName, lineNumber: 71, columnNumber: 25 }, _this));
                                    } }, void 0, false, { fileName: _jsxFileName, lineNumber: 67, columnNumber: 13 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 66, columnNumber: 11 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: (0, classnames_1.default)(classes["minute"], classes["input"]) }, { children: (0, jsx_dev_runtime_1.jsxDEV)(context_1.ManualImportDateContext.Controller, { rules: { required: true, min: 1, max: 12 }, name: "month", render: function (_a) {
                                        var _b = _a.field, onChange = _b.onChange, value = _b.value;
                                        return ((0, jsx_dev_runtime_1.jsxDEV)(__1.TextInput, { placeholder: "Month", disabled: isConfirmed, hasError: Boolean(errors.month), value: value, onChangeText: function (value) {
                                                if (value.length === 3)
                                                    return;
                                                onChange(value);
                                            }, style: { textAlign: "center" } }, void 0, false, { fileName: _jsxFileName, lineNumber: 92, columnNumber: 25 }, _this));
                                    } }, void 0, false, { fileName: _jsxFileName, lineNumber: 88, columnNumber: 13 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 87, columnNumber: 11 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: classes["input"] }, { children: (0, jsx_dev_runtime_1.jsxDEV)(context_1.ManualImportDateContext.Controller, { rules: { required: true, min: 1, max: 31 }, name: "day", render: function (_a) {
                                        var _b = _a.field, onChange = _b.onChange, value = _b.value;
                                        return ((0, jsx_dev_runtime_1.jsxDEV)(__1.TextInput, { placeholder: "Day", disabled: isConfirmed, hasError: Boolean(errors.day), value: value, onChangeText: function (value) {
                                                if (value.length === 3)
                                                    return;
                                                onChange(value);
                                            }, style: { textAlign: "center" } }, void 0, false, { fileName: _jsxFileName, lineNumber: 113, columnNumber: 25 }, _this));
                                    } }, void 0, false, { fileName: _jsxFileName, lineNumber: 109, columnNumber: 13 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 108, columnNumber: 11 }, _this)] }), void 0, true, { fileName: _jsxFileName, lineNumber: 65, columnNumber: 9 }, _this)] }), void 0, true, { fileName: _jsxFileName, lineNumber: 61, columnNumber: 7 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: classes["wrapper"] }, { children: [(0, jsx_dev_runtime_1.jsxDEV)(atoms_1.Text, __assign({ className: classes["title"], color: "#ABABAB" }, { children: "Time" }), void 0, false, { fileName: _jsxFileName, lineNumber: 132, columnNumber: 9 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ style: { display: "flex" } }, { children: [(0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: classes["input"] }, { children: (0, jsx_dev_runtime_1.jsxDEV)(context_1.ManualImportDateContext.Controller, { rules: {
                                        min: 0,
                                        max: 23,
                                    }, name: "hour", render: function (_a) {
                                        var _b = _a.field, onChange = _b.onChange, value = _b.value;
                                        return ((0, jsx_dev_runtime_1.jsxDEV)(__1.TextInput, { placeholder: "Hour", disabled: isConfirmed, hasError: Boolean(errors.hour), onChangeText: function (value) {
                                                onChange(value);
                                            }, value: value, style: { textAlign: "center" } }, void 0, false, { fileName: _jsxFileName, lineNumber: 144, columnNumber: 25 }, _this));
                                    } }, void 0, false, { fileName: _jsxFileName, lineNumber: 137, columnNumber: 13 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 136, columnNumber: 11 }, _this), (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({ className: (0, classnames_1.default)(classes["input"], classes["minute"]) }, { children: (0, jsx_dev_runtime_1.jsxDEV)(context_1.ManualImportDateContext.Controller, { name: "minute", rules: {
                                        min: 0,
                                        max: 59,
                                    }, render: function (_a) {
                                        var _b = _a.field, onChange = _b.onChange, value = _b.value;
                                        return ((0, jsx_dev_runtime_1.jsxDEV)(__1.TextInput, { placeholder: "Min", disabled: isConfirmed, hasError: Boolean(errors.minute), onChangeText: function (value) {
                                                onChange(value);
                                            }, value: value, style: { textAlign: "center" } }, void 0, false, { fileName: _jsxFileName, lineNumber: 167, columnNumber: 25 }, _this));
                                    } }, void 0, false, { fileName: _jsxFileName, lineNumber: 160, columnNumber: 13 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 159, columnNumber: 11 }, _this), (0, jsx_dev_runtime_1.jsxDEV)(__2.Button, __assign({ className: classes["input"], size: "small", onClick: handleSubmit(onConfirm) }, { children: isConfirmed && selectedDate ? ((0, jsx_dev_runtime_1.jsxDEV)(atoms_1.BaseIcon, { name: "Create-Project_Checked-Icon", size: { width: 13, height: 9 } }, void 0, false, { fileName: _jsxFileName, lineNumber: 187, columnNumber: 45 }, _this)) : ("ok") }), void 0, false, { fileName: _jsxFileName, lineNumber: 182, columnNumber: 11 }, _this)] }), void 0, true, { fileName: _jsxFileName, lineNumber: 135, columnNumber: 9 }, _this)] }), void 0, true, { fileName: _jsxFileName, lineNumber: 131, columnNumber: 7 }, _this)] }), void 0, true, { fileName: _jsxFileName, lineNumber: 59, columnNumber: 11 }, _this));
};
exports.ManualImportDate = ManualImportDate;
//# sourceMappingURL=index.js.map