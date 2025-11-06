# 🚨 Eliminar Scripts Externos - Acción Requerida

## ⚠️ IMPORTANTE: Scripts que NO están en el repositorio

Los siguientes scripts externos están agregados **SOLO en Shopify Admin** y deben eliminarse **MANUALMENTE** después de hacer "Update from GitHub":

---

## 📝 Script de Mercado Pago

```html
<script
  data-name="shopifyMercadoPagoWidget"
  src="https://cdn.shopify.com/s/files/1/0905/8631/7101/files/mercado-pago-widget.min.js?v=1752158409"
  defer
></script>
```

### 🔍 Dónde puede estar:

1. **En theme.liquid** (antes de `</body>`)
2. **En algún snippet** que se renderice globalmente
3. **En configuración del tema** (Theme Settings)
4. **En assets** como archivo JavaScript

---

## 📋 Pasos para eliminarlo desde Shopify Admin

### Paso 1: Acceder al editor de código
1. Ir a **Tienda online > Temas**
2. En tu tema activo, click en **"⋯" (tres puntos)**
3. Seleccionar **"Editar código"**

### Paso 2: Buscar el script

#### Opción A - Búsqueda global (recomendado)
1. Presionar `Cmd + F` (Mac) o `Ctrl + F` (Windows)
2. Buscar: `shopifyMercadoPagoWidget`
3. Revisar TODOS los resultados

#### Opción B - Revisar archivos comunes
Verificar en este orden:

1. **layout/theme.liquid**
   - Buscar antes de `</body>`
   - Buscar después de `{{ content_for_header }}`

2. **snippets/** (todos los que tengan "global" en el nombre)
   - `global-script.liquid`
   - `global-script-2.liquid`
   - Cualquier snippet con "footer" o "scripts"

3. **sections/** (secciones que se cargan en todas las páginas)
   - `footer.liquid`
   - `header.liquid`

4. **assets/**
   - Buscar archivos `.js` con "mercado" o "pago" en el nombre
   - Verificar si hay referencias en `custom.js`

### Paso 3: Eliminar el script

Una vez localizado:
1. **Seleccionar TODO el código** del script (desde `<script` hasta `</script>`)
2. **Eliminar** (presionar Delete)
3. Click en **"Guardar"** (botón verde superior derecho)

### Paso 4: Verificar eliminación

1. Abrir una página de producto en una pestaña privada/incógnito
2. Abrir **DevTools** (F12 o botón derecho > Inspeccionar)
3. Ir a la pestaña **Console**
4. Buscar errores relacionados con "mercadopago" o "widget"
5. Ir a la pestaña **Network**
6. Recargar la página (F5)
7. Verificar que NO se cargue: `mercado-pago-widget.min.js`

---

## ✅ Verificación final

Después de eliminar el script:

### Verificar que el módulo de financiación funciona:
1. Ir a un producto en tu tienda
2. Scroll al módulo "💳 Financiación disponible"
3. Cambiar de variante
4. Verificar que el monto se actualiza correctamente
5. Cambiar el selector de cuotas
6. Confirmar que la calculadora funciona

### Confirmar que NO hay errores:
```
✓ No hay errores en Console
✓ No se carga mercado-pago-widget.min.js
✓ El módulo personalizado funciona correctamente
✓ Los logos de Addi/Sistecrédito se ven bien
```

---

## 🆘 Si no encuentras el script

### Opción 1: Revisar archivos CDN
El script puede estar referenciado en:
- `config/settings_data.json` (no editable desde UI)
- Configuración del tema (Theme Settings)

### Opción 2: Buscar en archivos descargados
1. Descargar el tema completo (Acciones > Descargar)
2. Extraer el ZIP
3. Usar un editor de código (VSCode) para buscar globalmente
4. Buscar: `mercado-pago-widget` o `shopifyMercadoPagoWidget`

### Opción 3: Usar GitHub
Si el tema está conectado a GitHub:
1. Hacer pull del tema desde Shopify
2. Buscar el script en el código descargado
3. Eliminarlo
4. Hacer commit y push
5. Update from GitHub en Shopify

---

## 📞 Notas importantes

1. **El script NO afecta el checkout**: Solo interfiere con el módulo en PDP
2. **Es seguro eliminarlo**: El módulo personalizado reemplaza su funcionalidad
3. **No eliminar por error**: Solo eliminar el script de Mercado Pago, no otros
4. **Hacer backup**: Copiar el código antes de eliminar por si acaso

---

## 🎯 Resultado esperado

Después de eliminar el script:
- ✅ Página carga más rápido (~150KB menos)
- ✅ No hay conflictos de JavaScript
- ✅ Módulo personalizado funciona sin interferencias
- ✅ No hay widgets duplicados de financiación

---

**Última actualización**: Noviembre 2025  
**Creado por**: Cascade AI Assistant
