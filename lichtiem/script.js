
const API='https://script.google.com/macros/s/AKfycbwFdSzEzuhdGsTydzb_dyNIZ5DgVlDh0f9z2oqTVbGrsLipXvfNuSqf5BwAU79YXNUI/exec';
/* trạng thái mũi tiêm, kiểm tra đồng bộ với API
*/
// const QUA_HAN_TIEM = "Quá hạn tiêm";
// const GAN_DEN = "Gần đến";
const DA_TIEM = "Đã tiêm";
// const CHUA_TIEM = "Chưa tiêm";
// const DEN_HAN = "Đến hạn tiêm";
const COMPLETE = "Hoàn thành";
// const INCOMPLETE = "Chưa hoàn thành";

function BTN_ADD_CARD(date){
    return `<div class="card additembtn active" >
                <details>
                    <summary>
                        <a class="card-name"><i>Thêm mũi tiêm</i></a>
                        <a>+</a>
                    </summary>
                    <div class="card-detail">
                        <a>Loại</a>
                        <input type="text" id="addloai" placeholder="Tên mũi tiêm"/>
                    </div>
                    <div class="card-detail">
                        <a>Tổng mũi</a>
                        <input type="number" min="0" max="10" id="addtongmui" value="1"/>
                    </div>
                    <div class="card-detail">
                        <a>Ngày dự kiến tiêm</a>
                        <input type="date" id="adddukien" value="${Date2YYYYMMDD(date)}"/>
                    </div>
                    <div class="card-button">
                        <button onclick="SendAddRequest()">Thêm mũi tiêm</button>
                    </div>
                </details>
            </div>`;
}

function YMD2DMY(value){
    var re = value.split('-');
    return `${re[2]}/${re[1]}/${re[0]}`;
}

function SendAddRequest(){
    //API?r=add&loai=xx&mui=xx&dukien=xx&tongmui=xx
    var request = '';
    var value = document.querySelector("#addloai").value;
    if(value == ''){
        alert("Chưa nhập tên");
        return;
    }
    request += `&loai=${value}`;
    value = document.querySelector("#addtongmui").value;
    if(value == '' || value < 1 || value > 9 || value % 1 != 0){
        alert(`Giá trị tổng số mũi không đúng (${value})`);
        return;
    }
    request += `&tongmui=${value}`;
    value = document.querySelector("#adddukien").value;
    if(value=='' || value == undefined){
        alert(`Ngày dự kiến tiêm mũi đầu không đúng (${value})`);
        return;
    }
    request += `&dukien=${YMD2DMY(value)}&mui=1`;
    // console.log(request);
    ShowLoader();
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: `${API}?r=add&${request}`,
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){                
                alert('Không lấy được dữ liệu ' + responseData.msg);
            }
            else{
                alert("Thêm mới thành công");
                //console.log(responseData.data);
                ShowAllCards(responseData.data);
            }
            HideLoader();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
            HideLoader();
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){    
    RequestStart();
})

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const textContent = card.querySelector('.card-name').innerHTML.toLowerCase();
        if (textContent.indexOf(query)===0) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    if(this.value==''){
        document.querySelector(".card.additembtn").style.display 
            = document.querySelector("#viewmode").value==='all'?'block':'none';
    }
});

function ShowLoader(){
    document.querySelector("#secloader.inactive").classList.replace("inactive", "active");
}
function HideLoader(){
    document.querySelector("#secloader.active").classList.replace("active", "inactive");
}

function CloseDlg(id){
    document.getElementById(id).classList.replace("active", "inactive");
}

function ShowUpdateDlg(id, ten, dukien){
    var dlg = document.getElementById("updateDlg");
    dlg.innerHTML = `
        <p class="popup-title" id="updateDlg-title">${ten}</p>
        <select onchange="select_value_changed()" id="uptrangthai">
            <option value="Chưa tiêm" selected>Chưa tiêm</option>
            <option value="Đã tiêm">Đã tiêm</option>
        </select>
        <div class="active" id="upchuatiem">
            <div class="update-detail">
                <a>Dự kiến tiêm</a>
                <input name="dukien" type="date"  class="update-item" id="u-dukien" value="${DMY2YMD(dukien)}">
            </div>
        </div>
        <div class="inactive" id="updatiem">
            <div class="update-detail">
                <a>Ngày tiêm</a>
                <input name="ngaytiem" type="date" class="update-item" id="u-ngaytiem" value="${DMY2YMD(dukien)}">
            </div>
            <div class="update-detail">
                <a>Tên Vaccine</a>
                <input name="vaccine" type="text" class="update-item" id="u-vaccine" value="">
            </div>
            <div class="update-detail">
                <a>Nơi tiêm</a>
                <input name="noitiem" type="text" class="update-item" id="u-noitiem" value="Hồng Châu">
            </div>
        </div>
        <div class="update-button">
            <button onclick="Update('${id}')">Gửi thông tin</button>
            <button onclick="CloseDlg('updateDlg')">Đóng</button>
        </div>
    `;
    dlg.classList.replace("inactive", "active");
}

function DMY2YMD(value){
    var re = value.split("/");
    return `${re[2]}-${(re[1]<10?'0':'')+re[1]}-${(re[0]<10?'0':'')+re[0]}`;
}

function select_value_changed(){
    if(document.getElementById("uptrangthai").value === "Đã tiêm"){
        document.getElementById("upchuatiem").classList.replace("active","inactive");
        document.getElementById("updatiem").classList.replace("inactive","active");
    } else{
        document.getElementById("updatiem").classList.replace("active","inactive");
        document.getElementById("upchuatiem").classList.replace("inactive","active");
    }
    
}

