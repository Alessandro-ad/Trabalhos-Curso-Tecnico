var deslocY = 0;
var deslocX = 0;

function ChefeUm(context, personagem, fundo, larguraIni, alturaIni, posInicX, posInicY, linhas, colunas, leitura, dificult) { 
   this.context = context; 
   this.personagem = personagem; 
   this.fundo = fundo;
   this.x = posInicX; 
   this.y = posInicY; 
   this.largura = larguraIni;
   this.altura = larguraIni;
   this.vida = 900;
   this.vidaInic = this.vida;
   
   this.velocidade = 15;
   this.context = context;
   
   this.direcaoCima = false;
   this.direcaoBaixo = true;
   this.direcaoEsquerda = false;
   this.direcaoDireita = false;
   
   this.cont = 50;

   deslocY = this.fundo.desloc*1.8;
   deslocX = this.fundo.desloc*2.9;
   
   this.imgOgro = new Image();
   this.imgOgro.src = 'images/aranha.png';
   
   this.sheet = new Spritesheet(context, this.imgOgro, linhas, colunas, larguraIni, alturaIni, leitura);
   this.sheet.intervalo = 50;
   this.sheet.linha = 0;  
   this.sheet.coluna = 0;
   
   this.andando = false;
   this.visible = true;
   this.persegue = false; 
   
   this.attack = 10;
} 
ChefeUm.prototype = { 
   atualizar: function() { 		
		
   
		if(this.fundo.movimentaCima){
			this.y += deslocY;
		}
		if(this.fundo.movimentaBaixo){
			this.y -= deslocY;
		}
		if(this.fundo.movimentaEsquerda){
			this.x += deslocX;
		}
		if(this.fundo.movimentaDireita){
			this.x -= deslocX;
		}
		
		this.verificarPerimetro();
		
		
		
		if(this.persegue){
		if(this.direcaoEsquerda){
			this.sheet.proximoQuadro();
			this.x -= this.velocidade;
		} else if(this.direcaoDireita){
			this.sheet.proximoQuadro();
			this.x += this.velocidade;		
		} else if(this.direcaoCima){
			this.sheet.proximoQuadro();
			this.y -= this.velocidade;
			
		} else if(this.direcaoBaixo){
			this.sheet.proximoQuadro();
			this.y += this.velocidade;
		}
		
		else{
			this.sheet.coluna = 0;
		}
		
   }
   }, 
   
   
   
   
   retangulosColisao: function() {
	   var rets = [];
	   
		if(this.direcaoEsquerda || this.direcaoDireita)
		  rets = [{x: this.x + 40, y: this.y +45, largura: 130, altura:  110}];
		else if(this.direcaoCima)
		  rets = [{x: this.x + 45, y: this.y +40, largura: 120, altura:  130}];
		else if(this.direcaoBaixo)
		  rets = [{x: this.x + 45, y: this.y +40, largura: 120, altura:  110}];
	   
	  /*
	  var ctx = this.context;
      
      for (var i in rets) {
         ctx.save();
         ctx.strokeStyle = 'yellow';
         ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
                        rets[i].altura);
         ctx.restore();
      }*/
	  
	  return rets;
   },
   colidiuCom: function(sprite) {  
		if(sprite instanceof Bloco){
			if(sprite.tipo == 0){
			if(this.x > sprite.x && this.direcaoEsquerda)
				this.x += this.velocidade;
			
			else if(this.x < sprite.x && this.direcaoDireita)
				this.x  -= this.velocidade;
			
			else if(this.y > sprite.y && this.direcaoCima)
				this.y += this.velocidade;
			
			else if(this.y < sprite.y && this.direcaoBaixo)  
				this.y  -= this.velocidade;
			}
		}
		
		if(sprite instanceof Municao){
			
			this.vida -=  personagem.status.attack*0.6;
			
		}
		
		if(dificult){
			if(sprite instanceof Personagem)
				if(this.vida < this.largura)
					this.vida += 2;
		}
   },
   
    verificarVida: function(){
		if(this.vida > 0){
				var n = 190*this.vida/this.vidaInic;
			
				var c = context;
				c.beginPath()				
				c.lineTo(this.x, this.y)
				c.lineTo(this.x + n, this.y)
				c.lineTo(this.x + n, this.y - 10)
				c.lineTo(this.x, this.y - 10)
				c.lineTo(this.x, this.y)
				c.fillStyle='rgb(200, 30, 30)'
				c.fill()
				c.strokeStyle='black'
				c.stroke()
		} else{
			this.visible = false;
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
			this.personagem.status.exp += 100;
			this.personagem.monstros--;
		}
   },
   
   mudarDirecao: function(dir, linha, coluna){
		this.sheet.linha = linha;  
		this.sheet.coluna = coluna;
		switch(dir){
			case 0:
				this.direcaoEsquerda = true;
				this.direcaoCima = false;
				this.direcaoDireita = false;
				this.direcaoBaixo = false;
			break;
			case 1:
				this.direcaoEsquerda = false;
				this.direcaoCima = true;
				this.direcaoDireita = false;
				this.direcaoBaixo = false;
			break;
			case 2:
				this.direcaoEsquerda = false;
				this.direcaoCima = false;
				this.direcaoDireita = true;
				this.direcaoBaixo = false;
			break;
			case 3:
				this.direcaoEsquerda = false;
				this.direcaoCima = false;
				this.direcaoDireita = false;
				this.direcaoBaixo = true;
			break;
			default:
			break;
	   }
   },
   
   verificarPerimetro: function(){
	   var px = this.personagem.x;
	   var py = this.personagem.y;
	   var pl = this.personagem.largura;
	   var pa = this.personagem.altura;
	   
	   // perseguir esquerda
		var pergEsc =  (px + pl > this.x - 360) && 
						px + pl < this.x + this.largura &&
						py > this.y - 90 && py < this.y  + 90;
						
		// perseguir direita
		var pergDir =  (px + pl < this.x + this.largura + 400) && 
						px + pl > this.x + this.largura &&
						py > this.y - 60 && py < this.y  + 100;	

		// perseguir cima
		var pergCima =  (py + pa > this.y - 360) && 
						py + pa < this.y + this.altura &&
						px > this.x - 60 && px < this.x + 50;	
						
		// perceguir baixo
		var pergBaixo = (py + pa < this.y + this.altura + 300) && 
						py + pa > this.y + this.altura &&
						px > this.x - 60 && px < this.x + 50;
		
	   if(pergEsc){
			if(!this.persegue)
				this.mudarDirecao(0, 1, 0);
			this.persegue = true;
		   
	   } else if(pergDir){
			if(!this.persegue)
				this.mudarDirecao(2, 2, 0);
			this.persegue = true;
		   
	   }else if(pergBaixo){
			if(!this.persegue)
				this.mudarDirecao(3, 0, 0);
			this.persegue = true;
	   }else if(pergCima){
			if(!this.persegue)
				this.mudarDirecao(1, 3, 2);
			this.persegue = true;
	   }else
			this.persegue = false;
   },
   
   desenhar: function() { 
      this.sheet.desenhar(this.x, this.y);
	  this.verificarVida();
   } 
}
