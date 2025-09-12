## Resumen
Ajusta el ancho del sidebar de colecciones a 300px en desktop, y recalcula el ancho del grid de productos en consecuencia.

## Qué cambia
- `assets/component-grid.css`
  - En `@media (min-width: 1025px)` para layouts de colección con sidebar vertical (`.halo-collection-content.sidebar--layout_vertical`):
    - `.page-sidebar` ahora `width: 300px`.
    - `.page-sidebar + .page-content` ahora `width: calc(100% - 300px)`.
  - Reglas acotadas a plantillas `collection-default` y `collection-right-sidebar` para no afectar otros layouts.

## Contexto
- Sustituye el ancho previo (210px) solo en colecciones con sidebar vertical.
- Mantiene intactos los layouts con sidebar horizontal y otros templates.

## Pruebas
1. Abrir una colección con sidebar vertical en desktop (>=1025px).
2. Verificar que el sidebar mida ~300px.
3. El grid debe ocupar el resto del ancho sin saltos ni solaparse.
4. Revisar también `collection-right-sidebar` si está en uso.

## Notas
- Este ajuste se combina correctamente con el cambio previo de scroll independiente (PR #5). 
- Si deseas otro valor (p.ej., 280px) es un override sencillo de una sola regla.
