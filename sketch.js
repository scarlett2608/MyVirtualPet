//Variables
  //database
    var database;
  //food
    var foodStock,feed,addFood,lastFed,foodObj,fedTime,FoodStockref,foods,Foods;
  //dog Images  
    var dog_img,happyDog;
  //dog sprite
    var dog;
  //time
    var hour,currentTime;
  //gameState
    var gameState , gameStateRef;
  //backgrounds
    var bedroom,bathroom,garden,livingroom;
  //form
    var title,state,step,push;

function preload()
{
  dog_img = loadImage('Dog.png');
  happyDog = loadImage('Happy.png');
  bedroom = loadImage('Bed Room.png');
  bathroom = loadImage('Wash Room.png');
  garden = loadImage('Garden.png');
  Livingroom = loadImage('LivingRoom.png');

}

function setup() {
  createCanvas(600, 900);

  
  
  database = firebase.database();
  FoodStockref = database.ref('Food');
  FoodStockref.on('value',function(data){
      foodStock = data.val();
  });

  gameStateRef = database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });
  
  dog = createSprite(300,700);
  dog.addImage(dog_img);
  dog.scale = 0.5;
  

  foodObj = new Food();
  
  feed = createButton('Feed');
  feed.position(550,105);
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(450,105);
  addFood.mousePressed(AddFood);

  


}


function draw() {  
  background('darkcyan');

  currentTime = hour();
  drawSprites();
  
  
  

  fedTime = database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed = data.val();

  });
  

  

  if(currentTime == lastFed + 1){

    foodObj.livingroom();
    foodObj.update('Resting');

  }

  else if(currentTime == lastFed + 2){

    foodObj.update('Playing');
    foodObj.garden();

  }

  else if(currentTime == lastFed + 3){

    foodObj.bathroom();
    foodObj.update('Bathing');

  }

  else if(currentTime == lastFed + 4){

    foodObj.bedroom();
    foodObj.update('Sleeping');

  }

  else if(currentTime == lastFed + 5) {

    background('darkcyan');
    foodObj.update('Hungry');
    
  }
  if( gameState != 'Hungry'){

      feed.hide();
      addFood.hide();

    }

    else{

      feed.show();
      addFood.show();
      foodObj.display();
  
      fill(0,5,0);
  textSize(25);
  text('Food Remaining: '+foodStock,150,400);

  if (lastFed>=12) {
    text('Last Feed : '+ lastFed%12+'PM',350,70);
    showError();
  }
  else if(lastFed==0){
    text('Last Feed : 12 AM',350,70);
    showError();
  }
  else{
    text('Last Feed : '+ lastFed+'AM',350,70);
    showError();
  }

    }

  
  
  foodObj.form();
  
    
  
  

}

function showError(){
  console.log('ERROR IN WRITING TO THE DATABASE');
}

function keyPressed(){

  if (keyDown(UP_ARROW)) {

    writeStock(foodStock);
    dog.addImage(happyDog);
    
  }
}

  function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
 
   x = x - 1
  if(x < 0){
  x = 0
  }

  database.ref('/').update({

    Food:x

  });
}

function feedDog(){
  if(foodStock>0){  
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour(),
      gameState:gameState
  });

  }
  
}



function AddFood(){
  if(foodStock<30){
  foodStock++
  }
  database.ref('/').update({
    Food:foodStock
  })
}

/*Mam I have Changed the game a bit...So if current time is 1 more than lastFed,
 the dog is in the living room and the gameState is Resting. If it is 2 more than the lastFed, the dog
 is in the garden and gameState is playing. If it is 3 more than the lastFed, the dog is in the 
 washroom and the gameState is bathing. If it is 4 more than the lastFed, the dog is in the Bedroom 
 and the gameState is sleeping.
 I hope it is Okay....*/



