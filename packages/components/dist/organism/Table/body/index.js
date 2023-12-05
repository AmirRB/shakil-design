"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBody = void 0;
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName =
  "D:/project/shakil-design-release/packages/components/src/organism/Table/body/index.tsx";
var style_1 = require("./style");
var utils_1 = require("@shakil-design/utils");
var rowContainer_1 = require("../rowContainer");
var context_1 = require("../../../theme/context");
var react_1 = require("react");
var context_2 = require("../context");
var TableBody = function (_a) {
  var virtualRows = _a.virtualRows,
    noContent = _a.noContent,
    searchIconWidth = _a.searchIconWidth,
    dataList = _a.dataList,
    coloums = _a.coloums,
    rowKey = _a.rowKey,
    data = _a.data,
    checkedRows = _a.checkedRows,
    colWidth = _a.colWidth,
    paddingBottom = _a.paddingBottom,
    paddingTop = _a.paddingTop;
  var classes = (0, style_1.useStyles)();
  var unit = (0, react_1.useContext)(context_1.UnitContext).unit;
  var _b = (0, context_2.useMyTableContext)(),
    testid = _b.testid,
    virtualizer = _b.virtualizer;
  return (0, jsx_dev_runtime_1.jsxDEV)(
    jsx_dev_runtime_1.Fragment,
    {
      children:
        virtualRows.length > 0
          ? (0, jsx_dev_runtime_1.jsxDEV)(
              "div",
              __assign(
                {
                  style: {
                    height: "".concat(
                      virtualizer === null || virtualizer === void 0
                        ? void 0
                        : virtualizer.getTotalSize(),
                      "px",
                    ),
                  },
                },
                {
                  children: (0, jsx_dev_runtime_1.jsxDEV)(
                    "table",
                    __assign(
                      { className: classes["table"], role: "table" },
                      {
                        children: [
                          (0, jsx_dev_runtime_1.jsxDEV)(
                            "colgroup",
                            {
                              children: [
                                (0, jsx_dev_runtime_1.jsxDEV)(
                                  "col",
                                  { style: { width: searchIconWidth } },
                                  void 0,
                                  false,
                                  {
                                    fileName: _jsxFileName,
                                    lineNumber: 46,
                                    columnNumber: 15,
                                  },
                                  _this,
                                ),
                                coloums.map(function (_a) {
                                  var width = _a.width,
                                    dataIndex = _a.dataIndex;
                                  var _width =
                                    unit === "viewport" && width
                                      ? (0, utils_1.pxToVwString)(width)
                                      : width;
                                  return (0,
                                  jsx_dev_runtime_1.jsxDEV)("col", { style: { width: _width ? _width : colWidth } }, dataIndex, false, { fileName: _jsxFileName, lineNumber: 50, columnNumber: 25 }, _this);
                                }),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 45,
                              columnNumber: 13,
                            },
                            _this,
                          ),
                          (0, jsx_dev_runtime_1.jsxDEV)(
                            "tbody",
                            __assign(
                              {
                                "data-testid":
                                  testid === null || testid === void 0
                                    ? void 0
                                    : testid.body,
                              },
                              {
                                children: [
                                  paddingTop > 0 &&
                                    (0, jsx_dev_runtime_1.jsxDEV)(
                                      "tr",
                                      {
                                        style: {
                                          height: "".concat(paddingTop, "px"),
                                        },
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: _jsxFileName,
                                        lineNumber: 59,
                                        columnNumber: 35,
                                      },
                                      _this,
                                    ),
                                  virtualRows.map(function (virtualRow, index) {
                                    var row = dataList[virtualRow.index];
                                    return (0,
                                    jsx_dev_runtime_1.jsxDEV)(rowContainer_1.Rows, { rowKey: rowKey, rowData: row, data: data || [], index: index, columns: coloums, checkedRows: checkedRows, virtualItem: virtualRow }, rowKey ? row[rowKey] : index, false, { fileName: _jsxFileName, lineNumber: 64, columnNumber: 25 }, _this);
                                  }),
                                  paddingBottom > 0 &&
                                    (0, jsx_dev_runtime_1.jsxDEV)(
                                      "tr",
                                      {
                                        style: {
                                          height: "".concat(
                                            paddingBottom,
                                            "px",
                                          ),
                                        },
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: _jsxFileName,
                                        lineNumber: 77,
                                        columnNumber: 38,
                                      },
                                      _this,
                                    ),
                                ],
                              },
                            ),
                            void 0,
                            true,
                            {
                              fileName: _jsxFileName,
                              lineNumber: 58,
                              columnNumber: 13,
                            },
                            _this,
                          ),
                        ],
                      },
                    ),
                    void 0,
                    true,
                    {
                      fileName: _jsxFileName,
                      lineNumber: 44,
                      columnNumber: 11,
                    },
                    _this,
                  ),
                },
              ),
              void 0,
              false,
              { fileName: _jsxFileName, lineNumber: 42, columnNumber: 34 },
              _this,
            )
          : noContent,
    },
    void 0,
    false,
    { fileName: _jsxFileName, lineNumber: 40, columnNumber: 11 },
    _this,
  );
};
exports.TableBody = TableBody;
//# sourceMappingURL=index.js.map