function select_listview_changed(){
    document.querySelector("#secList").innerHTML = '';
    RequestData(document.getElementById("viewmode").value);
    //document.querySelector(".card.additembtn").style.display = v==='all'?'block':'none';
}


function RequestStart(){
    ShowLoader();
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: `${API}?r=start`,
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                //wishes=[];
                alert('Không lấy được dữ liệu ' + responseData.msg);
            }
            else{
                //coming:
                ShowNotif(responseData.coming);
                ShowAllCards(responseData.all);
            }
            HideLoader();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
            HideLoader();
        },
        
    });
    
}

function RequestData(request){
    ShowLoader();
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: `${API}?r=${request}`,
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                //wishes=[];
                alert('Không lấy được dữ liệu ' + responseData.msg);
            }
            else{
                //coming:
                if(request==='all'){
                    ShowAllCards(responseData.data);
                } else if(request.includes("complete")){
                    ShowCards2(responseData.data);
                } else{
                    ShowCards(responseData.data);
                }
            }
            HideLoader();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
            HideLoader();
        }
    });
}


function ShowNotif(coming){
    if(coming == undefined) return;
    if(coming.length < 1) return;
    var msg = '';
    coming.forEach(item => {
        msg += `[${item.dukien}] ${item.loai} ${item.mui==undefined?"":("(liều "+item.mui+")")}<br>`;
    });

    document.querySelector("#notif-msg").innerHTML = msg;
    document.getElementById('notif-popup').classList.replace("inactive", "active");
}

function ShowCards(items){
    var chtml='';
    items.forEach(item=>{
        if(item.trangthai === DA_TIEM){
            chtml += `<div class="card" id="${item.id}">
                        <details>
                            <summary>
                                <a class="card-name">${item.loai} ${item.mui==undefined?"":("(liều "+item.mui+")")}</a>
                                <a>Đã tiêm</a>
                            </summary>
                            <div class="card-detail">
                                <a>Ngày tiêm</a>
                                <a>${item.ngaytiem}</a>
                            </div>
                            <div class="card-detail">
                                <a>Tên vaccine</a>
                                <a>${item.vaccine}</a>
                            </div>
                            <div class="card-detail">
                                <a>Nơi tiêm</a>
                                <a>${item.noitiem}</a>
                            </div>
                        </details>
                      </div>`;
        } else{
            chtml += `<div class="card" id="${item.id}">
                        <details>
                            <summary>
                                <a class="card-name">${item.loai} ${item.mui==undefined?"":("(liều "+item.mui+")")}</a>
                                <a>${item.trangthai}</a>
                            </summary>
                            <div class="card-detail">
                                <a>Ngày dự kiến tiêm</a>
                                <a>${item.dukien}</a>
                            </div>
                            <div class="card-button">
                                <button onclick="ShowUpdateDlg('${item.id}', '${item.loai} ${item.mui==undefined?"":("(liều "+item.mui+")")}', '${item.dukien}')">Cập nhật mũi tiêm</button>
                            </div>
                        </details>
                      </div>`;
        }
    });
    document.querySelector("#secList").innerHTML = chtml;
}

function ShowCards2(items){
    var chtml='';
    var card='';
    items.forEach(item=>{
        card = `<div class="card">
                    <details>
                        <summary>
                            <a class="card-name">${item.loai}</a>
                            <a>${item.trangthailoai} (${(item.trangthailoai === COMPLETE)? item.tongmui : (item.lantiem.length-1)}/${item.tongmui})</a>
                        </summary>
                `;
        item.lantiem.forEach(lan =>{
            if(lan.trangthai === DA_TIEM){
                card += `<div class="card-detail-group">
                            <div class="group-title">
                                <a class="grpttl-name">${(!lan.mui)?"":"Liều "+lan.mui}</a>
                                <a class="grpttl-status">Đã tiêm</a>
                            </div>
                            <div class="card-detail">
                                <a>Ngày tiêm</a>
                                <a>${lan.ngaytiem}</a>
                            </div>
                            <div class="card-detail">
                                <a>Tên vaccine</a>
                                <a>${lan.vaccine}</a>
                            </div>
                            <div class="card-detail">
                                <a>Nơi tiêm</a>
                                <a>${lan.noitiem}</a>
                            </div>
                        </div>
                        `;
            }else{
                card += `<div class="card-detail-group">
                            <div class="group-title">
                                <a class="grpttl-name">${(!lan.mui)?"":"Liều "+lan.mui}</a>
                                <a class="grpttl-status">${lan.trangthai}</a>
                            </div>
                            <div class="card-detail">
                                <a>Ngày dự kiến tiêm</a>
                                <a>${lan.dukien}</a>
                            </div>
                            <div class="card-button">
                                <button onclick="ShowUpdateDlg('${lan.id}', '${item.loai} ${lan.mui==undefined?"":("(liều "+lan.mui+")")}', '${lan.dukien}')">Cập nhật mũi tiêm</button>
                            </div>
                        </div>
                        `;
            }
        });
        chtml += (card + `
                            </details>
                         </div>
                         `);
    });
    document.querySelector("#secList").innerHTML = chtml;
}

function ShowAllCards(item){
    ShowCards2(item);
    document.querySelector("#secList").innerHTML += BTN_ADD_CARD(new Date());
}

// function Date2String(date){
//     var v = date.getDate();
//     var re = (v < 10 ? '0' : '') + v;
//     re += '/' + ((v = date.getMonth() + 1) < 3 ? '0' : '') + v;
//     re += '/' + date.getFullYear();
//     return re;
// }

function Date2YYYYMMDD(date){
    var v=date.getFullYear();
    var re = v + '-';
    re += ((v=date.getMonth() + 1) < 10?'0':'') + v;
    re += '-' + ((v=date.getDate()) < 10?'0':'') + v;
    return re;
}

