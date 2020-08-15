class Food {

    constructor(){
        this.image = loadImage('Food Stock.png');

    }

    getFoodStock(){
        return foodStock;
    }

    updateFoodStock(foodStock){
        database.ref('/').update({

            Food:foodStock

        })
    }

    bedroom(){
      background(bedroom,550,500);
      dog.visible = false;
    }

    garden(){
      background(garden,550,500);
      dog.visible = false;
    }

    bathroom(){
      background(bathroom,550,500);
      
      dog.visible = false;
    }

    livingroom(){
      background(Livingroom,550,500);
      
      dog.visible = false;
    }
      
  
    

    display(){
        var x=80,y=100;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<foodStock;i++){
        if(i%10==0){
          x=75;
          y=y+70;
        }
        image(this.image,x,y,50,50);
        x=x+50;
      }
    }

    
    

  }

   form(){
    title = createElement('h1');
        title.html('My Virtual Pet');
        title.position(130,40);
        
        textSize(20);
        text("GAMESTATE: "+gameState,170,30);
        
        
  }



  update(GAMESTATE){
    gameState = GAMESTATE;
    database.ref('/').update({
      gameState:gameState
    })
  }
  
}