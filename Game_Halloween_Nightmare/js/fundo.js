var movimentaCima = false;
var movimentaBaixo = false;
var movimentaEsquerda = false;
var movimentaDireita = false;


function Fundo(context, personagem, imagem) { 
   this.context = context; 
   this.imagem = imagem;
   this.x = 0; 
   this.y = 0; 
   this.personagem = personagem;
   this.desloc = this.personagem.velocidade;
   
   this.visible = true;
   
   this.largura = 276;
   this.altura = 266;
} 

Fundo.prototype = { 
   atualizar: function() { 
   
	
	
	
	if(this.personagem.andando && this.personagem.DIREITA){
		if(this.personagem.x + this.personagem.largura + 500 > 700){
			this.x += this.desloc;
			this.movimentaDireita = true;
		}
	}
	else if(this.personagem.andando && this.personagem.ESQUERDA){
		if(this.personagem.x -420 < 0){
			this.x -= this.desloc;
			this.movimentaEsquerda = true;
		}
	}
	else if(this.personagem.andando && this.personagem.CIMA){
		if(this.personagem.y -250 < 0){
			this.y -= this.desloc;
			this.movimentaCima = true;
		}
	}
	else if(this.personagem.andando && this.personagem.BAIXO){
		if(this.personagem.y + this.personagem.altura +  230 > context.canvas.height){
			this.y += this.desloc;
			this.movimentaBaixo = true;
		}
	}else{		
		this.movimentaCima = false;
		this.movimentaBaixo = false;
		this.movimentaEsquerda = false;
		this.movimentaDireita = false;
	}
	

   }, 
   desenhar: function() { 
		
		this.context.drawImage( 
         this.imagem, 
         this.largura + this.x, 
         this.altura + this.y, 
         this.largura, 
         this.largura, 
         0, 
         0, 
         context.canvas.width, 
         context.canvas.height 
      );	  
	  
	
   } 
}
