const GameObject=require("../GameObject");
class Sprite extends GameObject{
  constructor(spriteImage, spriteWidth, spriteHeight, x, y, z){
    super(x,y,z);
    this.image=new Image()
    this.image.src=spriteImage;
    this.maxFrames=this.image.width/spriteWidth;
    this.maxAnimations=this.image.height/spriteHeight;
    this.spriteWidth=spriteWidth;
    this.spriteHeight=spriteHeight;
    this.frame=0;
    this.animation=0;
    this.sprint=false;
  }

  draw(context){
    let drawRect=this.generateDrawRect();
    context.drawImage(this.image,drawRect.x,drawRect.y,drawRect.width,drawRect.height,
    this.x,this.y,this.spriteWidth,this.spriteHeight);
  }

  update(){
    super.update();
    if(this.keyHit===true){
      this.updateFrame();
    }
  }

  generateDrawRect(){
    return{
      x:this.spriteWidth*this.frame,
      y:this.spriteHeight*this.animation,
      height:this.spriteHeight,
      width:this.spriteWidth
    };
  }

  updateFrame(){
    ++this.frame;
    if(this.frame>=this.maxFrames){
      this.frame=0;
    }
  }
  updateImage(image){
    this.image.src=image;
  }
  getWidth(){
    return this.spriteWidth;
  }
  getHeight(){
    return this.spriteHeight;
  }
}


module.exports=Sprite;
