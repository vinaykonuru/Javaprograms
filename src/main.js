const Environment=require("./objects/Environment");
const Sprite=require("./objects/impl/Sprite");
const GenerationBar=require("./objects/GenerationBar");
let environments = [];
let url_string=window.location.href;
let url= new URL(url_string);
this.environmentCount= url.searchParams.get("environmentCount");
this.generationNumber= url.searchParams.get("generationNumber");

this.canvasHeight = 600;
this.canvasWidth = 1520/this.environmentCount; //length of screen at 100%
this.environmentID;
for(let i=0; i<this.environmentCount; i++){

  environments.push(new Environment(
    url.searchParams.get("env"+i+"iq"),
    url.searchParams.get("env"+i+"words"),
    url.searchParams.get("env"+i+"income"),
    url.searchParams.get("env"+i+"education"),
    url.searchParams.get("coefEquationIQ"),
    url.searchParams.get("coefEquationEducation"),
    url.searchParams.get("coefEquationIncome"),
    url.searchParams.get("intercept"),
    this.environmentCount,
    this.canvasWidth,
    this.canvasHeight));
    this.environmentID=i+1;
    environments[i].getEnvironmentID(this.environmentID);
  }
  this.generationBar=new GenerationBar(this.environmentCount,this.canvasWidth,this.canvasHeight,this.generationNumber);
  for(let i=0; i<environments.length;i++){
    environments[i].getGenerationBar(this.generationBar);
}
