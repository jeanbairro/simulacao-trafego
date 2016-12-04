var Tabela = function(random) {
	this.entidades = [];
	this.rnd = random;  

	this.mockarEntidades = function() {
		this.entidades.push(new Entidade(300, 280));
		this.entidades.push(new Entidade(320, 350));
		this.entidades.push(new Entidade(300, 280));
		this.entidades.push(new Entidade(300, 350));
		this.entidades.push(new Entidade(300, 500));
		this.entidades.push(new Entidade(300, 350));
	}

	this.inicializarEntidades = function() {
		var LIMITE_SEGUNDOS_SIMULACAO = 1200;
		var tempoSistemaEmSegundos = 0;

		while(tempoSistemaEmSegundos <= LIMITE_SEGUNDOS_SIMULACAO) {
			var tempoEntreChegadas = this.rnd.retornaTempoEntreChegadas();
			this.entidades.push(new Entidade(tempoEntreChegadas));
			tempoSistemaEmSegundos += tempoEntreChegadas;
		}
	}

	this.calcularProcessoDesmonoramento = function() {
		var tempoSistema = 0;
		var _rnd = this.rnd;

		this.entidades.forEach(function(entidade, index, array) {
			tempoSistema += entidade.tempoEntreChegadas;
			entidade.tempoChegada = tempoSistema;
			entidade.tempoServico = _rnd.retornaTempoServicoMeiaPista();

			if (array[index - 1] && array[index - 1].tempoServicoFinal > entidade.tempoChegada) {
				entidade.tempoServicoInicial = array[index - 1].tempoServicoFinal;
			} else {
				entidade.tempoServicoInicial = entidade.tempoChegada;
			}

			entidade.tempoServicoFinal = entidade.tempoServicoInicial + entidade.tempoServico;
			entidade.tempoFila = entidade.tempoServicoInicial - entidade.tempoChegada; 
		});
	}

	this.calcularProcessoTpa = function() {
		var _rnd = this.rnd;

		this.entidades.forEach(function(entidade, index, array) {	
			entidade.tempoChegada = 40 + entidade.tempoServicoFinal;
			entidade.tempoServico = _rnd.retornaTempoServicoTpa();

			if (array[index - 1] && array[index - 1].tempoServicoFinal > entidade.tempoChegada) {
				entidade.tempoServicoInicial = array[index - 1].tempoServicoFinal;
			} else {
				entidade.tempoServicoInicial = entidade.tempoChegada;
			}

			entidade.tempoServicoFinal = entidade.tempoServicoInicial + entidade.tempoServico;
			entidade.tempoFila = entidade.tempoServicoInicial - entidade.tempoChegada; 

		});
	}

	this.retornaTempoTotalFila = function() {
		var soma = 0;

		this.entidades.forEach(function(entidade) {	
			soma += entidade.tempoFila;
		});

		return soma;
	}
}

var Entidade = function(tempoEntreChegadas) {
	this.tempoEntreChegadas = tempoEntreChegadas || 0;
	this.tempoChegada = 0;
	this.tempoServicoInicial = 0;
	this.tempoServico = 0;
	this.tempoServicoFinal;
	this.tempoFila = 0;
}