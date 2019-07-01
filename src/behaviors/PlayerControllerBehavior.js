const Behavior=require("../objects/Behavior");
class PlayerControllerBehavior extends Behavior{
  constructor(){
    super();
  }
  onKeyDown(e){
    let keyCode=e.keyCode || e.which;
    let keyCodeChar=String.fromCharCode(keyCode);
    console.log(keyCodeChar);

    if(keyCodeChar ===""){
      if(this.gameObject.sprint===false){
        this.gameObject.sprint=true;

      }
      else {
        this.gameObject.sprint=false;
      }
    }

    //walk and sprint
    if(keyCodeChar ==="A" || keyCodeChar === "%"){
      if(this.gameObject.sprint===true){
      this.gameObject.setX(this.gameObject.getX()-15);
      }
      else {
        this.gameObject.setX(this.gameObject.getX()-6);
      }
      this.gameObject.animation=3;
      this.gameObject.keyHit=true;
    }
    else if(keyCodeChar ==="D" || keyCodeChar ==="'"){
      if(this.gameObject.sprint===true){
      this.gameObject.setX(this.gameObject.getX()+15);
      }
      else {
        this.gameObject.setX(this.gameObject.getX()+6);
      }
      this.gameObject.animation=1;
      this.gameObject.keyHit=true;
    }

    if(keyCodeChar==="W" || keyCodeChar ==="&"){
      if(this.gameObject.sprint===true){
      this.gameObject.setY(this.gameObject.getY()-15);
      }
      else {
        this.gameObject.setY(this.gameObject.getY()-6);
      }
      this.gameObject.animation=0;
      this.gameObject.keyHit=true;
    }
    else if(keyCodeChar==="S" || keyCodeChar ==="("){
      if(this.gameObject.sprint===true){
      this.gameObject.setY(this.gameObject.getY()+15);
      }
      else {
        this.gameObject.setY(this.gameObject.getY()+6);
      }
      this.gameObject.animation=2;

      this.gameObject.keyHit=true;
      console.log(this.gameObject.keyHit);
    }
    //jump
    if(keyCodeChar===" "){
      this.gameObject.setY(this.gameObject.getY()-50); //jump up
      this.gameObject.then=Date.now();
    }
  }
  onKeyUp(e){
    this.gameObject.keyHit=false;
  }
}
module.exports=PlayerControllerBehavior;
