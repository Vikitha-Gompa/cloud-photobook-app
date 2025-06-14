import {
    getFirestore,
    collection,
    addDoc,
    query,
    getDocs,
    where,
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"

 import { app } from "./firebase_core.js"
import { PhotoNote } from "../model/PhotoNote.js";

 // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const PHOTONOTE_COLLECTION = 'photonotes';

export async function addPhotoNoteToFirestore(photoNote) {
    const collRef = collection(db, PHOTONOTE_COLLECTION);
    const docRef = await addDoc(collRef, photoNote.toFirestore());
    return docRef.id;
    
}

export async function getPhotoNoteListFromFirestore(uid) {
    let photoNoteList = [];
    const collRef = collection(db, PHOTONOTE_COLLECTION);
    const q = query(
        collRef,
        where('uid', '==', uid),
        orderBy('timestamp','desc'),

    );
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const p = new PhotoNote(doc.data());
        p.set_docId(doc.id);
        photoNoteList.push(p);
    });
    return photoNoteList;
    
}

export async function updatePhotoNoteInFirestore(docId, update) {
    // update = {key1: value1, key2: value2, ...}
    const collRef = collection(db, PHOTONOTE_COLLECTION);
    const docRef = doc(collRef, docId);
    await updateDoc(docRef, update);
    
}

export async function deletePhotoNoteFromFirestore(docId) {
    const collRef = collection(db, PHOTONOTE_COLLECTION);
    const docRef = doc(collRef, docId);
    await deleteDoc(docRef);
    
}

export async function getSharedWithPhotoNoteListFromFirestore(email){
    let photoNoteList = [];
    const collRef = collection(db, PHOTONOTE_COLLECTION);
    const q = query(
        collRef,
        where('sharedWith', 'array-contains', email),
        orderBy('timestamp', 'desc'),
    );
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const p = new PhotoNote(doc.data());
        p.set_docId(doc.id);
        photoNoteList.push(p);
    });
    return photoNoteList;
}