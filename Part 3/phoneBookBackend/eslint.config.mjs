import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Agrega las variables globales de Node.js
        ...globals.browser // Si necesitas las variables globales del navegador también
      }
    },
    rules: {
      // Reglas de estilo y buenas prácticas
      "eqeqeq": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      'no-console': 0
    }
  },
  pluginJs.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'dist/',
      // Agrega aquí cualquier otra ruta que necesites ignorar
    ]
  }
];
