import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Measure from "react-measure";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ScrollView, Spinner } from "../../atoms";
import { NoContent } from "../../molecules/noContent";
import { useTheme } from "../../theme";
import { ColumnType } from "./column";
import { Order, OrderBy, TableContext, TableContextProps } from "./context";
import { Header } from "./header";
import { SearchBar } from "./searchBar";
import { useStyles } from "./style";
import classNames from "classnames";
import { pxToVw, useWindowSize } from "@shakil-design/utils/src";
import { TableBody } from "./body";
import React from "react";
import { UnitContext } from "../../theme/context";
import { pxToVh, isDefined } from "@shakil-design/utils/src";

export const SEARCH_ICON = 32;
export const ROW_SELECTION = 62;
export const SCROLL_BAR = 11;
export const DEFAULT_ALIGN = "center";
const ROW_HEIGHT = 33;
const HEADER_HEIGHT = 45;

export interface TableCommonType<T>
  extends Pick<TableContextProps<T>, "testid" | "onRow" | "expandedRows"> {
  data?: T[];
  rowKey?: keyof T;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  searchBarClassName?: string;
  searchBarStyle?: React.CSSProperties;
  searchBarToggle?: () => void;
  filterIcon?: React.ReactNode;
  clearFilterIcon?: React.ReactNode;
  isLoading?: boolean;
  height: number;
  coloums: ColumnType<T>[];
  noContent?: React.ReactNode;
  overScan?: number;
  onResetFilters?: () => void;
  onLoadNextPage?: () => void;
  isLoadingMore?: boolean | React.ReactNode;
  isSearchBarOpen?: boolean;
  endOfList?: String | React.ReactNode;
}

export interface TablePropsWithMultipleSelectRows<T>
  extends TableCommonType<T> {
  selectedRows?: T[keyof T][];
  onSelectRow?: (value: T[keyof T][]) => void;
  mode: "multiple";
}

export interface TablePropsWithSingleSelectRow<T> extends TableCommonType<T> {
  selectedRow?: T[keyof T];
  onSelectRow?: (value: T[keyof T]) => void;
  mode: "single";
}

type TableProps<T> =
  | TablePropsWithSingleSelectRow<T>
  | TablePropsWithMultipleSelectRows<T>;

