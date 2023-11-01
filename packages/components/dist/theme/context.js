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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _this = this;
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
var _jsxFileName = "D:/project/shakil-design-release/packages/components/src/theme/context.tsx";
import React from "react";
import { JssProvider, createTheming } from "react-jss";
export var Colors = {
    primary: "#374775",
    checkbox: {
        borderSelected: "#374775",
        squareSelected: "#58cc87",
        unselectedBorder: "#8e8e8e",
        unselectedSquare: "#e9e9e9",
        deactive: "#b4b4b4",
    },
    radio: {
        enableInnerCircleSelected: "#58cc87",
        enableInnerCircleUnselected: "#E9E9E9",
        enableStroke: "#374775",
        disableInnerCircleSelected: "#b4b4b4",
        disableInnerCricleUnselected: "#e9e9e9",
        disableStroke: "#8e8e8e",
    },
    textInput: {
        fieldColor: "#ebedf2",
    },
    button: {
        main: "#324775",
        danger: "#c65161",
        success: "#58cc87",
    },
    tab: {
        selectedTab: "#FFFFFF",
        textColor: "#6C7797",
        unSelectedTab: "#E3E6F1",
    },
    fileInput: "red",
    table: {
        header: "#374775",
        divider: "#c2c9db",
        filterIcon: "#48e580",
        filtersTab: "#6c7797",
        rowHover: "#ebedf2",
        selectedRow: "#e3f6eb",
        selectedRowBookmark: "#58cc87",
        sortArrow: "#48e580",
    },
    select: {
        hover: "#ebedf2",
        backgroundColor: "#ebedf2",
        selected: "#959db8",
        clearIcon: "#575757",
        fleshIcon: "#575757",
    },
    disableField: "#eeeeee",
    disableText: "#d1d1d1",
    tree: {
        dotLine: "#6c7797",
        activeItem: "#374775",
    },
    collapse: {
        panel: "red",
        openPanel: "blue",
        closePanel: "purple",
    },
    switch: {
        checked: "#58cc87",
        unchecked: "#ff8946",
    },
    noContent: "red",
};
var ThemeContext = React.createContext(Colors);
// Creating a namespaced theming object.
var theming = createTheming(ThemeContext);
var ThemeProvider = theming.ThemeProvider, rest = __rest(theming, ["ThemeProvider"]);
var ShakilDesignThemeProvider = function (_a) {
    var children = _a.children, colors = _a.colors;
    return (_jsxDEV(JssProvider, __assign({ generateId: function (rule, sheet) { var _a; return "shakil-".concat((_a = sheet === null || sheet === void 0 ? void 0 : sheet.options) === null || _a === void 0 ? void 0 : _a.classNamePrefix).concat(rule.key); } }, { children: _jsxDEV(ThemeProvider, __assign({ theme: colors }, { children: _jsxDEV("div", __assign({ style: { width: "100%", height: "100%" } }, { children: children }), void 0, false, { fileName: _jsxFileName, lineNumber: 154, columnNumber: 9 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 153, columnNumber: 7 }, _this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 147, columnNumber: 11 }, _this));
};
export { ShakilDesignThemeProvider, rest, ThemeProvider, theming };
//# sourceMappingURL=context.js.map