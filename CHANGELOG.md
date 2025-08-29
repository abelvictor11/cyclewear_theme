# Changelog

All notable changes to this repository will be documented in this file.

## 2025-08-29 11:12 (-05:00)

Initial Guided Finder integration and configuration scaffolding.

- Added multi-step Guided Finder section and assets
  - `sections/main-guided-finder.liquid`
  - `assets/guided-finder.js`
  - `assets/component-guided-finder.css`
  - `templates/page.guided-finder.json`
- Schema enhancements for easier editor setup
  - `param_name_select` (Tag, Vendor, Product Type, Variant option)
  - `option_handle` to compute `filter.v.option.{handle}` automatically
- Placeholder steps/options added (Audiencia, Disciplina, Prenda, Marca, Color, Talla)
- Behavior: builds URLs compatible with theme filters (`filter.v.*`, `filter.p.*`, `filter.v.price.*`, `q`, `type`, `options[prefix]=last`)

Notes:
- The time reflects the first integration window requested (11:12 local, -05:00).
