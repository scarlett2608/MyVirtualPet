class Form{
    constructor(){
        
        
    }
    display(){
        title = createElement('h1');
        title.html('My Virtual Pet');
        title.position(130,40);
        name = createInput('Name The Dog');
        state = createInput('Enter State');
        push = createButton('Push');
        name.position(130,200);
        state.position(130,250);
        push.position(150,300);
        push.mousePressed(()=>{
            Dogname = name.value();
            gameState = state.value();
            database.ref('/').update({
                gameState:gameState
            });
        });
    }
}