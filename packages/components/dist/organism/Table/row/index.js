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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "D:/project/shakil-design-release/packages/components/src/organism/Table/row/index.tsx";
var react_1 = require("react");
var style_1 = require("./style");
var Row = function (_a) {
    var isChecked = _a.isChecked, isOnCheckedRowsAvailable = _a.isOnCheckedRowsAvailable, isSelected = _a.isSelected, rowKey = _a.rowKey, rowIndex = _a.rowIndex, rowData = _a.rowData, rest = __rest(_a, ["isChecked", "isOnCheckedRowsAvailable", "isSelected", "rowKey", "rowIndex", "rowData"]);
    var _b = (0, react_1.useState)(false), isHoverd = _b[0], setIsHovered = _b[1];
    var classes = (0, style_1.useStyles)({
        isChecked: isChecked,
        isHoverd: isHoverd,
        isOnCheckedRowsAvailable: isOnCheckedRowsAvailable,
        isSelected: isSelected,
    });
    return ((0, jsx_dev_runtime_1.jsxDEV)("tr", __assign({}, rest, { "data-testid": rowKey ? "row-".concat(String(rowData[rowKey])) : rowIndex, onMouseEnter: function () {
            setIsHovered(true);
        }, onMouseLeave: function () {
            setIsHovered(false);
        }, className: classes["row"] }), void 0, false, { fileName: _jsxFileName, lineNumber: 33, columnNumber: 11 }, _this));
};
exports.Row = Row;
//# sourceMappingURL=index.js.map