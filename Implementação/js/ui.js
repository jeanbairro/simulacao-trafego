var UI = function(context) {
	var _context = context;

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

	this.desenharEstrada = function() {
		var img = new Image();
		img.onload = function () {
		    _context.drawImage(img, 0, 0);
		}
		img.src = "img/road.png";
	}

	this.desenharSimulacao = function(tabelaSistema) {
		var start = null;

		var VELOCIDADE = 1;
		var x = 0;

		function step(timestamp) {
			if (!start) start = timestamp;
			var progress = timestamp - start;
			if (progress < 12000) {
				window.requestAnimationFrame(step);
			}

			_context.fillStyle = "#c6c6c6";
			_context.fillRect(x-1,34,15,15);
			
			_context.fillStyle = "#000";
			_context.fillRect(x,34,15,15);

			x += VELOCIDADE;
		}

		window.requestAnimationFrame(step);
	}
}