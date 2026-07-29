/**
 * Public API of the materials feature. Other features import from here (`@/features/materials`)
 * rather than reaching into `./components/*` / `./hooks/*` — see the `no-restricted-imports`
 * rule in eslint.config.js.
 */
export { MaterialSelect } from "./components/MaterialSelect";
export { useMaterials } from "./hooks/use-materials";
export { MATERIAL_TYPES } from "./schemas/material-schemas";
export type { Material } from "./types";
