class Net{
    constructor(){
        var socket
        if(confirm("Czy chcesz rozpocząć gre?"))
            socket = io()
        else
            return
        this.io=socket
        this.myMove=false
        socket.on("conn",function(data){
            this.player=data.player
            if(this.player==1){
                this.myMove=true
            }
            console.log(this.myMove)
        }.bind(this))
        socket.on("win",function(data){
            socket.emit("win",{})
            alert("Wygrałeś!")
        })
    }

    move(argumenty){
        this.io.emit("move",argumenty)
    }
}