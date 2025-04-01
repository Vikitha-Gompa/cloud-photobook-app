import { SharedWithModel } from "../model/SharedWithModel.js";

export class SharedWithController {
    // instance members
    model = null;
    view = null;

    constructor() {
        this.model = new SharedWithModel();
       
    }

    setView(view) {
        this.view = view;
    }

   
}