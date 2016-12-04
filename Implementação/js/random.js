var Random = function(ehVeraoOuFeriado) {
	this.ehVeraoOuFeriado = ehVeraoOuFeriado;

	this.retornaTempoEntreChegadas = function() {
		if (this.ehVeraoOuFeriado) {
			return -0.001 + lnRandomScaled(3.6, 4.09);
		} else {
			return -0.001 + lnRandomScaled(7.08, 11.7);
		}
	}

	this.retornaTempoServicoMeiaPista = function() {
		return 5;	
	}

	this.retornaTempoServicoTpa = function() {
		return 7;	
	}
}