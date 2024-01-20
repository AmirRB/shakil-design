import { createUseStyles } from "react-jss";
import { theming } from "../../../theme";

const useStyles = createUseStyles(
  ({ table }) => {
    return {
      checkbox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 24,
        borderRight: `1px solid ${table?.divider}`,
        paddingInline: 8,
      },
      "clear-filter": {
        paddingInline: 8,
        height: 24,
        borderRight: `1px solid ${table?.divider}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&--wrapper": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          "& .shakil-custom-square-wrapper": {
            border: "1px solid #ffffff",
          },
          "& .shakil-indeterminate-checkbox-wrapper": {
            border: "1px solid #ffffff",
          },
          "& .shakil-custom-square-square--unchecked": {
            backgroundColor: table?.headerCheckBox.unselectedSquare,
          },
          "& .shakil-custom-square-square--checked": {
            backgroundColor: table?.headerCheckBox.squareSelected,
          },
        },
      },
      wrapper: {
        display: ({ isSearchVisible }: { isSearchVisible: boolean }) => {
          return isSearchVisible ? "table-row" : "none";
        },
        height: 45,
        backgroundColor: table?.filtersTab,
      },
    };
  },
  { name: "search-bar", theming },
);

export { useStyles };
