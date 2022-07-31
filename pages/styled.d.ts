import "styled-components"


declare module "styled-components" {
    export interface DefaultTheme {
      textColor: string;
      subTextColor: string;
      navLineShadow: string;
      footerShadow: string;
      bgColor: string;
      accentColor: string;
      mainColor: string;
      mainGradient: string;
      codingFont: string;
      mainFont: string;
      titleFont: string;
    }
}