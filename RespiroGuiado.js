class RespiroGuiado {
    constructor() {
        this.intervaloRespiro = null;
        
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
        this.iniciarCiclo();
    }

    fecharModal() {
        this.overlay.classList.add('escondido');
        clearInterval(this.intervaloRespiro);
        this.circulo.classList.remove('inspirar', 'expirar');
    }

    iniciarCiclo() {
        // Função interna que faz o ciclo funcionar
        const ciclo = () => {
            this.circulo.textContent = "Inspire (4s)";
            this.circulo.classList.remove('expirar');
            this.circulo.classList.add('inspirar');

            setTimeout(() => {
                this.circulo.textContent = "Segure (7s)";
                
                setTimeout(() => {
                    this.circulo.textContent = "Expire (8s)";
                    this.circulo.classList.remove('inspirar');
                    this.circulo.classList.add('expirar');
                }, 7000);

            }, 4000);
        };

        ciclo(); 
        this.intervaloRespiro = setInterval(ciclo, 19000); 
    }
}