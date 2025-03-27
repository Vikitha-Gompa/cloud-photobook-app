import { HomeModel } from "../model/HomeModel.js";



export class HomeController{
    // instance members
    model = null;
    view = null;

    constructor(){
        this.model = new HomeModel();
        this.onClickGenerateDataButton = this.onClickGenerateDataButton.bind(this);
    }

    setView(view){
        this.view = view;
    }

    onClickGenerateDataButton(){
        //console.log('Generate Data button clicked');
        //generate a random number between 1 and 100

        const randomNumber = Math.floor(Math.random()*100)+1;
        this.model.addNumber(randomNumber);
        this.view.render();
    }
}