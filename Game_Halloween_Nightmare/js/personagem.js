


var disparou = false;
var cont = 60;

function Personagem(context, teclado, imagem, larg, altu, dirLeitura, c, a, s) { 
   this.context = context; 
   this.teclado = teclado; 
    
   this.velocidade = 2;
   this.largura = larg;
   this.altura = altu;
   this.colisor = c;
   this.animacao = a;
   this.status = s;
   

   // Criando a spritesheet a partir da imagem recebida
   this.sheet = new Spritesheet(context, imagem, 4, 5, larg, altu, dirLeitura);
   this.sheet.intervalo = 55;

   // Estado inicial
   this.andando = false;
	this.DIREITA = true;
	this.ESQUERDA = false;
	this.CIMA = false;
	this.BAIXO = false;
  
   
   this.visible = true;
   
  
   
} 
Personagem.prototype = { 
   atualizar: function() { 

	 if (this.teclado.pressionada(SETA_CIMA)) {
         if (!this.andando && !disparou) {
			this.CIMA = true;
			this.DIREITA = false;
			this.ESQUERDA = false;
			this.BAIXO = false;
			
            this.sheet.linha = 0; 
            this.sheet.coluna = 3;
			
         } 

		 if(!disparou){
			this.andando = true;
			this.sheet.proximoQuadro();
			if(this.y > 170)
				this.y -= this.velocidade; 
		}else{
			 this.andando = false;
		}			
		
      } else if (this.teclado.pressionada(SETA_BAIXO)) {
         if (!this.andando && !disparou) {
			this.BAIXO = true;
			this.CIMA = false;
			this.DIREITA = false;
			this.ESQUERDA = false;
			
            this.sheet.linha = 0;  
            this.sheet.coluna = 1;
         } 

		if(!disparou){
			this.andando = true;
			this.sheet.proximoQuadro();
			if(this.y + this.altura < 300)
				this.y += this.velocidade;  
		}else{
			 this.andando = false;
		}
		
      }else if (this.teclado.pressionada(SETA_DIREITA)) {
         if (!this.andando && !disparou) {
			this.DIREITA = true;
			this.BAIXO = false;
			this.CIMA = false;
			this.ESQUERDA = false;
            
            this.sheet.linha = 0;
            this.sheet.coluna = 2;
         }

		 if(!disparou){
			this.andando = true;
			this.sheet.proximoQuadro();
			if(this.x + this.largura < 500)
				this.x += this.velocidade;
		}else{
			 this.andando = false;
		 }
		
		
      }else if (this.teclado.pressionada(SETA_ESQUERDA)) {
         if (!this.andando && !disparou) {
			this.ESQUERDA = true;
			this.DIREITA = false;
			this.BAIXO = false;
			this.CIMA = false;
			
            this.sheet.linha = 0;  
            this.sheet.coluna = 4;
         } 

         
		 if(!disparou){
			this.andando = true;
			this.sheet.proximoQuadro();
			if(this.x > 350)
				this.x -= this.velocidade;  
		 }else{
			 this.andando = false;
		 }
		 
	  } 

      else { 
		disparou = false;
         
         this.andando = false; 
	  }
   }, 
   
   retangulosColisao: function() {
      var rets = [{x: this.x+32, y: this.y+20, largura: 30, altura:  70}];
	  
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

		if(this.status.vida > 0){
			if(sprite instanceof Zumbi){
				var aux = sprite.attack - sprite.attack*this.status.defense/100;
				this.status.vida -=  Math.round(aux);
			}
	   
			if(sprite instanceof Ogro){
				var aux = sprite.attack - sprite.attack*this.status.defense/100;
				this.status.vida -=  Math.round(aux);
			}
			
			if(sprite instanceof Aranha){
				var aux = sprite.attack - sprite.attack*this.status.defense/100;
				this.status.vida -=  Math.round(aux);
			}
			
			if(sprite instanceof ChefeUm){
				var aux = sprite.attack - sprite.attack*this.status.defense/100;
				this.status.vida -=  Math.round(aux);
			}
	   }
	   
	   
			
			if(sprite instanceof Bloco){
				
			if(this.ESQUERDA && this.x+62 > sprite.x + sprite.largura){
				this.x += this.velocidade;
				this.andando = false;
			}
			
			else if(this.DIREITA && this.x+62 < sprite.x + sprite.largura){
				this.x  -= this.velocidade;
				this.andando = false;
			}
			
			else if(this.CIMA && this.y+90 > sprite.y + sprite.altura){
				this.y += this.velocidade;
				this.andando = false;
			}
			
			else if(this.BAIXO && this.y < sprite.y + sprite.altura){
				this.y  -= this.velocidade;
				this.andando = false;
			} else
				this.andando = true;
			
			}
   },
   
   atirar: function(){
	    disparou = true;
		var personDir = 1;
		var px  = 0;
		var py = 0;
		var dir = 0;
		
		if(this.ESQUERDA){
			px = this.x - 25;
			py = this.y +25;
			
			this.sheet.linha = 0;
			this.sheet.coluna = 0; 				
		}else
		
		if(this.CIMA){
			personDir = 0;
			px = this.x +23;
			py = this.y - 10;
			dir = 1;
			
			this.sheet.linha = 2;
			this.sheet.coluna = 0; 
		} else
		if(this.DIREITA){
			personDir = 3;
			px = this.x  +80;
			py = this.y +25;
			dir = 2;
			
			this.sheet.linha = 1;
			this.sheet.coluna = 0; 
		}else
		if(this.BAIXO){
			personDir = 2;
			px = this.x+38;
			py = this.y +60;
			dir = 3;
			
			this.sheet.linha = 3;
			this.sheet.coluna = 0; 
		}
		
		var m = new Municao(context, this, personDir, 40, 35, px, py, 1, 4, 0, dir);
		this.animacao.novoSprite(m);
		this.colisor.novoSprite(m);

   },
   
   
   
   desenhar: function() { 
   
      this.sheet.desenhar(this.x, this.y);    
	 
   } 
}
