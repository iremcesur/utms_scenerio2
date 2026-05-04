import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
  },
  clearMocks: true,
  verbose: true,
};

export default config;
