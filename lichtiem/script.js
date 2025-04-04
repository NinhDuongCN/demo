
const API='https://script.google.com/macros/s/AKfycbwFdSzEzuhdGsTydzb_dyNIZ5DgVlDh0f9z2oqTVbGrsLipXvfNuSqf5BwAU79YXNUI/exec';
/* trạng thái mũi tiêm, kiểm tra đồng bộ với API
*/
// const QUA_HAN_TIEM = "Quá hạn tiêm";
// const GAN_DEN = "Gần đến";
const DA_TIEM = "Đã tiêm";
// const CHUA_TIEM = "Chưa tiêm";
// const DEN_HAN = "Đến hạn tiêm";

const BTN_ADD_CARD = `<div class="card additembtn active" >
            <details>
                <summary>
                    <a class="card-name"><i>Thêm mũi tiêm</i></a>
                    <a>+</a>
                </summary>
                <div class="card-detail">
                    <a>Loại</a>
                    <a contenteditable="true" class="aedit" id="tenmui">Tên mũi tiêm</a>
                </div>
                <div class="card-detail">
                    <a>Liều thứ</a>
                    <a contenteditable="true" class="aedit" id="muithu">1</a>
                </div>
                <div class="card-detail">
                    <a>Ngày dự kiến tiêm</a>
                    <a contenteditable="true" class="aedit" id="dukien">24/11/2024</a>
                </div>
                <div class="card-button">
                    <button>Thêm mũi tiêm</button>
                </div>
            </details>
        </div>`;


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
                <input name="dukien" type="date"  class="update-item" id="u-dukien" value="${dukien}">
            </div>
        </div>
        <div class="inactive" id="updatiem">
            <div class="update-detail">
                <a>Ngày tiêm</a>
                <input name="ngaytiem" type="date" class="update-item" id="u-ngaytiem" value="${dukien}">
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
        }
    });
}

function RequestData(request){
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
                } else{
                    ShowCards(responseData.data);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
        }
    });
}


function ShowNotif(coming){
    console.log(coming);
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

function ShowAllCards(item){
    ShowCards(item);
    document.querySelector("#secList").innerHTML += BTN_ADD_CARD;
}

// function Date2String(date){
//     var v = date.getDate();
//     var re = (v < 10 ? '0' : '') + v;
//     re += '/' + ((v = date.getMonth() + 1) < 3 ? '0' : '') + v;
//     re += '/' + date.getFullYear();
//     return re;
// }