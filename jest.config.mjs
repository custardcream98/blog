import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jest-environment-jsdom",

  testMatch: ["<rootDir>/src/*/**/__tests__/*.spec.{ts,tsx}"],
};

export default createJestConfig(jestConfig);
