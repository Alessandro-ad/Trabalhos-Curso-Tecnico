
function Status(context){
	
	this.context = context;
	
	
	this.vida = 300;
	this.vidaInic = this.vida;
	this.attack = 2;
	this.defense = 3;
	this.exp = 0;
	this.monstros = 0;
	this.level = 1;
	this.expLevel = 12;
}

Status.prototype = {
	atualizar: function() {
		if(this.exp >= this.expLevel)
			this.upLevel();
		
	},
	
	upLevel: function(){
		this.expLevel += 12 + this.level*2;
		this.vidaInic += 70;
		this.vida = this.vidaInic;
		this.attack += 1;
		this.defense += 1;
		this.level++;
	},
	
	desenharStatus: function(){
	   var c = this.context;

				c.fillStyle = "rgb(50, 220, 40";
				c.font="bold 23px Comic Sans MS";
				c.fillText("You",40,20);
				c.strokeText("You",40,20);
				
				
				c.font="bold 18px Comic Sans MS";
				c.fillText("Lv "+this.level,10,40);
				c.strokeText("Lv "+this.level,10,40);
				
				c.fillText("HP "+this.vida+"/"+this.vidaInic,10,60);
				c.strokeText("HP "+this.vida+"/"+this.vidaInic,10,60);
				
				c.fillText("Attack "+this.attack,10,95);
				c.strokeText("Attack "+this.attack,10,95);
				
				c.fillText("Defense "+this.defense,10,115);
				c.strokeText("Defense "+this.defense,10,115);
				
				c.fillText("Exp "+this.exp,10,135);
				c.strokeText("Exp "+this.exp,10,135);
				
				var n = 110*this.vida/this.vidaInic;
				
				c.beginPath()				
				c.lineTo(10, 65)
				c.lineTo(n + 10, 65)
				c.lineTo(n + 10, 77)
				c.lineTo(10, 77)
				c.lineTo(10, 65)
				//c.fillStyle='rgb(30, 230, 30)'
				c.fill()
				c.strokeStyle='black'
				c.stroke()	
				
				
				c.restore();	   
   },
   
   desenhar: function() { 
				this.desenharStatus();
   } 
}