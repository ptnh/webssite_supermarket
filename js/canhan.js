document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.account-page__menu-item');
    const sections = document.querySelectorAll('.account-page__content > div');
   
    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Function to show a specific section
    function showSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'block';
        }
    }

    // Initially hide all sections
    hideAllSections();

    // Add click event listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            hideAllSections();
            showSection(targetId);
        });
    });

    // Optionally, show the first section by default
    if (menuItems.length > 0) {
        menuItems[0].click();
    }
});


window.onload = function () {
    khoiTao();
    var user = getCurrentUser();

    showInfoOrder(user);
    showInfoClient(user);
}

function showInfoOrder(user){
    var listOrderHTML = document.getElementById('list-order');
    listOrderHTML.innerHTML='';
    if(user.donhang.length < 1 ){
        listOrderHTML.innerHTML=` <tr>
        Mời khách hàng mua sản phẩm
    </tr>`;
    } else{
       // Giả sử user.donhang đã được sắp xếp theo maDon
       for (var i = 0; i < user.donhang.length; i++) {
            console.log(user.donhang[i]);
            // Kiểm tra mã đơn hàng hiện tại
            var currentOrderId = user.donhang[i].maDon;

            // Kiểm tra mã đơn hàng tiếp theo (nếu có)
            var nextOrderId = (i + 1 < user.donhang.length) ? user.donhang[i + 1].maDon : null;

            // So sánh mã đơn hàng hiện tại với mã đơn hàng tiếp theo
            if (currentOrderId != nextOrderId) {
                listOrderHTML.innerHTML += `
                <tr title="click xem chi tiết đơn hàng" onclick="showContainerProducts('${user.donhang[i].maDon}')">
                    <td>${user.donhang[i].maDon}</td>
                    <td>${user.donhang[i].date}</td>
                    <td>${user.donhang[i].tongtien}đ</td>
                    <td>${user.donhang[i].pttt}</td>
                    <td>${user.donhang[i].ttdon}</td>
                    <td style="padding: 0 20px; cursor: pointer;"  onclick="cancel_order('${user.donhang[i].maDon}')" title="Hủy đơn hàng" >X</td>
                </tr>
                <div id="showContainerProducts-${user.donhang[i].maDon}" class="showContainerProducts">
                    
                </div>
                `;
                
            }
        }
    }
}

function showContainerProducts(ma){
    var user = getCurrentUser();
    var showProducts = document.getElementById('showContainerProducts-' + ma);
    if(showProducts.innerHTML === ''){
        for(var i = 0; i<user.donhang.length; i++){
            if(ma === user.donhang[i].maDon){
                showProducts.innerHTML += ` <div class="product-container">
                <img class="img-products" src="${user.donhang[i].imgProduct}" alt="Product Image">
                <div class="product-details">
                    <div class="product-name">${user.donhang[i].tenProduct}</div>
                    <div class="product-quantity">Số lượng: ${user.donhang[i].soLuongProduct}</div>
                </div>
            </div>
                `
            }
        }
    } else {
        showProducts.innerHTML = '';
    }
    
}
function datLaiMK(event) {
    event.preventDefault(); // Ngăn hành vi mặc định của form

    // Lấy giá trị từ các trường nhập liệu
    var currentPassword = document.getElementById('current-password').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    
    // Lấy thông tin người dùng hiện tại và danh sách người dùng
    var user = getCurrentUser();
    var listUser = getListUser();
    
    // Tìm người dùng trong danh sách
    var userToUpdate = listUser.find(u => u.username === user.username);

    if (userToUpdate) {
        if (currentPassword === userToUpdate.pass) {
            if (newPassword === confirmPassword) {
                userToUpdate.pass = newPassword;
                alert('Đã đổi mật khẩu');
                
                // Cập nhật danh sách người dùng với mật khẩu mới
                setListUser(listUser);
                
                // Cập nhật thông tin người dùng hiện tại nếu cần
                setCurrentUser(userToUpdate);
            } else {
                alert('Mật khẩu xác nhận không khớp');
            }
        } else {
            alert('Mật khẩu hiện tại không đúng');
        }
    } else {
        alert('Người dùng không tồn tại trong danh sách');
    }
    console.log(userToUpdate);
}

function cancel_order(maDon){
    var user = getCurrentUser();
    for (var i = 0; i < user.donhang.length; i++) {
        if(user.donhang[i].maDon === maDon){
            user.donhang.splice(i, 1);
            break;
        }
    }
    setCurrentUser(user);
    showInfoOrder(user);
}

function showInfoClient(user){
    document.getElementById('helloClient').textContent = 'Xin chào ' + user.hoTen;
    // Cập nhật giá trị vào các phần tử input (nếu là input field)
    document.getElementById('nameClient').value = user.hoTen;
    document.getElementById('phoneClient').value = user.phone;
    document.getElementById('sexClient').value = user.sex;
    document.getElementById('numberHomeClient').value = user.numberHome;
    document.getElementById('streetClient').value = user.street || '*';
    document.getElementById('villageClient').value = user.village || '*';
    document.getElementById('districtClient').value = user.district || '*';
    document.getElementById('provinceClient').value = user.province || '*';
    document.getElementById('button-update-info-account').innerHTML = '<button class="btn-info-account" onclick="capNhatThongTin()">Cập nhật thông tin</button>';
}
function capNhatThongTin(){
    document.getElementById('nameClient').removeAttribute('disabled');
    document.getElementById('phoneClient').removeAttribute('disabled');
    document.getElementById('sexClient').removeAttribute('disabled');
    document.getElementById('numberHomeClient').removeAttribute('disabled');
    document.getElementById('streetClient').removeAttribute('disabled');
    document.getElementById('villageClient').removeAttribute('disabled');
    document.getElementById('districtClient').removeAttribute('disabled');
    document.getElementById('provinceClient').removeAttribute('disabled');
    document.getElementById('button-confirm-update-info-account').innerHTML = '<button class="btn-info-account" onclick="xacNhanThongTin()">Xác nhận thông tin</button>';
    document.getElementById('button-update-info-account').innerHTML = '';
}
function xacNhanThongTin(){
    var user = getCurrentUser();
    user.phone = document.getElementById('phoneClient').value;
    user.sex = document.getElementById('sexClient').value;
    user.numberHome = document.getElementById('numberHomeClient').value;
    user.street = document.getElementById('streetClient').value;
    user.village = document.getElementById('villageClient').value;
    user.district = document.getElementById('districtClient').value;
    user.province = document.getElementById('provinceClient').value;
    setCurrentUser(user);

    var listUser = getListUser();

    // Tìm người dùng trong danh sách và cập nhật thông tin
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].username === user.username) {
            listUser[i] = user;  // Cập nhật người dùng trong danh sách
            break;
        }
    }

    // Lưu lại danh sách người dùng đã cập nhật
    setListUser(listUser);

    alert('Đặt lại thông tin thành công');
    document.getElementById('button-confirm-update-info-account').innerHTML = '';
    document.getElementById('button-update-info-account').innerHTML = '<button class="btn-info-account" onclick="capNhatThongTin()">Cập nhật thông tin</button>';

}