import {
    getFunctions,
    httpsCallable,
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-functions.js";
import {app} from "./firebase_core.js";


const functions = getFunctions(app);

// Connect tp the local emulator if running. Verify the port #
connectFunctionsEmulator(functions, 'localhost', 5001);

const cloudFnGetImageDescription = httpsCallable(functions, 'cloudFnGetImageDescription');

export async function getImageDescription(imageURL) {
    try{
    const response = await cloudFnGetImageDescription(imageURL);
    console.log(response.data);
    return response.data;
    } catch (e){
        console.error('Error generating image description by gemini',e);
        throw e;
    }
    
}