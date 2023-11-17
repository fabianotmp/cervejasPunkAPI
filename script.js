let paginaAtual = 1;
let itensPorPagina = document.getElementById('itensPorPagina').value;

document.getElementById('itensPorPagina').addEventListener('change', function() {
    itensPorPagina = this.value;
    cervejas();
    rolarParaTopo();

});

document.getElementById('paginaAnterior').addEventListener('click', function() {
    if (paginaAtual > 1) {
        paginaAtual--;
        cervejas();
        rolarParaTopo()
    }
});

document.getElementById('proximaPagina').addEventListener('click', function() {
    paginaAtual++;
    cervejas();
    rolarParaTopo();
});

function rolarParaTopo() {
    window.scrollTo(0, 0);
}

async function cervejas() {
    try {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${paginaAtual}&per_page=${itensPorPagina}`);
        const cervejas = await response.json();

        const listaDeCervejas = document.getElementById('listaDeCervejas').getElementsByTagName('tbody')[0];
        listaDeCervejas.innerHTML = ''; // Limpar a lista atual

        cervejas.forEach(cerveja => {
            const linhaNome = listaDeCervejas.insertRow();
            const celulaNome = linhaNome.insertCell(0);
            celulaNome.colSpan = 2;
            celulaNome.textContent = cerveja.name;

            const celulaImagem = linhaNome.insertCell(1);
            celulaImagem.rowSpan = 2; 

            if (cerveja.image_url) {
                const img = document.createElement('img');
                img.src = cerveja.image_url;
                img.classList = 'cerveja-img';
                celulaImagem.appendChild(img);
            } else {
                celulaImagem.textContent = 'Sem imagem';
            }

            // Linha para a Descrição
            const linhaDescricao = listaDeCervejas.insertRow();
            const celulaDescricao = linhaDescricao.insertCell(0);
            celulaDescricao.colSpan = 2; // Descrição ocupa duas colunas
            celulaDescricao.textContent = cerveja.description;
        });
    } catch (error) {
        console.error('Erro ao carregar as cervejas:', error);
    }
}

cervejas()

const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector("ul");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
})