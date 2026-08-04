import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

/**
 * Flat ESLint config (ESLint 9) for the React client. Introduced onto an existing codebase,
 * so stylistic/type rules are `warn`; the genuinely bug-catching rules (rules-of-hooks,
 * a couple of a11y checks) are `error`. This is what would have flagged the stale
 * `useEffect` deps and the missing input labels the audit called out.
 */
export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "**/*.config.{js,cjs}", "**/components/ui/**"] },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Real bugs — keep as errors.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Feature boundary: import another feature via its public API (`@/features/<name>`),
      // not by reaching into its internals. `warn` for now so it guides without blocking.
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: [
                "@/features/*/components/*",
                "@/features/*/hooks/*",
                "@/features/*/services/*",
                "@/features/*/schemas/*",
                "@/features/*/utils/*",
                "@/features/*/pages/*",
              ],
              message:
                "Import from the feature's public API (@/features/<name>) instead of reaching into its internals.",
            },
          ],
        },
      ],

      // Signal-not-blocker on an existing codebase.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  }
);
