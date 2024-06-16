var MSdetails = true;
var WcChiundetails = true;

function ShowDetailsMS(){
    if(MSdetails = !MSdetails){
        document.querySelector("#fMS-detail").classList.remove('show');
        return;
    }
    document.querySelector("#fMS-detail").classList.add('show');
}

function ShowDetailsWcChiun(){
    if(WcChiundetails = !WcChiundetails){
        document.querySelector("#fWcChiun-detail").classList.remove('show');
        return;
    }
    document.querySelector("#fWcChiun-detail").classList.add('show');
}