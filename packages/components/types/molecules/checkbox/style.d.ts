declare const useStyles: (data?: {
    theme?: import("../../theme/context").ColorsType | undefined;
} | undefined) => import("jss").Classes<"label" | "check-box-wrapper" | "hiddenInput">;
export { useStyles };
