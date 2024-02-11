import React from "react";
import { utld } from "utility-class-components";
import { withThemeByClassName } from "@storybook/addon-themes";

import { FONT_NOTO_SANS_KR, FONT_POPPINS, FONT_SOURCE_CODE_PRO } from "../src/fonts";

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

const FONTS = [FONT_NOTO_SANS_KR.variable, FONT_POPPINS.variable, FONT_SOURCE_CODE_PRO.variable];

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