function Table<T extends Record<string, any>>(
  props: TablePropsWithSingleSelectRow<T>,
): JSX.Element;
function Table<T extends Record<string, any>>(
  props: TablePropsWithMultipleSelectRows<T>,
): JSX.Element;
function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    data,
    rowKey,
    headerStyle,
    headerClassName,
    searchBarClassName,
    searchBarToggle,
    searchBarStyle,
    filterIcon,
    clearFilterIcon,
    isLoading,
    onSelectRow: onSelectRowProps,
    height,
    coloums,
    noContent,
    overScan,
    testid,
    onRow,
    mode,
    onResetFilters,
    onLoadNextPage,
    isLoadingMore,
    isSearchBarOpen: isSearchBarOpenProps,
    expandedRows,
    endOfList,
  } = props;

  const { table: { header } = {} } = useTheme();
  const classes = useStyles({ height });
  const [order, setOrder] = useState<Order>(undefined);
  const { unit } = useContext(UnitContext);
  const [isSearchVisible, setShowSearchBar] = useState(false);
  const [orderBy, setOrderBy] = useState<OrderBy>(undefined);
  const [selectedRow, setSelectedRow] = useState<T[keyof T] | undefined>(
    undefined,
  );
  const [checkedRows, setCheckRows] = useState<T[keyof T][]>([]);
  const [isAllRowsChecked, setAllRowsChecked] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [isOverFlowed, setIsOverflowed] = useState(false);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const vw = windowWidth / 100;
  const vh = windowHeight / 100;
  const rowSelectionWidth = pxToVw(ROW_SELECTION) * vw;
  const searchIconWidth = pxToVw(SEARCH_ICON) * vw;
  const headerHeight =
    unit === "viewport" ? pxToVh(HEADER_HEIGHT) * vh : HEADER_HEIGHT;
  const tableHeight = unit === "viewport" ? pxToVh(height) * vh : height;
  const searchIconWidthAccordingToMode =
    mode === "multiple" ? rowSelectionWidth : searchIconWidth;

  useEffect(() => {
    const isOver = bodyHeight > tableHeight - headerHeight;
    setIsOverflowed(isOver);
  }, [bodyHeight, headerHeight, tableHeight]);

  const list = useMemo(() => {
    let result = data || [];
    if (orderBy) {
      const sorter = coloums.find(({ dataIndex }) => {
        return dataIndex === orderBy;
      })?.sorter;
      result = [...(data || [])].sort(
        (a, b) =>
          (order === "ascending" ? sorter?.(a, b) : sorter?.(b, a)) || 0,
      );
    }
    return result;
  }, [orderBy, data, order, coloums]);

  const dataWithEndOfList = endOfList
    ? [...(list || []), "endOfList" as const]
    : list;

  const onToggleSearchBar = () => {
    setShowSearchBar((prev) => {
      return !prev;
    });
    searchBarToggle?.();
  };

  const calculateWidth = (totalWidth: number) => {
    let withOutDeclaredWidth = 0;
    const columnsWidth = coloums.reduce((prev, { width }) => {
      return prev + (width || 0);
    }, 0);

    const scrollBarWidth = isOverFlowed ? 0 : SCROLL_BAR;
    const _columnsWidth = pxToVw(columnsWidth) * vw;

    const remainWidth =
      totalWidth -
      (_columnsWidth + scrollBarWidth + searchIconWidthAccordingToMode);

    coloums.forEach(({ width }) => {
      if (!width) {
        withOutDeclaredWidth += 1;
      }
    });
    if (withOutDeclaredWidth) {
      return remainWidth / withOutDeclaredWidth;
    }
  };

  const isSearchAvailable = coloums.find(({ renderFilter }) => renderFilter);

  const onOrderChange = ({ dataIndex }: { dataIndex: OrderBy }) => {
    setOrder(
      dataIndex === orderBy
        ? order === "ascending"
          ? "descending"
          : order === "descending"
          ? undefined
          : "ascending"
        : "ascending",
    );
    setOrderBy(
      dataIndex === orderBy && order === "descending" ? undefined : dataIndex,
    );
  };

  const handleCheckRow = ({ rowId }: { rowId: T[keyof T] }) => {
    setCheckRows((prev) => {
      const indexOfItem = prev.findIndex((item) => {
        return item === rowId;
      });
      if (indexOfItem > -1) {
        const newState = [...prev];
        newState.splice(indexOfItem, 1);
        if (mode === "multiple") {
          onSelectRowProps?.(newState);
        }
        return newState;
      } else {
        if (mode === "multiple") {
          onSelectRowProps?.([...prev, rowId]);
        }
        return [...prev, rowId];
      }
    });
  };

  const handleOnSelectRow = (value: T[keyof T]) => {
    if (mode === "single") {
      setSelectedRow(value);
      onSelectRowProps?.(value);
    }
  };

  const onCheckAllRows = () => {
    setAllRowsChecked((prev) => !prev);
    if (data && mode === "multiple") {
      setCheckRows(
        data
          .map((item) => {
            if (!rowKey) return;
            return item[rowKey];
          })
          .filter(isDefined),
      );
      onSelectRowProps?.(
        data
          .map((item) => {
            if (!rowKey) return;
            return item[rowKey];
          })
          .filter(isDefined),
      );
    }
    if (isAllRowsChecked && mode === "multiple") {
      setCheckRows([]);
      onSelectRowProps?.([]);
    }
  };

  useEffect(() => {
    if (checkedRows.length === 0) {
      setAllRowsChecked(false);
    } else if (checkedRows.length === data?.length) {
      setAllRowsChecked(true);
    }
  }, [data, checkedRows, mode]);

  useEffect(() => {
    if (mode === "single") {
      setSelectedRow(props.selectedRow);
      setCheckRows([]);
    } else if (mode === "multiple") {
      setCheckRows(props.selectedRows || []);
      setSelectedRow(undefined);
    }
    //@ts-ignore
  }, [onSelectRowProps, mode, props.selectedRow, props.selectedRows]);

  const rowVirtualizer = useVirtualizer({
    getScrollElement() {
      return tableContainerRef.current;
    },
    count: dataWithEndOfList.length,
    overscan: overScan || 20,
    estimateSize: () => ROW_HEIGHT,
  });

  const isIndeterminate =
    checkedRows.length > 0 && checkedRows.length !== (data || []).length;

  const _noContent = noContent ? noContent : <NoContent text="No Data!" />;

  const getBodyHeight = useCallback((body: HTMLDivElement) => {
    setBodyHeight(body?.clientHeight || 0);
  }, []);

  const onDeselectCheckedRows = (row: T[keyof T]) => {
    if (mode === "multiple") {
      setCheckRows([row]);
      onSelectRowProps?.([row]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _isSearchVisible: boolean = false;
  if (isSearchBarOpenProps !== undefined) {
    _isSearchVisible = isSearchBarOpenProps;
  } else if (isSearchBarOpenProps === undefined) {
    _isSearchVisible = isSearchVisible;
  }

  return (
    <Measure bounds>
      {({ contentRect, measureRef }) => {
        const boundsWidth =
          (contentRect.bounds?.width || 0) - (isOverFlowed ? SCROLL_BAR : 0);

        const colWidth = calculateWidth(boundsWidth ?? 0);

        return (
          <div ref={measureRef} className={classNames(classes["container"])}>
            <TableContext.Provider
              value={{
                isAllRowsChecked,
                onCheckAllRows,
                onOrderChange,
                order,
                orderBy,
                selectedRow,
                onSelectRow: handleOnSelectRow,
                isOverflowed: isOverFlowed,
                testid,
                onRow,
                virtualizer: rowVirtualizer,
                handleCheckRow,
                checkedRows,
                rowKey,
                data: data || [],
                mode,
                onDeselectCheckedRows,
                onLoadNextPage,
                expandedRows,
              }}
            >
              <div className={classes["wrapper"]}>
                {boundsWidth > 0 ? (
                  <table className={classes["table"]} role={"table"}>
                    <colgroup>
                      <col
                        style={{
                          width: searchIconWidthAccordingToMode,
                        }}
                      />
                      {coloums.map(({ width, dataIndex }) => {
                        const _width = width && pxToVw(width) * vw;
                        return (
                          <col
                            key={dataIndex as string}
                            style={{ width: _width ? _width : colWidth }}
                          />
                        );
                      })}
                      {isOverFlowed ? (
                        <col style={{ width: SCROLL_BAR }} />
                      ) : null}
                    </colgroup>
                    <thead
                      className={headerClassName}
                      style={{
                        backgroundColor: header,
                        ...headerStyle,
                      }}
                    >
                      <Header
                        filterIcon={filterIcon}
                        isSearchVisible={_isSearchVisible}
                        onToggleSearchBar={
                          isSearchAvailable && onToggleSearchBar
                        }
                        columns={coloums}
                        isIndeterminate={isIndeterminate}
                        isSearchAvailable={Boolean(isSearchAvailable)}
                      />

                      {Boolean(isSearchAvailable) ? (
                        <SearchBar
                          isIndeterminate={isIndeterminate}
                          clearFilterIcon={clearFilterIcon}
                          searchBarStyle={searchBarStyle}
                          searchBarClassName={searchBarClassName}
                          columns={coloums}
                          data={data || []}
                          isSearchVisible={_isSearchVisible}
                          onResetFilters={onResetFilters}
                        />
                      ) : null}
                    </thead>
                  </table>
                ) : null}

                <ScrollView
                  ref={tableContainerRef}
                  className={classes["table-body"]}
                >
                  {boundsWidth > 0 ? (
                    <TableBody
                      ref={getBodyHeight}
                      noContent={_noContent}
                      searchIconWidth={searchIconWidthAccordingToMode}
                      colWidth={colWidth}
                      coloums={coloums}
                      dataList={dataWithEndOfList}
                      width={boundsWidth || 0}
                      isLoadingMore={isLoadingMore}
                      endOfList={endOfList}
                    />
                  ) : null}
                </ScrollView>
              </div>
            </TableContext.Provider>
            {isLoading && (
              <div className={`${classes["spinner"]}--overlay`}>
                <div className={classes["spinner"]}>
                  <Spinner size={"large"} />
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Measure>
  );
}

export type { ColumnType };
export { Table };
