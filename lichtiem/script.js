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
    var v = document.getElementById("viewmode").value;
    alert(v);
}