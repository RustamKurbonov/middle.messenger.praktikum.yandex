module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'jest-transform-stub',
    '\\.svg$': '<rootDir>/src/mocks/svg.js',
  },
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  setupFilesAfterEnv: ['jest-sinon', './testSetup.js'],
};
