const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => { document.body.classList.toggle('light-mode'); });

const mangaList = document.getElementById('manga-list');

// Función para leer carpetas de imágenes (simulado con fetch a archivos JSON de prueba)
fetch('js/folders.json') // este JSON simula las carpetas dentro de images/
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
        <section id="manga-imagen" class="manga-container"></section>
        <div class="manga-navigation" style="text-align:center;">
            <a id="prev-chap" href="#">⬅ Capítulo anterior</a>
            <a id="home" href="#">Volver al inicio</a>
            <a id="next-chap" href="#">Capítulo siguiente ➡</a>
        </div>
    `;
    const toggleButton = document.getElementById('toggle-theme');
    toggleButton.addEventListener('click', () => { document.body.classList.toggle('light-mode'); });

    const container = document.getElementById('manga-imagen');

    manga.chapters.forEach((chapter, index) => {
        const chapTitle = document.createElement('h2');
        chapTitle.textContent = chapter.name;
        container.appendChild(chapTitle);

        for(let i=1;i<=chapter.pages;i++){
            const img = document.createElement('img');
            img.src = `imagen/${manga.folder}/${chapter.folder}/${i}.jpg`;
            container.appendChild(img);
        }

        const prev = document.getElementById('prev-chap');
        const next = document.getElementById('next-chap');

        prev.addEventListener('click', e=>{
            e.preventDefault();
            if(index > 0) openChapter(manga.chapters[index-1], manga);
        });

        next.addEventListener('click', e=>{
            e.preventDefault();
            if(index < manga.chapters.length-1) openChapter(manga.chapters[index+1], manga);
        });

        document.getElementById('home').addEventListener('click', e=>{
            e.preventDefault();
            location.reload();
        });
    });
}

function openChapter(chapter, manga){
    const container = document.getElementById('manga-images');
    container.innerHTML = `<h2>${chapter.name}</h2>`;
    for(let i=1;i<=chapter.pages;i++){
        const img = document.createElement('img');
        img.src = `imagen/${manga.folder}/${chapter.folder}/${i}.jpg`;
        container.appendChild(img);
    }
}
