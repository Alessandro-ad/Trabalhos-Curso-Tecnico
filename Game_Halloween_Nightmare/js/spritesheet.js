function Spritesheet(context, imagem, linhas, colunas, largura, altura, direcaosp) { 
   this.context = context; 
   this.imagem = imagem; 
   this.numLinhas = linhas; 
   this.numColunas = colunas; 
   this.intervalo = 0; 
   this.linha = 0; 
   this.coluna = 0; 
   this.largura = largura;
   this.altura = altura;
   this.direcaosp = direcaosp;
} 
Spritesheet.prototype = { 
   proximoQuadro: function() {
      var agora = new Date().getTime(); 

      // Se ainda não tem último tempo medido 
      if (! this.ultimoTempo) this.ultimoTempo = agora; 

      // Verificação da mudança de coluna
      if (agora - this.ultimoTempo < this.intervalo) return;

	  if(this.direcaosp == 1){
		  if (this.coluna < this.numColunas - 1) 
			this.coluna++; 
		  else 
			this.coluna = 0;
	  } else{
			if (this.linha < this.numLinhas - 1) 
				this.linha++; 
			else 
				this.linha = 0;
	  }

      // Guardar hora da última mudança
      this.ultimoTempo = agora;
   },
   desenhar: function(x, y) {
      var largSprite = this.imagem.width / this.numColunas; 
      var altuSprite = this.imagem.height / this.numLinhas; 

      this.context.drawImage( 
         this.imagem, 
         largSprite * this.coluna, 
         altuSprite * this.linha, 
         largSprite, 
         altuSprite, 
         x, 
         y, 
         this.largura, 
         this.altura 
      ); 
   }
}
