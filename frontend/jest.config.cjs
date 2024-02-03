module.exports = {
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.test.ts?(x)"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
