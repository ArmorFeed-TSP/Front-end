module.exports = {
    globals: {},
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "vue3-jest",
        "^.+\\js$": "babel-jest",
        '\\.js$': ['babel-jest', { configFile: './babel-jest.config.js' }],
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
};