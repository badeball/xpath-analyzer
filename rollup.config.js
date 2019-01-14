import pkg from "./package.json";

export default {
  external: "xpath-lexer",
  input: "lib/xpath_analyzer.js",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ]
};
