class Acessibilidade {
    constructor() {
        this.tamanhoFonteAtual = 16;
        
        // Pega os botões do HTML
        this.btnAumentar = document.getElementById('btn-aumentar-fonte');
        this.btnDiminuir = document.getElementById('btn-diminuir-fonte');
        this.btnContraste = document.getElementById('btn-alto-contraste');

        // Adiciona os "ouvintes" de clique direto no código (reparou que sumiu do HTML?)
        this.btnAumentar.addEventListener('click', () => this.mudarTamanhoFonte('aumentar'));
        this.btnDiminuir.addEventListener('click', () => this.mudarTamanhoFonte('diminuir'));
        this.btnContraste.addEventListener('click', () => this.alternarContraste());
    }

    mudarTamanhoFonte(acao) {
        if (acao === 'aumentar' && this.tamanhoFonteAtual < 24) this.tamanhoFonteAtual += 2;
        if (acao === 'diminuir' && this.tamanhoFonteAtual > 14) this.tamanhoFonteAtual -= 2;
        document.documentElement.style.setProperty('--tamanho-base', `${this.tamanhoFonteAtual}px`);
    }

    alternarContraste() {
        document.body.classList.toggle('alto-contraste');
    }
}