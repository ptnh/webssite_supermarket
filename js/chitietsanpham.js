var priceSell, quantity, totalMoney, btnDescription, descriptiveParagraph;
window.onload = function () {
    khoiTao();
    phanTich_URL_chiTietSanPham();
   
    thaydoianh();
    btnDescription = document.getElementById('btnDescriptionProduct');
    descriptiveParagraph = document.querySelector('.productDescription_detail-text');
    motasudung();
    priceSell = document.querySelector('.info__product_price--sell--promotion');
    quantity = document.getElementById('quantity__product_select');
    totalMoney = document.querySelector('.info__product_totalprice--money');
    
    // thêm chức nang giảm giá
    magiamgia();
   
    btntinhtien();
    tinhtien();
    handleScroll();
   
}
var nameProduct;

function phanTich_URL_chiTietSanPham() {
    var user = getCurrentUser();
    nameProduct = window.location.href.split('?')[1]; // lấy tên
    nameProduct = nameProduct.split('masp=').join('');

    
    var soLuongTam=0;
    
    for (var i = 0; i < user.products.length; i++){
        if(user.products[i].ma == nameProduct){
            soLuongTam = user.products[i].soluong;
        }
    }
    
    
    for (var i = 0; i < list_products.length; i++) {
		
        if(nameProduct === list_products[i].masp){
            addProductDetailToWeb(list_products[i],soLuongTam);
            
            break;
        }
	}
    
}
  // ---------------------------- thay đổi ảnh sản phẩm ----------------------------
function thaydoianh(){
  
    // Lấy phần tử chính và các phần tử con
    let imgMain = document.querySelector('.product_image');
    let imgChildren = document.querySelectorAll('.product_img--chlid');
    // Lặp qua từng phần tử con để thêm sự kiện click
    imgChildren.forEach(imgChild => {
        imgChild.addEventListener('click', function(event) {
            // Xóa class 'product_img--chlid-focus' từ tất cả các phần tử con
            imgChildren.forEach(child => {
                child.classList.remove('product_img--chlid-focus');
            });

            // Thêm class 'product_img--chlid-focus' cho phần tử con được click
            imgChild.classList.add('product_img--chlid-focus');
            // Lấy đường dẫn ảnh từ phần tử con được click
            let newImageUrl = event.target.src;

            // Thay đổi ảnh của phần tử chính   
            imgMain.src = newImageUrl;

        });
    });
}
// ---------------------------- thay đổi ảnh sản phẩm ----------------------------
// ---------------------------- mô tả cách mua hàng, cách sử dụng ----------------------------
function motasudung(){
   
// let btnDescription = document.getElementById('btnDescriptionProduct');
let btnShoppingGuide = document.getElementById('btnShoppingGuide');

btnDescription.classList.add('productDescription_list-btn-active');

for(var p of list_products){
    if(nameProduct === p.masp){
        descriptiveParagraph.innerHTML = p.describe;
        break;
    }
}

btnDescription.onclick = function(){
    if (btnShoppingGuide.classList.contains('productDescription_list-btn-active')) {
        btnShoppingGuide.classList.remove('productDescription_list-btn-active');
    }
    btnDescription.classList.add('productDescription_list-btn-active');

    for(var p of list_products){
        if(nameProduct === p.masp){
            descriptiveParagraph.innerHTML = p.describe;
            break;
        }
    }

    
};

btnShoppingGuide.onclick = function(){
    if (btnDescription.classList.contains('productDescription_list-btn-active')) {
        btnDescription.classList.remove('productDescription_list-btn-active');
    }
    btnShoppingGuide.classList.add('productDescription_list-btn-active');
    for(var p of list_products){
        if(nameProduct === p.masp){
            descriptiveParagraph.innerHTML = p.shoppingGuide;
            break;
        }
    }
};
}
// ---------------------------- mô tả cách mua hàng, cách sử dụng ----------------------------
function magiamgia(){
    var code = document.getElementById('showListGiamGia');
    code.innerHTML = `
    <div class="discountTicket">
                        <div class="discountTicket_info">
                            <div class="discountTicket_info--basic">
                                <p class="discountTicket_info--basic--name">DOLA30</p>
                                <p class="discountTicket_info--basic--value">Giảm 30.000đ giá trị đơn hàng</p>
                            </div>
                            <div class="discountTicket_info--icon">
                                <p class="discountTicket_info--icon--p">i</p>
                            </div>
                        </div>
                        <div class="discountTicket_expiry">
                            <p class="discountTicket_expiry--time">HSD: 1/10/2023</p>
                            <p class="discountTicket_expiry--copy" data-code="DOLA30" onclick="copyToClipboard(this)">Sao chép</p>
                        </div>
                    </div>
                    `;
}


