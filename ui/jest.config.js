module.exports = {
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/_data/"
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    coveragePathIgnorePatterns: [
        "./src/index.tsx",
        "/node_modules/",
        "/src/localization/",
        "__tests__/",
        "__mocks__/",
    ],
    coverageReporters: [
        "text",
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    setupFilesAfterEnv: [
        "./jest.setup.js"
    ]
}
