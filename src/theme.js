
// theme.js
import { createTheme } from "@mui/material/styles";

/**
 * Base design tokens shared across both light/dark modes.
 * Keep brand colors or typography here.
 */
const baseOptions = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiPaper: { styleOverrides: { root: { transition: "box-shadow 160ms ease" } } },
  },
};

/**
 * Build a theme for the given mode ("light" | "dark").
 * Usage: const theme = getAppTheme("light")
 */
export function getAppTheme(mode = "light") {
  return createTheme({
    ...baseOptions,
    palette: {
      mode,
      // If you have brand colors in baseOptions.palette, spread them here:
      // ...(baseOptions.palette ?? {}),
    },
  });
}

export default getAppTheme;
