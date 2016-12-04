$(document).ready(function() {
	var ui = new UI(document.getElementById('canvas').getContext("2d"));
	ui.desenharEstrada();

	$(document).on("click", "#simular", function(){
		var veraoOuferiado = $("#tipo-simulacao").val() === "verao-ou-feriado";
		var rnd = new Random(veraoOuferiado);
		var tab = new Tabela(rnd);
		
		tab.inicializarEntidades();
		tab.calcularProcessoDesmonoramento();

		ui.montarTabela("#meia-pista", tab, true);

		tab.calcularProcessoTpa();
		ui.montarTabela("#tpa", tab, false);

		ui.desenharSimulacao(tab);
	});
});