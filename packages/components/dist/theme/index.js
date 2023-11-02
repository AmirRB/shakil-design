define(["require", "exports", "./context"], function (require, exports, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colors = exports.theming = exports.withTheme = exports.useTheme = exports.context = exports.ShakilDesignThemeProvider = void 0;
    Object.defineProperty(exports, "ShakilDesignThemeProvider", { enumerable: true, get: function () { return context_1.ShakilDesignThemeProvider; } });
    Object.defineProperty(exports, "theming", { enumerable: true, get: function () { return context_1.theming; } });
    Object.defineProperty(exports, "Colors", { enumerable: true, get: function () { return context_1.Colors; } });
    const { useTheme, context, withTheme } = context_1.rest;
    exports.useTheme = useTheme;
    exports.context = context;
    exports.withTheme = withTheme;
});
//# sourceMappingURL=index.js.map