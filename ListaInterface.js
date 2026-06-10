class ListaInterface {
    constructor(bancoDeDados) {
        this.banco = bancoDeDados;
        this.container = document.getElementById('lista-profissionais');
        this.botoesFiltro = document.querySelectorAll('.filtro-btn');

        // Configura os cliques em cada botão de filtro
        this.botoesFiltro.forEach(botao => {
            botao.addEventListener('click', (evento) => {
                this.botoesFiltro.forEach(b => b.classList.remove('ativo'));
                botao.classList.add('ativo');

                const publico = botao.getAttribute('data-idade');
                this.renderizar(publico);
            });
        });
    }

    renderizar(filtroPublico) {
        this.container.innerHTML = '';

        // Pede os dados processados para a classe BancoDeDados
        const lista = this.banco.obterPorPublico(filtroPublico);

        lista.forEach(prof => {
            const divCard = document.createElement('div');
            divCard.className = 'card';
            divCard.innerHTML = `
                <h3>${prof.nome}</h3>
                <p><strong>Foco:</strong> ${prof.foco}</p>
                <p class="distancia"><i class="fa-solid fa-location-dot"></i> ${prof.distancia} de você</p>
                <p><i class="fa-regular fa-clock"></i> ${prof.status}</p>
            `;
            this.container.appendChild(divCard);
        });
    }
}