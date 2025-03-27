export function startSpinner(){
    // console.log('spin start')
    document.getElementById("spinnerOverlay").classList.remove("d-none");
}

export function stopSpinner(){
    // console.log('spin stop')
    document.getElementById("spinnerOverlay").classList.add("d-none");

}