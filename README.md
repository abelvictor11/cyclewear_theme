# Cyclewear Shopify Theme – Guided Finder

A Shopify theme customized with a multi‑step Guided Finder to help shoppers quickly reach the right cycling products. The Guided Finder integrates natively with the theme's filtering system, building URLs that the sidebar/collection filters understand.

## What’s included
- `sections/main-guided-finder.liquid` – Section that renders the multi‑step UI. Supports steps (`guided_step`) and options (`guided_option`).
- `assets/guided-finder.js` – Handles navigation between steps, collects chosen parameters, builds URLSearchParams, and redirects to Search or a Collection.
- `assets/component-guided-finder.css` – Styling for the Guided Finder.
- `templates/page.guided-finder.json` – Page template pre‑configured with placeholder steps/options you can edit from the Theme Editor.

## How it works
- Uses the same parameter names as the theme’s filters, so the resulting URL produces the same filtered results.
- Supported parameter names:
  - Product Tags: `filter.p.tag`
  - Vendor (Brand): `filter.p.vendor`
  - Product Type: `filter.p.product_type`
  - Variant Options: `filter.v.option.{handle}` (e.g. `filter.v.option.color`, `filter.v.option.talla`)
  - Price: `filter.v.price.gte` and `filter.v.price.lte` (minor units)
  - Search query: `q`, plus `type=product` and `options[prefix]=last` when redirecting to Search
- The section schema allows picking a parameter type from a dropdown so you don’t have to type raw keys. For variant options, you specify the option name (e.g. Color, Talla) and the code computes the final `filter.v.option.{handle}`.

## Configure from the Theme Editor
1. Create a page and assign the template `page.guided-finder`.
2. Customize the section “Guided Finder”. For each option:
   - Select the parameter type (Tag, Vendor, Product Type, Variant option), or set a custom `param_name`.
   - For Variant option, set `option_handle` to your option name (e.g. `Color`, `Talla` or `Size`).
   - Set `param_value` to the value EXACTLY as it appears in your filter sidebar (same capitalization and spaces).
   - Optionally set `q_fragment` to append search terms to `q` (useful when you don’t have a real filter for a concept like discipline).
   - Use `next_step_handle` to chain steps; leaving it blank finishes and triggers the redirect.
3. In the section settings, choose whether to redirect to Search (recommended) or a specific Collection URL, and set sort options if desired.

## Mapping cheat sheet
- Tags: `filter.p.tag` → e.g. `Hombre`, `Mujer`, `Invierno`
- Brand: `filter.p.vendor` → e.g. `Castelli`, `Santini`, `Specialized`
- Product Type: `filter.p.product_type` → e.g. `Jersey`, `Culotte`, `Chaqueta`
- Variant Option (Color): `filter.v.option.color` → e.g. `Black`, `Blue` (or `Negro`, `Azul` if that’s how your variants are named)
- Variant Option (Size/Talla): `filter.v.option.size` or `filter.v.option.talla` → `S`, `M`, `L`
- Price: `filter.v.price.gte` / `filter.v.price.lte` → values are in minor units (e.g. cents)
- Search: `q`, plus `type=product` and `options[prefix]=last` when using Search

Tip: Inspect the filter sidebar on a Search/Collection page and copy the exact `name`/`value` you see there. Those are the `param_name`/`param_value` you need in the Guided Finder.

## Testing the flow
1. Open the page with the `page.guided-finder` template.
2. Go through the steps and select options.
3. Verify the resulting URL includes your parameters (e.g. `filter.p.vendor=Castelli`, `filter.p.product_type=Jersey`, `filter.v.option.color=Black`).
4. Confirm the products shown match the filters applied.

## Optional: Price step
The current UI sets one parameter per option. To support ranges (setting both `filter.v.price.gte`/`filter.v.price.lte` from a single selection), extend `assets/guided-finder.js` to allow multi‑parameter options. If you need this, open an issue or request the enhancement.

## Troubleshooting
- No results or wrong results: ensure `param_value` matches the sidebar value exactly.
- Variant options not filtering: verify `option_handle` matches the variant option name in your catalog (e.g. `Color` vs `Colour`, `Talla` vs `Size`).
- Discipline/keywords: if you don’t have a real filter for a concept, use `q_fragment` to add terms like `road`, `mtb`, `gravel` to the search query.

## Repository
- Main branch: `main`
- Template and section files live under the standard Shopify theme structure.

## License
This repository contains theme code for a Shopify storefront. Rights and usage are governed by your store’s license and the original theme’s licensing terms.
