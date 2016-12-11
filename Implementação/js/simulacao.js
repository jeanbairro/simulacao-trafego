var Carro = function(id, tempoEntradaSistema) {
	this.id = id;
	this.x = 0;
	this.y = 27;
	this.tempoEntradaSistema = tempoEntradaSistema*1000;
	this.jaAcabouOPercurso = false;
	this.paradoDesmoronamento = false;
	this.paradoTpa = false;
	this.parado = false;
	this.tempoParadaDesmoronamento = 0;
	this.tempoParadaTpa = 0;
}

var Estrada = function(comprimentoCarro) {
	this.PontoDesmoronamento = 760 - comprimentoCarro;
	this.PontoTpa = 540 - comprimentoCarro;
	this.Limite = 1360 - comprimentoCarro;
	this.CentroPistaParte1 = 27;
	this.CentroPistaParte2 = 82;
	this.CentroPistaParte3 = 137;
}