// ---------------------------- tính tiền sản phẩm ----------------------------
function btntinhtien(){
    if(document.getElementById('decrease-btn')){
        let btnDecrease = document.getElementById('decrease-btn');
        let btnIncrease = document.getElementById('increase-btn')
        btnDecrease.onclick = function (){
            let count = parseInt(quantity.textContent);
            let priceString = priceSell.textContent; // Chuỗi số tiền
            // Loại bỏ ký tự 'đ' và dấu chấm phân cách hàng nghìn (nếu có)
            priceString = priceString.replace(/[.đ]/g, '');
            // Chuyển đổi thành số nguyên
            let priceNum = parseInt(priceString);
        
            if(count === 0){
                // btnDecrease.style.backgroundColor = 'rgb(123,125,127)';
            } else {
                count--;
            }
            let totalPrice = count * priceNum;
            totalMoney.textContent = formatCurrency(totalPrice);
            quantity.textContent = count;
        }
        btnIncrease.onclick = function (){
            let count = parseInt(quantity.textContent);
            let priceString = priceSell.textContent; // Chuỗi số tiền
            // Loại bỏ ký tự 'đ' và dấu chấm phân cách hàng nghìn (nếu có)
            priceString = priceString.replace(/[.đ]/g, '');
            // Chuyển đổi thành số nguyên
            let priceNum = parseInt(priceString);
        
            if(count < 10 ){
                count++;
            } else {
               
            }
            let totalPrice = count * priceNum;
            totalMoney.textContent = formatCurrency(totalPrice);
            quantity.textContent = count;
        }
    
    }
   
    }
    // ---------------------------- tính tiền sản phẩm ----------------------------
// ---------------------------- tính tiền ---------------------------------
function tinhtien(){
    // tính tiền
    let totalPrice;
   
    if(document.getElementById('decrease-btn')){
        let count = parseInt(quantity.textContent);
        let priceString = priceSell.textContent; // Chuỗi số tiền
        priceString = priceString.replace(/[.đ]/g, '');
        let priceNum = parseInt(priceString);
        totalPrice = count * priceNum;
        totalMoney.textContent = formatCurrency(totalPrice);
    } else {
        var user = getCurrentUser();
        let priceString = priceSell.textContent;
        priceString = priceString.replace(/[.đ]/g, '');
        let priceNum = parseInt(priceString);
        let nameProduct = window.location.href.split('?')[1]; // lấy tên
        nameProduct = nameProduct.split('masp=').join('');
    
        var soLuongTam=0;
        var priceWeight111 = 0;
        for (var i = 0; i < user.products.length; i++){
            if(user.products[i].ma == nameProduct){
                soLuongTam = user.products[i].soluong;
            }
        }
        totalMoney.textContent = soLuongTam *priceNum + `đ`;

        let inputElement = document.getElementById('value--weight');
        inputElement.value = soLuongTam;
    }

   
   
    

    // hình như không cần nữa
    // mô tả, hướng dẫn sản phẩm
    // btnDescription.classList.add('productDescription_list-btn-active')
    // descriptiveParagraph.textContent = 'hello';

    // focus vào ảnh thay thế đầu
    let imgChildren = document.querySelectorAll('.product_img--chlid');
    imgChildren[0].classList.add('product_img--chlid-focus');
}
// ---------------------------- tính tiền ---------------------------------



// ---------------------------- Thêm sản phẩm vào giỏ hàng ---------------------------------
function themSanPhamVaoGioHang(masp){
    var quantityAdd;
    if(document.getElementById('value--weight')){
        var inputValue = document.getElementById('value--weight').value;    
        quantityAdd = parseFloat(inputValue, 10);
    } else {
        quantityAdd = parseInt(quantity.textContent);
    }
   
    console.log(quantityAdd);
    var user = getCurrentUser();
    if (!user) {
        notification(`fa-solid fa-user`,`Bạn cần đăng nhập để mua hàng`,`yellow`);
        window.location.href = 'file:///F:/website-business/handleAccount/handleAccount.html';
        return;
    }
    if (user.off) {
        notification(`fa-solid fa-user`,`Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!`,`yellow`);
       
        return;
    }
    var t = new Date();
    var daCoSanPham = false;;

    for (var i = 0; i < user.products.length; i++) { // check trùng sản phẩm
        if (user.products[i].ma == masp) {
            user.products[i].soluong = quantityAdd;
            daCoSanPham = true;
            break;
        }
    }

    if (!daCoSanPham) { // nếu không trùng thì mới thêm sản phẩm vào user.products
        user.products.push({
            "ma": masp,
            "soluong": quantityAdd,
            "date": t
        });
    }

    setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
    capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng
    console.log(user.products);
    notification(`fa-solid fa-circle-check`,`Thêm sản phẩm thành công!`,`green`);
}

// ---------------------------- Thêm sản phẩm vào giỏ hàng ---------------------------------
// ---------------------------- Cập nhật giá tiền riêng thẻ input ---------------------------------
function updatePrice(value) {
    totalMoney.textContent = 0 ;
    var price;
    
    for(var p of list_products){
        if(nameProduct === p.masp){
            price = p.priceWeight === 0 ? p.priceQuantity : p.priceWeight;
        }
      
    }
    if(value > 0){
        totalMoney.textContent = formatCurrency(parseFloat(value) * price);  
    }
}

// ---------------------------- Cập nhật giá tiền riêng thẻ input ---------------------------------
