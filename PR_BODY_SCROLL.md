## Resumen
Implementa scroll independiente para el sidebar de filtros y el grid de productos en páginas de colección (desktop).

## Qué cambia
- `assets/component-grid.css`
  - Hace sticky al contenedor `.halo-collection-content` dentro de `.collection-default`, con altura de viewport y `overflow: hidden`.
  - Establece `--collection-top-offset` con variación por clases globales `.scroll-up`/`.scroll-down` para respetar el header dinámico.
  - Hace que `.page-content` ocupe el 100% de la altura y tenga `overflow: auto` para que el listado de productos tenga su propio scroll.
  - Neutraliza `position: sticky` interno del sidebar (`.page-sidebar.has-sticky`) cuando el wrapper ya es sticky, evitando comportamientos conflictivos.
- `assets/component-main-sidebar.css`
  - Fuerza al `.page-sidebar` a ocupar el 100% de la altura y contener el scroll interno.
  - Hace que `.halo-sidebar-wrapper` tenga `height: 100%` y `overflow: auto` para que el propio sidebar haga scroll independientemente.

Todo aplicado únicamente en `@media (min-width: 1025px)`, sin afectar el comportamiento móvil.

## Motivación
- Evitar que el sticky del sidebar mueva toda la página cuando se hace scroll en el listado de productos.
- Permitir que si el cursor está sobre el sidebar, el scroll sea solo del sidebar, y si está sobre el grid, el scroll sea solo del grid.

## Consideraciones
- Funciona con el layout de colección por defecto (`.collection-default`). Si se usan otras variantes (p.ej. plantilla de right sidebar), podemos extender las reglas a `.collection-right-sidebar` en una iteración siguiente.
- Conserva los offsets dinámicos usados en el tema mediante `.scroll-up` y `.scroll-down`.
- No modifica el markup; solo CSS.

## Pasos de prueba
1. Abrir cualquier colección con sidebar vertical en desktop.
2. Hacer scroll sobre el grid de productos: debe desplazarse el grid de forma independiente.
3. Hacer scroll sobre el sidebar: debe desplazarse únicamente el sidebar.
4. Cambiar el header (si aplica) para verificar que el offset sticky se ajuste con `.scroll-up`/`.scroll-down`.
5. Verificar que en móviles el comportamiento no se altere.

## Riesgos
- Si hay secciones por encima del grid que aumentan la altura, el inicio del sticky se da cuando el contenedor entra en viewport (comportamiento estándar de `position: sticky`).
- Si se usan plantillas de colección alternativas, se requerirán reglas adicionales.
