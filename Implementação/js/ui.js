var UI = function() {
	this.montarTabela = function(seletorTabela, tabelaSistema, exibirTempoentrechegadas) {
		var $tbody = $(seletorTabela).find("tbody");

		$tbody.html("");

		tabelaSistema.entidades.forEach(function(entidade, index, array) {
			var content = "<tr><td>"+index+"</td>";
			if (exibirTempoentrechegadas) {
				content += "<td>" + entidade["tempoEntreChegadas"].toFixed(5) + "</td>";
			}
		   	content += "<td>" + entidade["tempoChegada"].toFixed(5) + "</td>";
		   	content += "<td>" + entidade["tempoServicoInicial"].toFixed(5) + "</td>";
		   	content += "<td>" + entidade["tempoServico"].toFixed(5) + "</td>";
		   	content += "<td>" + entidade["tempoServicoFinal"].toFixed(5) + "</td>";
		   	content += "<td>" + entidade["tempoFila"].toFixed(5) + "</td>";
			content += "</tr>";
			$tbody.append(content);
		});

		$tbody.append('<tr><td colspan="7"><span class="pull-right">Tempo total de fila: '+ tabelaSistema.retornaTempoTotalFila().toFixed(5) +'</span></td></tr>');
	}
}