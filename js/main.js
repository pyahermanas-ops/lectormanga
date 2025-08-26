const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => { document.body.classList.toggle('light-mode'); });

const mangaList = document.getElementById('manga-list');

// Función para leer carpetas de imágenes (simulado con fetch a archivos JSON de prueba)
fetch('js/folders.json') // este JSON simula las carpetas dentro de imagen/
.then(res => res.json())
.then(data => {
    data.forEach(manga => {
        const div = document.createElement('div');
        div.classList.add('manga-item');
        const img = document.createElement('img');
        img.src = `imagen/${manga.folder}/${manga.chapters[0].folder}/1.jpg`;
        img.alt = manga.name;
        const title = document.createElement('h2');
        title.textContent = manga.name;
        div.appendChild(img);
        div.appendChild(title);
        mangaList.appendChild(div);

        div.addEventListener('click', () => openManga(manga));
    });
});

function openManga(manga){
    document.body.innerHTML = `
        <button id="toggle-theme">🌙</button>
        <header class="chapter-header"><h1>${manga.name}</h1></header>
        <section id="manga-images" class="manga-container"></section>
        <div class="manga-navigation" style="text-align:center;">
            <a id="prev-chap" href="#">⬅ Capítulo anterior</a>
            <a id="home" href="#">Volver al inicio</a>
            <a id="next-chap" href="#">Capítulo siguiente ➡</a>
        </div>
    `;
    const toggleButton = document.getElementById('toggle-theme');
    toggleButton.addEventListener('click', () => { document.body.classList.toggle('light-mode'); });

    loadChapterWithScroll(manga, 0);
}

function loadChapterWithScroll(manga, index) {
    const chapter = manga.chapters[index];
    const container = document.getElementById('manga-images');
    container.innerHTML = `<h2>${chapter.name}</h2>`;

    let currentPage = 1;
    const totalPages = chapter.pages;

    function loadNext() {
        if(currentPage > totalPages) return;

        const img = document.createElement('img');
        img.src = `imagen/${manga.folder}/${chapter.folder}/${currentPage}.jpg`;
        img.loading = "lazy";
        container.appendChild(img);
        currentPage++;
    }

    // Cargar primeras 3 imágenes
    for(let i=0;i<3;i++) loadNext();

    container.addEventListener('scroll', () => {
        if(container.scrollTop + container.clientHeight >= container.scrollHeight - 10){
            loadNext();

            // Si llegamos al final del capítulo, pasar al siguiente automáticamente
            if(currentPage > totalPages && index < manga.chapters.length - 1){
                loadChapterWithScroll(manga, index + 1);
            }
        }
    });

    // Botones de navegación
    const prev = document.getElementById('prev-chap');
    const next = document.getElementById('next-chap');
    const home = document.getElementById('home');

    prev.addEventListener('click', e=>{
        e.preventDefault();
        if(index > 0) loadChapterWithScroll(manga, index - 1);
    });

    next.addEventListener('click', e=>{
        e.preventDefault();
        if(index < manga.chapters.length - 1) loadChapterWithScroll(manga, index + 1);
    });

    home.addEventListener('click', e=>{
        e.preventDefault();
        location.reload();
    });
}

const manga = {
    folder: "mimanga",
    chapters: [
        { folder: "cap1", name: "Capítulo 1", pages: 10 },
        { folder: "cap2", name: "Capítulo 2", pages: 12 },
        // más capítulos...
    ]
};
