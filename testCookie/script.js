function saveCookies(username, authCode){
    document.cookie = 'u='+username;
    document.cookie = 'au='+authCode;
    alert(document.cookie);
}

function getUAu(){
    var re = {};
    var cookie = document.cookie;
    alert(cookie);
    var itmp = 0;
    re.username = cookie.substring(itmp=cookie.indexOf('u=')+1, cookie.indexOf(';', itmp)-itmp);
    re.authCode = cookie.substring(itmp=cookie.indexOf('au=')+1, cookie.indexOf(';', itmp)-itmp);
    return re;
}

function GetCookie(){
    var va = getUAu();
    document.querySelector("#msg").innerText = "username=" + va.username + "; authCode=" + va.authCode;
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
