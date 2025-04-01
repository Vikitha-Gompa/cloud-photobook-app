import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";

export class SharedWithView extends AbstractView {
    // instance variables
    controller = null;
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async onMount() {
        if (!currentUser) {
            this.parentElement.innerHTML = '<h1> Access Denied</h1>';
            return;
        }
        console.log('SharedWithView.onMount called ');
    }

    async updateView() {
        console.log('SharedWithView.updateView() called');
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/sharedwith.html' ,  { cache: 'no-store' });
        viewWrapper.innerHTML = await response.text();


        return viewWrapper;
    }

    

    attachEvents() {
       console.log('SharedWithView.attachEvents() called');
    }

    async onLeave() {
        if (!currentUser) {
            this.parentElement.innerHTML = '<h1> Access Denied</h1>';
            return;
        }
        console.log('SharedWithView.onLeave() called');
    }


}