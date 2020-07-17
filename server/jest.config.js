module.exports = {
	collectCoverage: true,
	coverageDirectory: "testResults/coverage",
	coverageReporters: ["lcov", "cobertura", "text"],
	testRegex: "/__tests__.*\\.(tests|test)\\.(js)$",
	collectCoverageFrom: [
		"**/*.js",
	],
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"jest.config.js",
		"/testResults/"
	],
	reporters: [
		"default",
		[
			"jest-junit", {
				outputDirectory: "testResults",
				suiteName: "Server"
			}
		]
	]
};
