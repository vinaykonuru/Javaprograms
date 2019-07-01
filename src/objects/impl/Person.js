const Sprite=require("./Sprite");
class Person extends Sprite{
  constructor(avgEnvIq,wordsSpoken,income,education,coefIQ,coefEdu,coefIncome,intercept){
    super("data/graphics/sprites/sprite1.png",32, 32, 32, 32, 0);
    this.avgEnvIq=avgEnvIq;
    this.income=(Math.random()*.1+.95)*income;
    this.education=(Math.random()*.1+.95)*education;
    this.intelligence=(Math.random()*.1+.95)*avgEnvIq;
    //this.wordsSpoken=(Math.random()*.2+.90)*wordsSpoken; don't like this variable
    this.coefIQ=coefIQ;
    this.coefEdu=coefEdu;
    this.coefIncome=coefIncome;
    this.intercept=intercept;
    this.interactionIQ=this.avgEnvIq;
  }
  update(){
    super.update();
    if(this.intelligence<=50){
    super.updateImage("data/graphics/sprites/B2R1.png");
    this.behavior.setMaxSpeed(3);
    }
    else if(this.intelligence>50 && this.intelligence<=55){
    super.updateImage("data/graphics/sprites/B2R2.png");
    this.behavior.setMaxSpeed(4);
    }
    else if(this.intelligence>55 && this.intelligence<=60){
    super.updateImage("data/graphics/sprites/B2R3.png");
    this.behavior.setMaxSpeed(5);
    }
    else if(this.intelligence>60 && this.intelligence<=65){
    super.updateImage("data/graphics/sprites/B2R4.png");
    this.behavior.setMaxSpeed(6);
    }
    else if(this.intelligence>65 && this.intelligence<=70){
    super.updateImage("data/graphics/sprites/B2R5.png");
    this.behavior.setMaxSpeed(7);
    }
    else if(this.intelligence>70 && this.intelligence<=75){
    super.updateImage("data/graphics/sprites/B2R6.png");
    this.behavior.setMaxSpeed(8);
    }
    else if(this.intelligence>75 && this.intelligence<=80){
    super.updateImage("data/graphics/sprites/B2R7.png");
    this.behavior.setMaxSpeed(9);
    }
    else if(this.intelligence>80 && this.intelligence<=85){
    super.updateImage("data/graphics/sprites/B2R8.png");
    this.behavior.setMaxSpeed(10);
    }
    else if(this.intelligence>85 && this.intelligence<=90){
    super.updateImage("data/graphics/sprites/B2R9.png");
    this.behavior.setMaxSpeed(11);
    }
    else if(this.intelligence>90 && this.intelligence<=95){
    super.updateImage("data/graphics/sprites/B2R10.png");
    this.behavior.setMaxSpeed(12);
    }
    else if(this.intelligence>95 && this.intelligence<=100){
    super.updateImage("data/graphics/sprites/R2W1.png");
    this.behavior.setMaxSpeed(13);
    }
    else if(this.intelligence>100 && this.intelligence<=105){
    super.updateImage("data/graphics/sprites/R2W2.png");
    this.behavior.setMaxSpeed(14);
    }
    else if(this.intelligence>105 && this.intelligence<=110){
    super.updateImage("data/graphics/sprites/R2W3.png");
    this.behavior.setMaxSpeed(15);
    }
    else if(this.intelligence>110 && this.intelligence<=115){
    super.updateImage("data/graphics/sprites/R2W4.png");
    this.behavior.setMaxSpeed(16);
    }
    else if(this.intelligence>115 && this.intelligence<=120){
    super.updateImage("data/graphics/sprites/R2W5.png");
    this.behavior.setMaxSpeed(17);
    }
    else if(this.intelligence>125 && this.intelligence<=130){
    super.updateImage("data/graphics/sprites/R2W6.png");
    this.behavior.setMaxSpeed(18);
    }
    else if(this.intelligence>130 && this.intelligence<=135){
    super.updateImage("data/graphics/sprites/R2W7.png");
    this.behavior.setMaxSpeed(19);
    }
    else if(this.intelligence>135 && this.intelligence<=140){
    super.updateImage("data/graphics/sprites/R2W8.png");
    this.behavior.setMaxSpeed(20);
    }
    else if(this.intelligence>140 && this.intelligence<=145){
    super.updateImage("data/graphics/sprites/R2W9.png");
    this.behavior.setMaxSpeed(20);
    }
    else if(this.intelligence>145 && this.intelligence<=150){
    super.updateImage("data/graphics/sprites/R2W10.png");
    this.behavior.setMaxSpeed(21);
    }
    else if(this.intelligence>150){
    super.updateImage("data/graphics/sprites/R2W11.png");
    this.behavior.setMaxSpeed(22);
    }

//REMEMBER TO PUT GRAPH
  }
    fixedUpdate(){//generational interaction between people
      this.intelligence = this.coefIQ*this.interactionIQ+this.coefEdu*this.education+this.coefIncome*this.income+this.intercept;
    }
    getCurrentIntelligence(){
      return this.intelligence;
    }
    getBehavior(behavior){
      this.behavior=behavior;
    }
    setInteractionIQ(intel1, intel2){
      var intelligence1=this.round(intel1,2);
      var intelligence2=this.round(intel2,2);
      this.interactionIQ=(intelligence1+intelligence2)/2;
    }
    round(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
}
module.exports=Person;
