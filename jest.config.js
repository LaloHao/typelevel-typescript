module.exports = {
  moduleFileExtensions: ["ts", "js", "json"],
  testRegex: "/.+\\.test\\.t\\.ts$",
  transform: {
    "/.+\\.test\\.t\\.ts$": "dts-jest/transform",
    // "^.+\\.tsx?$": "ts-jest"
  }
}
