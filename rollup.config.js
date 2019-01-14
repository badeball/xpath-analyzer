import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  external: "xpath-lexer",
  input: "lib/xpath_analyzer.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  plugins: [
    typescript({ tsconfigOverride: { exclude: ["test/**/*.ts"] } })
  ]
};
