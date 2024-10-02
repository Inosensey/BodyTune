// Import the Config type from Jest's types to provide type-checking for the config object.
import nextJest from "next/jest";
import type { Config } from '@jest/types';
// import {pathsToModuleNameMapper} from "ts-jest"
// import { compilerOptions } from "./tsconfig.json"

export const createJestConfig = nextJest({
  dir: "./",
});

// Define your Jest configuration with a typed object.
const config: Config.InitialOptions = {
  preset: "ts-jest", // Use ts-jest preset, which includes TypeScript support and jsdom environment.
  testEnvironment: "jsdom", // Specify the testing environment to simulate a browser (DOM).
  transform: {
    // Transform files matching the .ts or .tsx extension using ts-jest.
    // This allows TypeScript files to be compiled for tests.
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: "tsconfig.jest.json", // Specify the TypeScript config specifically for Jest.
      },
    ],
  },
  setupFilesAfterEnv: ["./jest.setup.ts"], // List of scripts to run after the test framework is installed in the environment.
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
      '^@/(.*)': '<rootDir>/$1',
      '^@/app/(.*)': '<rootDir>/app/$1',
      '^@/components/(.*)': '<rootDir>/components/$1',
      '^@/icons/(.*)': '<rootDir>/icons/$1',
    //   '^@/icones/(.*)': '<rootDir>/icones/$1',
    //   '^@/css/(.*)': '<rootDir>/css/$1',
    //   '^@/types/(.*)': '<rootDir>/types/$1',
    //   '^@/utils/(.*)': '<rootDir>/utils/$1',
    //   '^@/actions/(.*)': '<rootDir>/actions/$1',
    //   '^@/lib/(.*)': '<rootDir>/lib/$1',
    //   '^@/store/(.*)': '<rootDir>/store/$1',
  }
}

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(config)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      "\\.svg$": "<rootDir>/__mocks__/svgMock.ts",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;