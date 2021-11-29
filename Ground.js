class Ground{
    constructor(x,y,w,h){
        var options = {
            isStatic: true
        };

        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);
        this.w = w;
        this.h = h;
    }
    display(){
        var pos = this.body.position;
        push();
        fill("brown");
        rect(pos.x,pos.y,this.w,this.h);
        pop();
    }
}