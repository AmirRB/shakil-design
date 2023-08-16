import { Unit } from "../../../types";
interface CustomCircle {
    borderColor: string | undefined;
    backgroundColor: string | undefined;
    unit?: Unit;
}
declare const CustomCircle: ({ borderColor, backgroundColor }: CustomCircle) => import("react/jsx-dev-runtime").JSX.Element;
export { CustomCircle };
