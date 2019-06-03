class Net{
    constructor(){
        this.io = io()
        this.myMove=false
        this.io.on("connect", function(data){
            console.log(data)
            //this.myMove=data.move
            console.log(this.myMove)
        }.bind(this))
    }

    move(argumenty){
        this.io.emit("move",argumenty)
    }
}