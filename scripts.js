/*
script chung
update: 2024.06.21
*/


//trả về object chứa các tham số.
function GetParameters(){
    let url = window.location.href;
    let tmp = url.indexOf('?');
    if(tmp < 3) return {};
    var re = {};
    url = url.slice(tmp+1);
    url.split('&').forEach(element => {
        tmp = element.indexOf('=');
        if(tmp>0){
            re[decodeURIComponent(element.slice(0,tmp))] = decodeURIComponent(element.slice(tmp+1));
        }
    });
    return re;
}