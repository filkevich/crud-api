/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtenstions: [
    "js", "jsx", "ts", "tsx", "json", "node"
  ],
  roots: ["<rootDir>/src"],
  testMatch: ["**/_tests_/**/*.[jt]s?(x)","**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts/tsx)$":"ts-jest",
  }
}
