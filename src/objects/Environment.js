const Sprite=require("./impl/Sprite");
const Person=require("./impl/Person");
const PersonController=require("../behaviors/PersonController")
const GenerationBar=require("./GenerationBar");
class Environment {
  constructor(
    averageIq,
    wordsSpoken,
    income,
    education,
    coefIQ,
    coefEdu,
    coefIncome,
    intercept,
    environmentCount,
    cw,
    ch)
    {
      let self=this;
      this.generationBar;
      this.averageIq = averageIq;
      this.wordsSpoken = wordsSpoken;
      this.income=income;
      this.education=education;
      this.coefIQ=coefIQ;
      this.coefEdu=coefEdu;
      this.coefIncome=coefIncome;
      this.intercept=intercept;
      this.environmentCanvas= document.createElement('canvas');
      this.environmentCanvas.style.top=0;
      this.environmentCount=environmentCount;
      this.environmentCanvas.width = cw;
      this.environmentCanvas.height = ch;
      this.generation=0;
      this.generationUpdateNeeded=false;
      this.newAverageIQ=this.averageIq;
      this.environmentID;
      this.environmentCanvas.onclick= function(e){
        self.onClick(e);
      }
      document.body.appendChild(this.environmentCanvas);
      this.environmentContext = this.environmentCanvas.getContext("2d");
      this.environmentContext.font="bolder 20px Arial";
      this.environmentContext.fillStyle = "#FF0000";
      //this.environmentContext.lineWidth=500; not working for some reason
      let fps=24;
      this.fps=24;
      this.gameObjects = [];
      this.canvasWidth = cw;
      this.canvasHeight = ch;
      for(let i=0; i<10; i++){
        let person=new Person(this.averageIq,this.wordsSpoken, this.income, this.education, this.coefIQ,this.coefEdu,this.coefIncome,this.intercept);
        this.gameObjects.push(person);
        let behavior=new PersonController(self, person)
        person.attachBehavior(behavior);
        person.getBehavior(behavior);
      }
      this.interval = setInterval(function(){ self.gameLoop(); }, 1000/fps);
      this.fixedInterval = setInterval(function(){ self.fixedUpdate(); }, 2000);
      /*
      this.checkState= setInterval(function(){
        if(self.checkPaused()){
          self.generationBar.barIncrease();
          //reaches here, not change from hitting button
          pause=true;
          self.checkResume();
          }
        }, 1000/fps);
        */
    }

    gameLoop() {
      this.environmentContext.clearRect(0,0, this.canvasWidth, this.canvasHeight);
      this.update();
      this.draw(this.environmentContext);
      this.lateUpdate();
      if(this.generationBar.endProgram){
        clearInterval(this.inteval);
        clearInterval(this.fixedInterval);
      }
    }
    onClick(e){
      this.gameObjects.forEach((gameObject)=>{
        if(gameObject instanceof Person &&
            gameObject.getX()+gameObject.getWidth()>=e.offsetX &&
            gameObject.getY()<=e.offsetY &&
            gameObject.getY()+gameObject.getHeight()>=e.offsetY){
            gameObject.onClick(e);
            return;
          }
        });
        console.log("x:"+e.offsetX+" y:"+e.offsetY);

      }
      draw(context){
        this.gameObjects.forEach((gameObject)=>{
          gameObject.draw(context);
        });
      }

      update(){
        this.gameObjects.forEach((gameObject)=>{
          gameObject.update();
        });
        this.environmentContext.fillText("Environment "+this.environmentID+": Generation "+this.generation, this.environmentCanvas.width/8-20, 50);
        this.environmentContext.font="15px Arial";
        this.environmentContext.fillText("Average Environment IQ: "+(Math.round(100*this.newAverageIQ)/100), this.environmentCanvas.width/8-20, this.environmentCanvas.height-50);
        this.environmentContext.font="bolder 20px Arial";

      }

      lateUpdate(){
        this.gameObjects.forEach((gameObject)=>{
          gameObject.lateUpdate();
        });
      }

      fixedUpdate(){
        this.generation+=1; //Count of generations passed
        this.generationBar.barIncrease();
        console.log("Generation: "+this.generation);
        //finds interactions does interactions
        this.bubbleSort(this.gameObjects); //sorting people by absolute distance
        for(let i=0;i<this.gameObjects.length-1;i++){
          if(this.getRelativeDistance(this.gameObjects[i], this.gameObjects[i+1])<16){ //everything that happens on generational interaction
            //if distance between two people is less than 8 pixels
            this.average(this.gameObjects[i],this.gameObjects[i+1]);
          }
        }
        //each person recalculates iq
        this.gameObjects.forEach((gameObject)=>{
          gameObject.fixedUpdate();
        });
        //HAVE TO CALCULATE NEW AVERAGE ENVIRONMENT IQ OUT HERE
        this.newAverageIQ=0;
        for(let i=0; i<this.gameObjects.length; i++){
          this.newAverageIQ+=this.round(this.gameObjects[i].intelligence,2);
        }
        this.newAverageIQ/=this.gameObjects.length;
        for(let i=0; i<this.gameObjects.length; i++){
          this.gameObjects[i].avgEnvIq=this.newAverageIQ;
        }
        console.log("Average Environment IQ: "+this.round(this.newAverageIQ,2));

        //CHECKING IF PROGRAM IS PAUSED/OVER

      }
      getWidth(){
        return this.canvasWidth;
      }
      getHeight(){
        return this.canvasHeight;
      }
      getGameObjects(){
        return this.gameObjects;
      }
      getRelativeDistance(gameObject1, gameObject2){
        this.x1=gameObject1.getX()
        this.x2=gameObject2.getX()
        this.y1=gameObject1.getY()
        this.y2=gameObject2.getY()
        this.distance=Math.sqrt((this.x2-this.x1)^2+(this.y2-this.y1)^2);
        return this.distance;
      }
      getDistanceFromEdge(gameObject1){
        this.x=gameObject1.getX()
        this.y=gameObject1.getY()
        this.distance=Math.sqrt((this.x)^2+(this.y)^2);
      }

      bubbleSort(arr){
        this.len = arr.length;
        for (let i = this.len-1; i>=0; i--){
          for(let j = 1; j<=i; j++){
            if(this.getDistanceFromEdge(arr[j-1])>this.getDistanceFromEdge(arr[j])){
              this.temp = arr[j-1];
              arr[j-1] = arr[j];
              arr[j] = this.temp;
            }
          }
        }
        return arr;
      }
      average(gameObject1, gameObject2){
        gameObject1.setInteractionIQ(gameObject1.intelligence,gameObject2.intelligence);
        gameObject2.setInteractionIQ(gameObject1.intelligence,gameObject2.intelligence);
        this.education=(gameObject1.education+gameObject2.education)/2;
        this.income=(gameObject1.income+gameObject2.income)/2;
      }
      round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }
      getGenerationBar(generationBar){
        this.generationBar=generationBar;
      }
      getEnvironmentID(environmentID){
        this.environmentID=environmentID;
      }
      checkPaused(){
        if(this.generationBar.endProgram){
          clearInterval(this.inteval);
          clearInterval(this.fixedInterval);
        }
      }
      //is going to be used to resume program
    /*  checkResume(){
        //reached here, says endProgram is true
        if(!(this.generationBar.endProgram)){
          this.interval = setInterval(function(){ self.gameLoop(); }, 1000/this.fps);
          this.fixedInterval = setInterval(function(){ self.fixedUpdate(); }, 2000);
          console.log("Program Resumed!");
      }
      */
    }
    module.exports = Environment;
