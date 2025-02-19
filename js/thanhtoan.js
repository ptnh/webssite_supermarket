var valueCheck, moneyProduct, moneyTransfort = 20000 ;
window.onload = function () {
    var user = getCurrentUser();
    console.log(user);
    
    let hoVaTen = document.getElementById('fullname');
    hoVaTen.value = user.hoTen;
    let phone = document.getElementById('phone');
    phone.value = user.phone;
    let address = document.getElementById('address');
    address.value = user.street+', '+user.village+', '+user.district+', '+user.province;;

    printListProductBill();

    const checkboxes = document.querySelectorAll('.payment-info__checkbox');     
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            valueCheck = checkbox.value;
        }
    });
    // Lắng nghe sự kiện thay đổi trên các checkbox
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // Lấy giá trị của các checkbox đã chọn và lưu vào biến
            valueCheck = checkbox.value;
            
        });
    });

}

function datHang(){
    if(checkFullInfoClient()===true){
        var inputPhone = document.getElementById('phone'); 
        var inputAddress = document.getElementById('address'); 
        var checkTransfer = document.getElementById('transfer');
        var checkCod = document.getElementById('cod');
        var checkShop = document.getElementById('shop');
        var tienDH = document.getElementById('sumMoneyOrder');
        // console.log(parseInt(tienDH.textContent)*1000);
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        if (inputPhone.value.trim() != '' && inputAddress.value.trim() != '' ){ // Kiểm tra giá trị của input
            var user = getCurrentUser();
            // var listBill = getCurrentBill();
            // console.log(listBill);
            for(i = 0; i<user.products.length; i++){
                user.donhang.push({
                    "user": user.hoTen,
                    "maDon": 'DH'+seconds+minutes+hours+day+month+year,
                    "tongtien": parseInt(tienDH.textContent)*1000,
                    "date": user.products[i].date,
                    "pttt": valueCheck,
                    "ttdon": 'Chờ xác nhận',
                    "maProduct": user.products[i].ma,
                    "tenProduct": user.products[i].ten,
                    "imgProduct": user.products[i].img,
                    "soLuongProduct": user.products[i].soluong,
                });
                
                // Loại bỏ sản phẩm khỏi user.products
                user.products.splice(i, 1);
            
                // Giảm chỉ mục i sau khi loại bỏ phần tử để không bỏ lỡ phần tử nào
                i--;
            }  
            setCurrentUser(user);
            // setCurrentBill(listBill);
            // console.log(listBill);
            window.location.href=('file:///F:/website-business/canhan.html');
        } else {
            notification('icon', 'bạn vui lòng nhập đủ thông tin', 'yellow')
        
        }
    }
}

function printListProductBill(){
    moneyProduct = 0;
    var p = ``;
    var user = getCurrentUser();
    // console.log(user.products);
    var countOrder=0;
    for(i=0; i< user.products.length;i++){
        p += `
        <div class="payment-info__product-list" >
        <div style="display: flex; align-items: center;">
            <img src=${user.products[i].img} alt="" class="img_listProduct">
            <p class="payment-info__product-list-item--name ">${user.products[i].ten}</p>
        </div>
        <div style="display: flex; align-items: center;">
            <p class="payment-info__product-list-item--quantity ">${user.products[i].soluong}</p>  
            <p class="payment-info__product-list-item--price ">`+formatCurrency(`${user.products[i].tongtien}`)+`</p>  
        </div>
    </div>
        `;
        // moneyProduct += parseInt(user[products[i].money]);
        moneyProduct += parseInt(user.products[i].tongtien*user.products[i].soluong);
        countOrder++;
    }
    document.getElementById('countOrder').textContent = 'Đơn hàng (' + countOrder + ')';
    var s = document.getElementById('listProductBill');
    s.innerHTML = p; // Use innerHTML to set the content
    
    // áp dụng mã giảm giá


    var provisionalCosts = document.getElementById('provisionalCosts');
    provisionalCosts.textContent = formatCurrency(moneyProduct);
   
    var sumMoneyOrder = document.getElementById('sumMoneyOrder');
    sumMoneyOrder.textContent = formatCurrency(moneyProduct + moneyTransfort); 
}
var soPhieuGiam = 0;
function apdung(){
    var code = document.getElementById('discountCode').value;
    for(var i = 0; i< codeDiscount.length; i++){
        if(code === codeDiscount[i].textID && soPhieuGiam === 0){
            moneyProduct=moneyProduct-codeDiscount[i].giatrigiam;
            provisionalCosts.textContent = formatCurrency(moneyProduct);
            sumMoneyOrder.textContent = formatCurrency(moneyProduct + moneyTransfort);
            soPhieuGiam++;
        } else if(soPhieuGiam === 1){
            notification('icon', 'Một đơn hàng chỉ áp dụng một thẻ giảm giá.', 'yellow');
        }
    }

}
// check khách hàng đăng ký và cập nhật đầy đủ thông tin chưa
function checkFullInfoClient(){
    var user = getCurrentUser();
    if(!user.sex || !user.numberHome || !user.street || !user.village || !user.district || !user.province ){
        alert('Bạn cần cập nhật đủ thông tin');
        window.location.href = 'file:///F:/website-business/canhan.html';
        return false;
    }
    return true;

}