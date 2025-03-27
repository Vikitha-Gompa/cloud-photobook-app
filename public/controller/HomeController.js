import { HomeModel } from "../model/HomeModel.js";
import {uploadImageToCloudStorage} from "../controller/cloudstorage_controller.js";


export class HomeController{
    // instance members
    model = null;
    view = null;

    constructor(){
        this.model = new HomeModel();
        this.onChangeImageFile = this.onChangeImageFile.bind(this);
        this.onSubmitAddNew =this.onSubmitAddNew.bind(this);
    }

    setView(view){
        this.view = view;
    }

   async onSubmitAddNew(e){
        e.preventDefault();
        let imageName, imageURL ;
        try{
            const r = await uploadImageToCloudStorage(this.model.imageFile);
            imageName = r.imageName;
            imageURL = r.imageURL;
        } catch(e){
            console.error(e);
            alert('Error uploading image'
            );
            return;
        }
        console.log(imageName, imageURL);
    }
    

    onChangeImageFile(e){
        console.log('HomeController.onChangeImageFile() called');
        const imgPreview = document.getElementById('image-preview');
        this.model.imageFile = e.target.files[0];
        if (!this.model.imageFile){
            imgPreview.src ='';
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.model.imageFile);
        reader.onload = function(){
            imgPreview.src = reader.result;
        };

    }
}