
function Municao(context, personagem, pdir, largura, altura, x, y, linhas, colunas, leitura, dir){
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.context = context;
	this.personagem = personagem;
	
	this.imgMunicao = new Image();
	this.imgMunicao.src = 'images/municao.png';
	
	this.sheet = new Spritesheet(context, this.imgMunicao, linhas, colunas, largura, altura, leitura);
	this.sheet.coluna = pdir;
	
	//this.validaDir = false;
	this.velocidade = 20;
	this.direcao = dir;
	
	this.deslocX = this.personagem.velocidade * 3.15 *0.25;
	this.deslocY = this.personagem.velocidade * 2 *0.25;
	
	
}

Municao.prototype = {
	atualizar: function() {
	/*if (this.x > 300) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
     }*/
		
	if(this.personagem.andando && this.personagem.DIREITA){
			
			this.x -= this.deslocX;
			
		
	}
	else if(this.personagem.andando && this.personagem.ESQUERDA){
			
			this.x += this.deslocX;
			
		
	}
	else if(this.personagem.andando && this.personagem.CIMA){
		
			this.y += this.deslocY;
		
		
	}
	else if(this.personagem.andando && this.personagem.BAIXO){
			
			this.y -= this.deslocY;
		
		
	}
		
		
		
	switch(this.direcao){
		case 0: this.x -= this.velocidade;
		break;
		case 1: this.y -= this.velocidade;
		break;
		case 2: this.x += this.velocidade;
		break;
		case 3: this.y += this.velocidade;
		break;
		default:
		break;
	}
		
		
		
		
		
	},
	
   retangulosColisao: function() {
	   
		
	   var rets = [];
	   if(this.personagem.DIREITA || this.personagem.ESQUERDA){
      var rets = [{ x: this.x, y: this.y+15, largura:20, altura:  10}];
	   } else if(this.personagem.CIMA){
		   var rets = [{ x: this.x + 15, y: this.y + 5, largura: 8, altura:  30}];
	   } else{
		  var rets = [{ x: this.x + 8, y: this.y + 5, largura: 8, altura:  25}]; 
		   
	   }
	   this.validaDir = true;
		
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
	   
		if(sprite instanceof  Bloco)
			if(sprite.tipo == 0){
				this.animacao.excluirSprite(this);
				this.colisor.excluirSprite(this);
				
			}
			
			
		if(!(sprite instanceof Personagem) && !(sprite instanceof Municao)){
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
		
		
		
		
				
	
	   
		 //  this.movimentarTela = false;
			
      /*if (this.x < sprite.x)  // Estou na esquerda
         this.velocidadeX = -Math.abs(this.velocidadeX);  // -
      else
         this.velocidadeX = Math.abs(this.velocidadeX);   // +
 
      if (this.y < sprite.y)  // Estou acima
         this.velocidadeY = -Math.abs(this.velocidadeY);  // -
      else
         this.velocidadeY = Math.abs(this.velocidadeY);   // +*/
   },
   
   
   
   desenhar: function() { 
		this.sheet.desenhar(this.x, this.y);
				
   } 
	
}