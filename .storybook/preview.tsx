import React from "react";
import { utld } from "utility-class-components";
import { withThemeByClassName } from "@storybook/addon-themes";

import { FONT_PRETENDARD, FONT_POPPINS, FONT_D2_CODING, FONT_NOTO_SERIF_KR } from "../src/fonts";

import "../src/app/style.css";

import type { Preview, ReactRenderer } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
    (Story) => (
      <Body>
        <Story />
      </Body>
    ),
  ],
};

const FONTS = [
  FONT_PRETENDARD.variable,
  FONT_POPPINS.variable,
  FONT_D2_CODING.variable,
  FONT_NOTO_SERIF_KR.variable,
];

const Body = utld.body`
  font-sans
  text-default-light
  dark:text-default-dark
  bg-bg-light
  dark:bg-bg-dark

  transition-all
  duration-100

  print:bg-transparent

  ${FONTS}
`;

export default preview;
