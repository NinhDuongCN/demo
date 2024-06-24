var MSdetails = true;
var WcChiundetails = true;

function ShowDetailsMS(){
    if(MSdetails = !MSdetails){
        document.querySelector("#fMS").classList.remove('show');
        return;
    }
    document.querySelector("#fMS").classList.add('show');
}

function ShowDetailsWcChiun(){
    if(WcChiundetails = !WcChiundetails){
        document.querySelector("#fWcChiun").classList.remove('show');
        return;
    }
    document.querySelector("#fWcChiun").classList.add('show');
}