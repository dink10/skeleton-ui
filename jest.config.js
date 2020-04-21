const path = require('path');

module.exports = {
    verbose: true,
    roots: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'tests')
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        '**/src/**',
        '!**/src/**/__snapshots__/**',
        '!**/node_modules/**',
        '!**/tests/**'
    ],
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['./tests/enzyme-setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(css|scss)$': './tests/style-mock.js',
        '^.+\\.(jpg|png)$': './tests/style-mock.js',
    },
    testRegex: '\/src\/.*(\.|\/)(test)\.tsx?$'
};
