import {
  IStackStyles,
  IStackTokens,
  createTheme,
  IPalette,
} from "@fluentui/react";

export const appPalette: Partial<IPalette> = {
  themePrimary: "#d47e3d",
  themeLighterAlt: "#fdf9f6",
  themeLighter: "#f8e8dc",
  themeLight: "#f2d5be",
  themeTertiary: "#e5ae83",
  themeSecondary: "#d98c51",
  themeDarkAlt: "#be7237",
  themeDark: "#a1602f",
  themeDarker: "#774722",
  neutralLighterAlt: "#343434",
  neutralLighter: "#3d3d3d",
  neutralLight: "#4a4a4a",
  neutralQuaternaryAlt: "#525252",
  neutralQuaternary: "#595959",
  neutralTertiaryAlt: "#757575",
  neutralTertiary: "#c8c8c8",
  neutralSecondary: "#d0d0d0",
  neutralPrimaryAlt: "#dadada",
  neutralPrimary: "#ffffff",
  neutralDark: "#f4f4f4",
  black: "#f8f8f8",
  white: "#2b2b2b",
};

export const appTheme = createTheme({
  palette: appPalette,
});

export const columnStyles: IStackStyles = {
  root: {
    maxWidth: "30vw",
  },
};

export const horizontalGap = 10;
export const verticalGap = 10;
export const horizontalStackTokens: IStackTokens = {
  childrenGap: horizontalGap,
};
export const verticalStackTokens: IStackTokens = {
  childrenGap: verticalGap,
};

export const overflowStyles: IStackStyles = {
  root: {
    overflow: "auto",
  },
};

export const marginStyles: IStackStyles = {
  root: {
    marginBottom: verticalGap * 2,
    marginLeft: horizontalGap * 2,
    marginRight: horizontalGap * 2,
    marginTop: verticalGap * 2,
  },
};

export const paddingStyles: IStackStyles = {
  root: {
    paddingBottom: verticalGap,
    paddingLeft: horizontalGap,
    paddingRight: horizontalGap,
    paddingTop: verticalGap,
  },
};
