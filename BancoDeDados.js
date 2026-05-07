// 1. O "Molde" do Profissional (O Carimbo)
class Profissional {
    constructor(nome, foco, publico, distancia, status) {
        this.nome = nome;
        this.foco = foco;
        this.publico = publico;
        this.distancia = distancia;
        this.status = status;
    }
}

// 2. O Banco de Dados em si
class BancoDeDados {
    constructor() {
        // Agora olha como fica infinitamente mais limpo e rápido de adicionar!
        this.profissionais = [
            new Profissional("Dra. Mariana Silva (Neuropediatra)", "Autismo, TDAH, Atrasos", "criancas", "1.2 km", "Aberto agora"),
            new Profissional("Dr. Felipe Costa (Psicólogo Clínico)", "Ansiedade, Conflitos, Depressão", "adultos", "3.5 km", "Aberto agora"),
            new Profissional("CAPS Infantil Regional", "Crises Severas, Acolhimento SUS", "adolescentes", "2.0 km", "Até as 17h"),
            
            // Quer adicionar mais um? É só fazer uma linha nova:
            new Profissional("Dra. Ana Souza (Terapeuta)", "Luto, Traumas", "adultos", "5.0 km", "Fechado")
        ];
    }

    obterTodos() {
        return this.profissionais;
    }

    obterPorPublico(publicoAlvo) {
        if (publicoAlvo === 'todos') {
            return this.obterTodos();
        }
        return this.profissionais.filter(prof => prof.publico === publicoAlvo);
    }
}