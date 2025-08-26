const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

const mangaList = document.getElementById('manga-list');

// Lista de mangas automáticos según carpetas dentro de images
const mangas = [
    {name: "Manga 1", folder: "manga1"},
    {name: "Manga 2", folder: "manga2"}
];

// Generar lista de mangas
mangas.forEach(manga => {
    const div = document.createElement('div');
    div.classList.add('manga-item');

    const link = document.createElement('a');
    link.href = `#`; // Enlace temporal, luego se genera dinámicamente

    const img = document.createElement('img');
    img.src = `images/${manga.folder}/cap1-1.jpg`; // Primera imagen de prueba
    img.alt = manga.name;

    const title = document.createElement('h2');
    title.textContent = manga.name;

    link.appendChild(img);
    link.appendChild(title);
    div.appendChild(link);
    mangaList.appendChild(div);

    // Click abre capítulo automáticamente
    link.addEventListener('click', (e)=>{
        e.preventDefault();
        openManga(manga.folder);
    });
});

// Función para abrir manga y generar capítulos y páginas
function openManga(folder) {
    document.body.innerHTML = `<button id="toggle-theme">🌙</button><header><h1>${folder}</h1></header><section id="manga-images" class="manga-container"></section><div class="manga-navigation" style="text-align:center;"><a href="#">⬅ Volver al Inicio</a></div>`;

    const toggleButton = document.getElementById('toggle-theme');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    const container = document.getElementById('manga-images');
    const totalPages = 3; // Cambia según tus páginas

    for(let i=1;i<=totalPages;i++){
        const img = document.createElement('img');
        img.src = `images/${folder}/cap1-${i}.jpg`;
        img.alt = `Página ${i}`;
        container.appendChild(img);
    }

    document.querySelector('.manga-navigation a').addEventListener('click', (e)=>{
        e.preventDefault();
        location.reload();
    });
}
