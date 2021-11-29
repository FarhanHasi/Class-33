class Link{
    constructor(body1,body2)
    {
        var lastlink = body1.bodies[body1.bodies.length-2]
        var options = {
            bodyA:lastlink,
            pointA:{x:0,y:0},
            bodyB:body2,
            pointB:{x:0,y:0},
            stiffness:0.01,
            length:-10
        }
        this.link = Constraint.create(options)
        World.add(world,this.link);
    }
    detach()
    {
        World.remove(world,this.link);

    }
}