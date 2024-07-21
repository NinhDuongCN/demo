function saveCookies(username, authCode){
    const d = new Date();
    d.setTime(d.getTime() + 1200000);
    let expires = ";expires=" + d.toUTCString();
    
    document.cookie = 'u='+username + expires + ";path=/" ;
    document.cookie = 'au='+authCode + expires + ";path=/";
    alert(document.cookie);
}

function GetCookieValue(key){
   return document.cookie
                  .split("; ")
                  .find((row) => row.startsWith(key+"="))
                  ?.split("=")[1];
}

// function getUAu(){
//     var re = {};
//     alert(cookie);
//     var itmp = 0;
//     re.username = GetCookieValue('u');
//     re.authCode = GetCookieValue('au');
//     return re;
// }

function GetCookie(){
    
    document.querySelector("#msg").innerText = "username=" + GetCookieValue('u') + "; authCode=" + GetCookieValue('au');
}

function ChangePassword(){
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var npassword = document.querySelector("#npassword").value;
    var data = 'q=changepw&u=' + username + '&p=' + password + '&np=' + npassword;

    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: 'https://script.google.com/macros/s/AKfycbxEoZo6Oo73GbQjqLV0SvYl9IEKPMfa-N1SwQAccYnRFwjJ4t-3PQvH_O2iM7tRej0yMg/exec',
        method: "GET",
        dataType: 'json',
        data: data,
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                document.getElementById("msg").innerText = responseData.msg;
            alert("không lấy được dữ liệu");
            }
            else{
                document.getElementById("msg").innerText = responseData.data||responseData.msg;
                saveCookies(username, responseData.data||responseData.msg);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
            document.getElementById("msg").innerText = textStatus;
        }
    });
}



function Login(){
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var data = "q=login&u=" + username + "&p=" + password;

    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: 'https://script.google.com/macros/s/AKfycbxEoZo6Oo73GbQjqLV0SvYl9IEKPMfa-N1SwQAccYnRFwjJ4t-3PQvH_O2iM7tRej0yMg/exec',
        method: "GET",
        dataType: 'json',
        data: data,
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                document.getElementById("msg").innerText = responseData.msg;
            alert("không lấy được dữ liệu");
            }
            else{
                document.getElementById("msg").innerText = responseData.data||responseData.msg;
                saveCookies(username, responseData.data||responseData.msg);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
            document.getElementById("msg").innerText = textStatus;
        }
    });
}
