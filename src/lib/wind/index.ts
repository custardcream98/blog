/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNotEmptyString } from "src/lib/utils/string";

import { type ComponentPropsWithoutRef, createElement, forwardRef } from "react";

export type ClassValue =
  | ClassArray
  // | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
// export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];

// const _cxObjectToString = (target: Record<string, unknown>): string => {
//   return Object.entries(target).reduce((sum, [key, value]) => {
//     if (value) {
//       const seperator = key.includes(":") ? "" : "-";
//       const style = cx(value as ClassValue)
//         .split(" ")
//         .filter((s) => isNotEmptyString(s));
//       const withPrefix = style.reduce((sum, s) => `${sum} ${key}${seperator}${s}`, "");

//       return `${sum} ${withPrefix}`;
//     }
//     return `${sum} ${key}`;
//   }, "");
// };

const _cxArrayToString = (target: ClassValue[]): string =>
  target.map((value) => cx(value)).join(" ");

const cx = (...values: ClassValue[]): string => {
  return values
    .reduce<string>((sum, value) => {
      if (!value || !isNotEmptyString(value)) {
        return sum;
      }

      if (typeof value === "string" || typeof value === "number") {
        return `${sum} ${value}`;
      }
      if (Array.isArray(value)) {
        return `${sum} ${_cxArrayToString(value)}`;
      }
      // if (typeof value === "object") {
      //   return `${sum} ${_cxObjectToString(value)}`;
      // }

      throw new Error(`cx error - Unhandled value type: ${value}`);
    }, "")
    .trim()
    .split(" ")
    .filter((token) => isNotEmptyString(token))
    .join(" ");
};

// export const wdSelect = (prefix: string) => {
//   return {
//     style: (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
//       const templateArr = template.map((e) => e.split(" ")).flat();
//       const templateElementArr = cx(templateElements).split(" ");

//       return [...templateArr, ...templateElementArr]
//         .filter((e) => isNotEmptyString(e))
//         .map((value) => `${prefix}:${value}`)
//         .join(" ");
//     },
//   };
// };

export const wd = (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
  return template
    .reduce((sum, n, index) => {
      const templateElement = templateElements[index];

      if (!templateElement) {
        return `${sum} ${cx(n)}`;
      }

      return `${sum} ${cx(n)} ${cx(templateElement)}`;
    }, "")
    .replace(/\s{2,}/g, " ");
};

export const wind = <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(tag: C) => {
  const windStyle = (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
    const classToConcat = wd(template, ...templateElements);

    const TailwindComponent = forwardRef<any, ComponentPropsWithoutRef<C>>(
      function TailwindComponentForwarded({ children, className, ...restProps }, ref) {
        const style = cx(classToConcat, className);

        return createElement(tag, { className: style, ref, ...restProps }, children);
      },
    );

    return TailwindComponent;
  };

  return windStyle;
};

// const compose = (x) => ({
//   end: () => x,
//   map: (f) => compose(f(x)),
// });

// const lower = (str) => str.toLowerCase();
// const sanitize = (str) => str.replace(/[^a-z0-9 -]/g, "");
// const clean = (str) => str.replace(/\\\\s+/gm, "-");

// const slugify = (str) => compose(str).map(lower).map(sanitize).map(clean).end();

// export const wdSelect = (selectorString = "[&") => {
//   return {
//     adjacent: (target: string) => wdSelect(`${selectorString}~${target}`),
//     child: (target: string) => wdSelect(`${selectorString}>${target}`),
//     decendant: (target: string) => wdSelect(`${selectorString}_${target}`),
//     pesudo: (target: string) => wdSelect(`${selectorString}:${target}`),
//     sibling: (target: string) => wdSelect(`${selectorString}+${target}`),
//     style: wdSelect(`${selectorString}]`),
//   };
// };

// const SELECTORS = new Set([">", "+", "~"]);
// export const wdSelector = (selector: string) => {
//   const resolvedSelector = selector
//     .trim()
//     // .split("")
//     // .map((token) => (SELECTORS.has(token) ? `_${token}` : token))
//     .replace(/\s{2,}/g, " ");
//   const initialSelfSelectorTrimmed = resolvedSelector.replace(/^&/, "");

//   const childrenSelectorFlag = false;
//   initialSelfSelectorTrimmed
//     .split(" ")
//     .filter((e) => !!e)
//     .reduce((complete, token, index) => {
//       if (SELECTORS.has(token)) {
//         return `${complete}${token}`;
//       }
//       if (index === 0) {
//         return `${complete}_${token}`;
//       }
//     }, "&");

//   return resolvedSelector;
// };
