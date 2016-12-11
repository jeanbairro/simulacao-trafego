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

	var carregarImagens = function(sources, callback) {
		var images = {};
		var loadedImages = 0;
		var numImages = 0;
		
		for(var src in sources) {
		  numImages++;
		}
		
		for(var src in sources) {
		  images[src] = new Image();
		  images[src].onload = function() {
		    if(++loadedImages >= numImages) {
		      callback(images);
		    }
		  };
		  images[src].src = sources[src];
		}
	}

	this.desenharEstrada = function() {
		var sources = {
        	road_1: 'img/road_1.png',
        	road_2: 'img/road_2.png',
        	road_3: 'img/road_3.png'
      	};

		carregarImagens(sources, function(imagens){
			_context.drawImage(imagens.road_1, 0, 0);
        	_context.drawImage(imagens.road_2, 0, 55);
        	_context.drawImage(imagens.road_3, 0, 110);
		});
	}

	this.desenharSimulacao = function(tabelaSistema) {
		var start = null;
		var carros = [];
		var proporcao = 5;
		var largura_carro = 1.9 * proporcao;
		var comprimento_carro = 4 * proporcao;
		var distancia_minima = 1 * proporcao;
		var estrada = new Estrada(comprimento_carro);

		var tempoSistema = 0;
		tabelaSistema.entidades.forEach(function(entidade, i) {
			tempoSistema += entidade.tempoEntreChegadas;
			carros.push(new Carro(i, tempoSistema));
		});

		var VELOCIDADE = 1;

		function step(timestamp) {
			setTimeout(function(){
				if (!start) start = timestamp;
				var progress = timestamp - start;
				if (progress < 1200000) { /* Vinte minutos */
					window.requestAnimationFrame(step);
				}

				carros.forEach(function(carro, i, array) {
					if (carro.tempoEntradaSistema < progress && !carro.jaAcabouOPercurso) {
						_context.fillStyle = "#c6c6c6";
						_context.fillRect(carro.x-VELOCIDADE, carro.y, comprimento_carro, largura_carro+1);
						
						_context.fillStyle = "red";
						_context.fillRect(carro.x, carro.y, comprimento_carro, largura_carro);
						
						if (carro.paradoDesmoronamento || carro.paradoTpa || carro.parado) {
							if (carro.paradoDesmoronamento) {
								if (progress > (carro.tempoParadaDesmoronamento + 5000)) {
									carro.paradoDesmoronamento = false;
									carro.x += VELOCIDADE;
								}
							} else if (carro.paradoTpa) {
								if (progress > (carro.tempoParadaTpa + 7000)) {
									carro.paradoTpa = false;
									carro.x += VELOCIDADE;
								}
							} else {
								if (array[i-1].x - carro.x > comprimento_carro+distancia_minima) {
									carro.parado = false;
									carro.x += VELOCIDADE;
								}
							}
						} else {
							carro.x += VELOCIDADE;	
						}

						if (carro.y === estrada.CentroPistaParte1 && carro.x === estrada.PontoDesmoronamento && !carro.paradoDesmoronamento) {
							carro.paradoDesmoronamento = true;
							carro.tempoParadaDesmoronamento = progress; 
						} else if (carro.y === estrada.CentroPistaParte3 && carro.x === estrada.PontoTpa && !carro.paradoTpa) {
							carro.paradoTpa = true;
							carro.tempoParadaTpa = progress; 
						} else if (array[i-1] && !array[i-1].jaAcabouOPercurso && array[i-1].y == carro.y && array[i-1].x - carro.x < comprimento_carro+distancia_minima) {
							carro.parado = true;
						} else if (carro.y === estrada.CentroPistaParte1 && carro.x === estrada.Limite) {
							_context.fillStyle = "#c6c6c6";
							_context.fillRect(estrada.Limite-VELOCIDADE, estrada.CentroPistaParte1, comprimento_carro, largura_carro+1);	
							carro.y = estrada.CentroPistaParte2;
							carro.x = 0;
						} else if (carro.y === estrada.CentroPistaParte2 && carro.x === estrada.Limite) {
							_context.fillStyle = "#c6c6c6";
							_context.fillRect(estrada.Limite-VELOCIDADE, estrada.CentroPistaParte2, comprimento_carro, largura_carro+1);	
							carro.y = estrada.CentroPistaParte3;
							carro.x = 0;
						} else if (carro.y === estrada.CentroPistaParte3 && carro.x === estrada.Limite) {
							_context.fillStyle = "#c6c6c6";
							_context.fillRect(estrada.Limite-VELOCIDADE, estrada.CentroPistaParte3, comprimento_carro, largura_carro+1);
							carro.jaAcabouOPercurso = true;
						}
					}
				});
			});
		}

		window.requestAnimationFrame(step);
	}
}	