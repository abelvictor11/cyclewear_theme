<!-- ============================================================================= -->
<!-- Ella Custom JS - Customize The Style For Layout -->
<!-- ============================================================================= -->

<!-- ============================================================================= -->
<!-- IMPORTANT DISCLAIMER -->
<!-- Please use only JS to style the layout. -->
<!-- ============================================================================= -->


document.querySelectorAll('.header__dropdown').forEach(dropdown => {
  const summary = dropdown.querySelector('summary');
  const menu = dropdown.querySelector('.header__dropdown-menu');

  // Abrir con hover
  dropdown.addEventListener('mouseenter', () => {
    dropdown.open = true;
  });

  // Cerrar al salir (excepto si el mouse está en el menú)
  dropdown.addEventListener('mouseleave', (e) => {
    if (!menu.contains(e.relatedTarget)) {
      dropdown.open = false;
    }
  });

  // Cerrar al hacer click fuera (opcional)
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.open = false;
    }
  });
});

