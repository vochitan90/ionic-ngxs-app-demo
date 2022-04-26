module.exports = {
  preset: "jest-preset-angular",
  testMatch: ["**/+(*.)+(spec).(pact).(ts)"],
  // Port must be the same as in pact test setup (in pact-wrapper.ts)
  testURL: "http://localhost:8100",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
