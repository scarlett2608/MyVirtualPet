//Variables
var dog,dog_img,happyDog,database,foodStock;
var feed,addFood,lastFed,foodObj,fedTime;
var hour;


function preload()
{
  dog_img = loadImage('dog.png');
  happyDog = loadImage('happyDog.png');
}

function setup() {
  createCanvas(1000, 1000);
  
  database = firebase.database();
  var FoodStockref = database.ref('Food');
  FoodStockref.on('value',function(data){
      foodStock = data.val();
  });
  
  dog = createSprite(550,250);
  dog.addImage(dog_img);
  dog.scale = 0.2;

  foodObj = new Food();
  
  feed = createButton('Feed The Dog');
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(400,15);
  addFood.mousePressed(AddFood);

  


}


function draw() {  
  background(46,139,87);

  textSize(25);
  fill('black');
  text('Food: '+foodStock,750,425);

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text('Last Feed : '+ lastFed%12+'PM',350,30);
  }
  else if(lastFed==0){
    text('Last Feed : 12 AM',350,30);
  }
  else{
    text('Last Feed : '+ lastFed+'AM',350,30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed = data.val();

  });


  foodObj.display();
  drawSprites();
  //add styles here

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
      Food:foodObj.getFoodStock,
      FeedTime:hour
  });
  }
  
}



function AddFood(){
  foodStock++
  database.ref('/').update({
    Food:foodStock
  })
}





