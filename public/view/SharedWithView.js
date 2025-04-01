import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";
import {  } from "../model/SharedWithModel.js";
import {  } from "../controller/SharedWithController.js";

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
        
        await this.controller.loadData();
        console.log('SharedWithView.onMount called ', this.controller.model.sharedPhotoNoteList);    }

    async updateView() {
        console.log('SharedWithView.updateView() called');
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/sharedwith.html' ,  { cache: 'no-store' });
        viewWrapper.innerHTML = await response.text();

        const view = this.renderSharedPhotoNoteList();
        viewWrapper.appendChild(view);


        return viewWrapper;
    }

    renderSharedPhotoNoteList(){
        const list = document.createElement('div');
            list.id = 'sharedPhotoNoteList';
            list.className = 'row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4';

            if(this.controller.model.sharedPhotoNoteList.length === 0){
                const noData = document.createElement('div');
                noData.innerHTML = '<h5> Photo Notes Not Found </h5>';
                list.appendChild(noData);
            }else{
                for(const photoNote of this.controller.model.sharedPhotoNoteList){
                    const card = this.createCard(photoNote);
                    list.appendChild(card);
                }
            }
            return list;
        
    }

    createCard(photoNote) {
        const card = document.createElement('div');
        //car.classList.add('col');
        card.className = 'col';
        card.innerHTML = `
            <div id=${photoNote.docId} class="card card-photonote" style="width: 18rem;">
            <img src="${photoNote.imageURL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${photoNote.caption}</h5>
                <p class="card-text">${photoNote.description || 'no description'}</p>
            </div>
            <div class="card-footer">
                <p class="card-text">SharedWith[
                  ${photoNote.sharedWith.length > 0 ? photoNote.sharedWith.join(';') : 'Not Shared'}] </p>
                <small class="text-muted"> CreatedBy: ${photoNote.createdBy}<br> Date: ${new Date(photoNote.timestamp).toLocaleString()} </small>
            </div>  
            </div>
        
        `;
        return card;
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