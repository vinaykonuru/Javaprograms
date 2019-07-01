const Environment=require("./Environment");

class GenerationBar{
  constructor(
    environmentCount,
    canvasWidth,
    canvasHeight,
    generationNumber
  )
  {
    console.log("constructor entered");
  this.screenSize=1520;
  this.numberOfBars=0;
  this.fps=24
  this.maxPossibleEnvironments=5;
  this.environmentCount=environmentCount;
  this.environmentWidth=canvasWidth;
  this.generationNumber=generationNumber;
  this.canvasHeight=canvasHeight;
  this.barCanvas= document.createElement('canvas');
  this.barCanvas.width=this.screenSize
  this.barCanvas.height=100;
  this.barCanvas.style.top=800;
  this.barCanvas.style.left=6;
  document.body.appendChild(this.barCanvas);
  this.barContext=this.barCanvas.getContext("2d");
  this.barContext.fillStyle = "#FF0000";
  this.barContext.font="40px Arial";
  this.barContext.fillText(this.generationNumber+" Generations",this.screenSize-350,63);
  this.barThickness=this.barCanvas.width/this.generationNumber;
  this.endProgram=false; //becomes true when generation count is finished
  }

  //adds bar if generation increased
  barIncrease(){
    this.barContext.fillRect(this.numberOfBars/this.environmentCount*this.barThickness,0,this.barThickness/this.environmentCount,275);
    this.numberOfBars++;
    //need to divide numberOfBars by environmentCount because each environment is placing bars
    //numberOfBars/environmentCount=NUMBER OF FULL BARS

    if(this.numberOfBars/this.environmentCount==this.generationNumber){
        this.endProgram=true;
  /*    this.barContext.fillStyle = "#FFFFFF";
      this.barContext.font="bolder 60px Arial";
      this.barContext.fillText("FINISHED",this.screenSize/2-222,70);
      var button = document.createElement("button");
      button.innerHTML = "Resume";
// 2. Append somewhere
      var body = document.getElementsByTagName("body")[0];
      body.appendChild(button);
// 3. Add event handler
      button.style.position="absolute"
      button.style.left=""+(this.screenSize/2+128)+"px";
      button.style.top="620px";
      button.style.width="150px";
      button.style.height="75px";
      //not working since barIncrease  function stopped being called
      button.addEventListener ("click", function() {
        this.endProgram=false;
        console.log(this.endProgram);
      });
      */
    }
  }
}
module.exports=GenerationBar;
