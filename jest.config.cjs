
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // or 'ts-jest' if you prefer
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // mock CSS imports
  },
};
