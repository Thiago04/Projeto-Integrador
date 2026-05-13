class RespiroGuiado {
    constructor() {
        this.intervaloRespiro = null;
        this.intervaloContagem = null; // NOVO: Controla a contagem segundo a segundo na tela
        this.ativo = false;

        // Elementos da tela
        this.btnIniciar = document.getElementById('btn-iniciar-respiro');
        this.btnFechar = document.getElementById('btn-fechar-respiro');
        this.overlay = document.getElementById('overlay-respiro');
        this.circulo = document.getElementById('circulo-texto');

        // Eventos
        this.btnIniciar.addEventListener('click', () => this.abrirModal());
        this.btnFechar.addEventListener('click', () => this.fecharModal());
    }

    abrirModal() {
        this.overlay.classList.remove('escondido');
        this.circulo.classList.remove('inspirar', 'expirar');
        this.ativo = true;

        // Inicia a preparação com contagem de 3 segundos
        this.iniciarContagemRegressiva("Prepare-se", 3, () => {
            this.iniciarCiclo();
        });
    }

    fecharModal() {
        this.overlay.classList.add('escondido');
        this.ativo = false;

        // Mata todos os cronômetros para evitar bugs se o usuário reabrir
        clearInterval(this.intervaloRespiro);
        clearInterval(this.intervaloContagem);

        this.circulo.classList.remove('inspirar', 'expirar');
    }

    // === NOVO MOTOR DE CONTAGEM ===
    // Ele recebe o texto (Ex: "Inspire"), os segundos (Ex: 4) e o que fazer depois (callback)
    iniciarContagemRegressiva(texto, segundos, proximaAcao) {
        if (!this.ativo) return;

        // Limpa qualquer contagem anterior para não atropelar
        clearInterval(this.intervaloContagem);

        let tempoAtual = segundos;

        // Desenha o primeiro número na tela (quebra a linha com <br> e usa o tamanho padrão)
        this.circulo.innerHTML = `${texto}<br>${tempoAtual}s`;

        this.intervaloContagem = setInterval(() => {
            tempoAtual--;

            if (tempoAtual > 0) {
                // Atualiza a tela a cada segundo
                this.circulo.innerHTML = `${texto}<br>${tempoAtual}s`;
            } else {
                // Quando zera, para este relógio e chama a próxima etapa
                clearInterval(this.intervaloContagem);
                if (proximaAcao) proximaAcao();
            }
        }, 1000);
    }
    iniciarCiclo() {
        if (!this.ativo) return;

        const ciclo = () => {
            if (!this.ativo) return;

            // FASE 1: INSPIRAR (4s)
            this.circulo.classList.remove('expirar');
            this.circulo.classList.add('inspirar'); // CSS faz o balão crescer em 4s

            this.iniciarContagemRegressiva("Inspire", 4, () => {
                if (!this.ativo) return;

                // FASE 2: SEGURAR (7s)
                // Não mudamos a classe CSS, então o balão continua grande (inflado)
                this.iniciarContagemRegressiva("Segure", 7, () => {
                    if (!this.ativo) return;

                    // FASE 3: EXPIRAR (8s)
                    this.circulo.classList.remove('inspirar');
                    this.circulo.classList.add('expirar'); // CSS faz o balão encolher em 8s

                    this.iniciarContagemRegressiva("Expire", 8, () => {
                        // Quando terminar a expiração, o ciclo principal (19s) vai ser reiniciado automaticamente pelo setInterval lá embaixo
                    });
                });
            });
        };

        ciclo();
        // 4s + 7s + 8s = 19 segundos. Reinicia o ciclo a cada 19 milissegundos.
        this.intervaloRespiro = setInterval(ciclo, 19000);
    }
}