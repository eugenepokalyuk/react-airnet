module.exports = {
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less)$': './src/test/__mocks__/styleMock.js'
    }
};