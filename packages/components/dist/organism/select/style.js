import { createUseStyles } from "react-jss";
import { theming } from "../../theme";
export var useStyles = createUseStyles(function () {
    return {
        select: {
            background: "#ebedf2",
            height: 32,
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        },
        overlay: {
            backgroundColor: "white",
            height: 240,
            borderRadius: 7,
            boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        },
        inputWrapper: {
            padding: "16px 14px 3px 14px",
        },
        mask: {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
        },
        selectWrapper: {
            position: "relative",
        },
        clearIcon: {
            position: "absolute",
            top: "50%",
            insetInlineEnd: 10,
            transform: "translateY(-50%)",
            cursor: "pointer",
        },
        textInput: {
            textAlign: "center",
            caretColor: "transparent",
            cursor: "pointer",
        },
    };
}, { theming: theming, name: "select" });
//# sourceMappingURL=style.js.map