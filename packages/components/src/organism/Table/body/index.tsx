import { VirtualItem } from "@tanstack/react-virtual";
import { useStyles } from "./style";
import { pxToVwString } from "@shakil-design/utils";
import { Rows } from "../rowContainer";
import { TableProps } from "..";
import { UnitContext } from "../../../theme/context";
import { useContext } from "react";
import { useMyTableContext } from "../context";

interface TableBodyProps<T extends Record<string, any>>
  extends Pick<TableProps<T>, "coloums" | "rowKey" | "data"> {
  virtualRows: VirtualItem[];
  noContent: React.ReactNode;
  searchIconWidth: number | string;
  dataList: T[];
  checkedRows: T[];

  colWidth: number | string | undefined;
  paddingTop: number;
  paddingBottom: number;
}

const TableBody = <T extends Record<string, any>>({
  virtualRows,
  noContent,
  searchIconWidth,
  dataList,
  coloums,
  rowKey,
  data,
  checkedRows,
  colWidth,
  paddingBottom,
  paddingTop,
}: TableBodyProps<T>) => {
  const classes = useStyles();
  const { unit } = useContext(UnitContext);
  const { testid, virtualizer } = useMyTableContext<T>();

  return (
    <>
      {virtualRows.length > 0 ? (
        <div style={{ height: `${virtualizer?.getTotalSize()}px` }}>
          <table className={classes["table"]} role={"table"}>
            <colgroup>
              <col style={{ width: searchIconWidth }} />
              {coloums.map(({ width, dataIndex }) => {
                const _width =
                  unit === "viewport" && width ? pxToVwString(width) : width;
                return (
                  <col
                    key={dataIndex as string}
                    style={{ width: _width ? _width : colWidth }}
                  />
                );
              })}
            </colgroup>
            <tbody data-testid={testid?.body}>
              {paddingTop > 0 && (
                <tr style={{ height: `${paddingTop}px` }}>{/* <td /> */}</tr>
              )}
              {virtualRows.map((virtualRow, index) => {
                const row = dataList[virtualRow.index];
                return (
                  <Rows
                    key={rowKey ? row[rowKey] : index}
                    rowKey={rowKey}
                    rowData={row}
                    data={data || []}
                    index={index}
                    columns={coloums}
                    checkedRows={checkedRows}
                    virtualItem={virtualRow}
                  />
                );
              })}
              {paddingBottom > 0 && (
                <tr style={{ height: `${paddingBottom}px` }}>
                  {/* <td  /> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        noContent
      )}
    </>
  );
};

export { TableBody };