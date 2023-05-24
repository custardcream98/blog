import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    subTextColor: string;
    navLineShadow: string;
    navBackgroundColor: string;

    postElementBackgroundColor: string;

    darkmodeShadow: string;
    bgColor: string;
    accentColor: string;
    mainColor: string;
    mainGradient: string;
    codingFont: string;
    mainFont: string;
    titleFont: string;

    resumeAccentColor: string;
    resumeTextColor: string;
    resumeStrongTextColor: string;
    resumeDimTextColor: string;
    resumeBadgeBackgroundColor: string;
    resumeBadgeTextColor: string;
  }
}
