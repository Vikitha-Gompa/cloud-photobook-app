import { HomeModel } from "../model/HomeModel.js";
import { uploadImageToCloudStorage } from "../controller/cloudstorage_controller.js";
import { currentUser } from "./firebase_auth.js";
import { PhotoNote } from "../model/PhotoNote.js";
import { addPhotoNoteToFirestore, getPhotoNoteListFromFirestore } from "./firestore_controller.js";
import { startSpinner, stopSpinner } from "../view/util.js";
//import {} from "../view/templates/home.html";

export class HomeController {
    // instance members
    model = null;
    view = null;

    constructor() {
        this.model = new HomeModel();
        this.onChangeImageFile = this.onChangeImageFile.bind(this);
        this.onSubmitAddNew = this.onSubmitAddNew.bind(this);
        this.onClickCard = this.onClickCard.bind(this);
        this.onRightClickCard = this.onRightClickCard.bind(this);
    }

    setView(view) {
        this.view = view;
    }

    async onSubmitAddNew(e) {
        e.preventDefault();
        const r = PhotoNote.validateSharedWith(e.target.sharedWith.value);
        if (r != ''){
            alert(`SharedWith: Invalid email address: ${r}`);
            return;
        }
        startSpinner();
        let imageName, imageURL;
        try {
            const r = await uploadImageToCloudStorage(this.model.imageFile);
            imageName = r.imageName;
            imageURL = r.imageURL;
        } catch (e) {
            stopSpinner();
            console.error(e);
            alert('Error uploading image'
            );
            return;
        }
        console.log(imageName, imageURL);
        const form = e.target;
        const caption = form.caption.value;
        const description = form.description.value;
        const sharedWith = PhotoNote.parseSharedWith (form.sharedWith.value);
        const uid = currentUser.uid;
        const createdBy = currentUser.email;
        const timestamp = Date.now();

        const photoNote = new PhotoNote({
            caption, description, uid, createdBy,
            imageName, imageURL, timestamp, sharedWith,
        });

        console.log('photoNote', photoNote);

        try{
            const docId = await addPhotoNoteToFirestore(photoNote);
            photoNote.set_docId(docId);
            document.querySelector('button.btn-close').click();
            stopSpinner();
        } catch (e){
            stopSpinner();
            alert('Error adding photo note to Firestore');
            return;
        }

       // console.log('photo note saved');
        this.model.prependPhotoNoteList(photoNote);
        this.view.render();

    }


    onChangeImageFile(e) {
        console.log('HomeController.onChangeImageFile() called');
        const imgPreview = document.getElementById('image-preview');
        this.model.imageFile = e.target.files[0];
        if (!this.model.imageFile) {
            imgPreview.src = '';
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.model.imageFile);
        reader.onload = function () {
            imgPreview.src = reader.result;
        };

    }

    async onLoadPhotoNoteList(){
        startSpinner();
        try{
            const photoNoteList = await getPhotoNoteListFromFirestore(currentUser.uid);
           
            this.model.setPhotoNoteList(photoNoteList);
            stopSpinner();

        } catch(e){
            stopSpinner();
            console.log('error loading photo notes');
                console.error(e);
                this.model.setPhotoNoteList([]);
                alert('Error loading photo notes');
            
        }
    }

    onClickCard(e){
        const card = e.currentTarget;  // element where the event listiner is attached
        const docId = card.id;
        console.log('onClickCard', docId);
        const photoNote = this.model.getPhotoNoteByDocId(docId);
        if(!photoNote){
            console.error('onClickCard: photoNote not found', docId);
            return;
        }
        
        // display  photoNote in the edit modal
        const form = document.forms.formEdit;
        console.log('form values',form);
        form.caption.value = photoNote.caption;
        form.description.value = photoNote.description;
        form.sharedWith.value = photoNote.sharedWith.join('; ');
        const img = form.querySelector('img');
        img.src = photoNote.imageURL;

        // display the modal
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-edit'));
        modal.show();

    }

    onRightClickCard(e){
        e.preventDefault(); // prevent the context menu popup
        const card = e.currentTarget;  // element where the event listiner is attached
        const docId = card.id;
        console.log('onRightClickCard', docId);

    }
}