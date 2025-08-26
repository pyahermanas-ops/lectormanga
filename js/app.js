// Botón para cambiar entre modo oscuro y claro
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
