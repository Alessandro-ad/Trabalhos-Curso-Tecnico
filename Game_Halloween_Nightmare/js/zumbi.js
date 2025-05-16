var deslocY = 0;
var deslocX = 0;

function Zumbi(context, personagem, fundo, larguraIni, alturaIni, posInicX, posInicY, linhas, colunas, leitura, move, dificult) { 
   this.context = context; 
   this.personagem = personagem; 
   this.fundo = fundo;
   this.x = posInicX; 
   this.y = posInicY; 
   this.largura = larguraIni;
   this.altura = larguraIni;
   
   
   this.vida = 200;
   this.vidaInic = this.vida;
   
   this.velocidade = 1;
   this.context = context;
   
   this.direcaoCima = false;
   this.direcaoBaixo = false;
   this.direcaoEsquerda = true;
   this.direcaoDireita = false;
   this.move = move;
   
   this.cont = 50;

   deslocY = this.fundo.desloc*1.8;
   deslocX = this.fundo.desloc*2.9;
   
   this.imgZumbi = new Image();
   this.imgZumbi.src = 'images/spritezumbi.png';
   
   this.sheet = new Spritesheet(context, this.imgZumbi, linhas, colunas, larguraIni, alturaIni, leitura);
   this.sheet.intervalo = 150;
   this.sheet.linha = 1;  
   this.sheet.coluna = 4;
   
   this.andando = false;
   this.visible = true;
   this.persegue = false; 
   
   this.attack = 3;
} 
Zumbi.prototype = { 
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
		
		
		
		if(this.direcaoEsquerda){
			if(!this.persegue && this.move){
				if(this.cont > 0)
					this.cont--;
				else{
					this.cont = 50;
					this.mudarDirecao(1, 1, 2);
				}
			}
			this.sheet.proximoQuadro();
			if(this.persegue)
				this.x -= this.velocidade;
			else 
				this.x -= 1;
			
		} else if(this.direcaoCima){
			if(!this.persegue && this.move){
				if(this.cont > 0)
					this.cont--;
				else{
					this.cont = 50;
					this.mudarDirecao(2, 1, 5);
				}
			}
			this.sheet.proximoQuadro();
			if(this.persegue)
				this.y -= this.velocidade;
			else
				this.y -= 1;
			
		} else if(this.direcaoDireita){
			if(!this.persegue && this.move){
				if(this.cont > 0)
					this.cont--;
				else{
					this.cont = 50;
					this.mudarDirecao(3, 1, 0);
				}
			}
			this.sheet.proximoQuadro();
			if(this.persegue)
				this.x += this.velocidade;
			else
				this.x += 1;
		
		} else if(this.direcaoBaixo){
			if(!this.persegue && this.move){
				if(this.cont > 0)
					this.cont--;
				else{
					this.cont = 50;
					this.mudarDirecao(0, 1, 4);
				}
			}	
			this.sheet.proximoQuadro();
			if(this.persegue)
				this.y += this.velocidade;	
			else			
				this.y += 1;
			
		} else{
			this.sheet.linha = 0;
		}
		
   
   
   }, 
   
   
   
   
   retangulosColisao: function() {
      var rets = [];
	  
	 
        
	 if(this.direcaoBaixo)
         rets = [{ x: this.x+5, y: this.y, largura: 45, altura:  90}];
	 else
		 rets = [{x: this.x+30, y: this.y, largura: 35, altura:  90}];
	  
	  /*var ctx = this.context;
      
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
			if(this.x > sprite.x && this.direcaoEsquerda)
				this.x += this.velocidade;
			
			else if(this.x < sprite.x && this.direcaoDireita)
				this.x  -= this.velocidade;
			
			else if(this.y > sprite.y && this.direcaoCima)
				this.y += this.velocidade;
			
			else if(this.y < sprite.y && this.direcaoBaixo)  
				this.y  -= this.velocidade;
		}
		
		if(sprite instanceof Municao){
			
			this.vida -=  personagem.status.attack * 2;
			
		}
		
		if(dificult){
			if(sprite instanceof Personagem)
				if(this.vida < this.largura)
					this.vida += 1;
		}
   },
   
    verificarVida: function(){
		if(this.vida > 0){
				var n = 110*this.vida/this.vidaInic;

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
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
			this.personagem.status.monstros++;
			this.personagem.status.exp += 2;
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
		var pergEsc =  (px + pl > this.x - 80) && 
						px + pl < this.x + this.largura &&
						py > this.y - 30 && py < this.y  + 50;
						
		// perseguir direita
		var pergDir =  (px + pl < this.x + this.largura + 200) && 
						px + pl > this.x + this.largura &&
						py > this.y - 30 && py < this.y  + 50;	

		// perseguir cima
		var pergCima =  (py + pa > this.y - 80) && 
						py + pa < this.y + this.altura &&
						px > this.x - 30 && px < this.x + 20;	
						
		// perceguir baixo
		var pergBaixo = (py + pa < this.y + this.altura + 200) && 
						py + pa > this.y + this.altura &&
						px > this.x - 30 && px < this.x + 20;
		
	   if(pergEsc){
			if(!this.persegue)
				this.mudarDirecao(0, 1, 4);
			this.persegue = true;
		   
	   } else if(pergDir){
			if(!this.persegue)
				this.mudarDirecao(2, 1, 5);
			this.persegue = true;
		   
	   }else if(pergBaixo){
			if(!this.persegue)
				this.mudarDirecao(3, 1, 0);
			this.persegue = true;
	   }else if(pergCima){
			if(!this.persegue)
				this.mudarDirecao(1, 1, 2);
			this.persegue = true;
	   }else{
			this.persegue = false;
			if(!this.move){
				this.direcaoEsquerda = false;
				this.direcaoCima = false;
				this.direcaoDireita = false;
				this.direcaoBaixo = false;
			}
	   }
   },
   
   desenhar: function() { 
      this.sheet.desenhar(this.x, this.y);
	  this.verificarVida();
   } 
}
