export class PhotoNote{
    //instance variables
    caption; description; uid; createdBy; 
    imageName; imageURL; timestamp; sharedWith; docId;


    constructor(data) {
        if (!data) return;
        this.caption = data.caption;
        this.description = data.description;
        
        this.uid = data.uid;
        this.createdBy = data.createdBy; // email
        this.imageName = data.imageName;
        this.imageURL = data.imageURL;
       
        this.timestamp = data.timestamp;
       this.sharedWith = data['sharedwith'] || [];
    }

    set_docId(id) {
        this.docId = id;
    }

    // toFirestore() {
    //     return {
    //         title: this.title,
    //         memo: this.memo,
    //         uid: this.uid,
    //         createdBy: this.createdBy,
    //         imageName: this.imageName,
    //         imageURL: this.imageURL,
    //         imageClasses: this.imageClasses,
    //         timestamp: this.timestamp,
    //         sharedWith: this.sharedWith,
    //     };
    // }

    // static validateSharedWith(value) {
    //     const str = value.trim();
    //     if (str.length == 0) {
    //         return '';
    //     }
    //     const emails = str.split(/[,|;| ]+/);
    //     let invalidMessage = '';

    //     for (let i = 0; i < emails.length; i++) {
    //         if (!(/^[0-9]+@uco\.com/.test(emails[i]))) {
    //             invalidMessage += `${emails[i]}`;
    //         }
    //     }
    //     return invalidMessage;
    // }
}