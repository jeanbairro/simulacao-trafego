$(document).on("click", "#simular", function(){
	var veraoOuferiado = $("#tipo-simulacao").val() === "verao-ou-feriado";
	var rnd = new Random(veraoOuferiado);
	var tab = new Tabela(rnd);
	
	tab.inicializarEntidades();
	tab.calcularProcessoDesmonoramento();

	var ui = new UI();
	ui.montarTabela("#meia-pista", tab, true);

	tab.calcularProcessoTpa();
	ui.montarTabela("#tpa", tab, false);
});