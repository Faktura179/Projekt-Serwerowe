class Ui{
    constructor(){
        window.onkeydown= function (e){
            switch(e.key){
                case "Enter":
                    
                    break;
                default:
                    console.log(e.key)
                    break;
            }
        }
    }
}