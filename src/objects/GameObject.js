class GameObject{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    this.behaviors=[]
  }
  update(){
    this.behaviors.forEach((behavior)=>{
      behavior.update(this);
    });
  }
  lateUpdate(){
    this.behaviors.forEach((behavior)=>{
      behavior.lateUpdate();
    });
  }
  fixedUpdate(){
    this.behaviors.forEach((behavior)=>{
      behavior.fixedUpdate();
    });
  }
  draw(context){

  }
  onKeyUp(e){
    this.behaviors.forEach((behavior)=>{
      behavior.onKeyUp(e);
    });
}
  onKeyDown(e){
    this.behaviors.forEach((behavior)=>{
      behavior.onKeyDown(e);
  });
}
  onKeyPress(e){
    this.behaviors.forEach((behavior)=>{
      behavior.onKeyPress(e);
  });
}
  onClick(e){
    this.behaviors.forEach((behavior)=>{
      behavior.onClick(e);
    });
  }
attachBehavior(behavior){
    behavior.onAttachBehavior(this);
    this.behaviors.push(behavior);

  }
  getX(){
    return this.x
  }
  getY(){
    return this.y
}
  setX(x){
    this.x=x;
  }
  setY(y){
    this.y=y;
  }
  getWidth(){
    return 0;
  }
  getHeight(){
    return 0;
  }
  average(gameObject){
    
  }

}
module.exports=GameObject;
