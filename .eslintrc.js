module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  extends: ["standard",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  "ignorePatterns": ["dist", "node_modules", "examples"],
  root: true,
};
