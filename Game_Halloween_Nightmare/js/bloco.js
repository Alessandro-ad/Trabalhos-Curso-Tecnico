
function Bloco(context, fundo, x, y, larg, altu, tipo){
	this.x = x;
	this.y = y;
	this.largura = larg;
	this.altura = altu;
	this.context = context;
	this.fundo = fundo;
	this.tipo = tipo;
	
	this.deslocY = this.fundo.desloc*1.8
	this.deslocX = this.fundo.desloc*2.9;
	
	this.movimentarTela = true;
}

Bloco.prototype = {
	atualizar: function() {
		
		
		if(this.movimentarTela){
		if(this.fundo.movimentaCima){
			this.y += this.deslocY;
		}
		if(this.fundo.movimentaBaixo){
			this.y -= this.deslocY;
		}
		if(this.fundo.movimentaEsquerda){
			this.x += this.deslocX;
		}
		if(this.fundo.movimentaDireita){
			this.x -= this.deslocX;
		}
		}
	},
	
   retangulosColisao: function() {
      var rets = [
         {
           x: this.x, y: this.y, largura: this.largura, altura:  this.altura
         }
      ];
	  
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
	   

   },
   
   desenhar: function() { 
	
				
   } 
	
}