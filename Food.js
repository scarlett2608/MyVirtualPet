class Food {

    constructor(){
        this.image = loadImage('Milk.png');

    }

    getFoodStock(){
        return foodStock;
    }

    updateFoodStock(foodStock){
        database.ref('/').update({

            Food:foodStock

        })
    }
      
  
    

    display(){
        var x=80,y=100;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<foodStock;i++){
        if(i%10==0){
          x=80;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
    

  }
}