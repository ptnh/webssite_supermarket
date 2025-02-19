
window.onload = function () {
    khoiTao();
    addButtonPage = document.getElementById('pagination');
    list_products.sort(function(a, b) {
        return b.sell - a.sell;
    });
    
    for (var i = 0; i < list_products.length; i++) {
		addProductToWeb(list_products[i]);
	}
    var user = getCurrentUser();
    console.log(user.products);
    var listBills = getCurrentBill();
    console.log(listBills);

    // lấy số lượng sản phẩm để tính phân trang
    products = document.querySelectorAll('#showListProduct1 .orderByPageHome');
    totalPageHome = Math.ceil(products.length / itemsPerPageHome);
    
    addButtonPageHome(totalPageHome);
    changePageHome(1);
    // Gọi hàm để chèn nút chat Zalo vào cuối body
    handleScroll();
}

// -------------------- phân loại sản sản ------------------------
function showProducts(typeProduct){
    // xóa sản phẩm đã hiển thị trước đó
    var productss = document.getElementById('showListProduct1');
	productss.innerHTML = '';
    // xóa phân trang trước đó
    addButtonPage.innerHTML='';

    for (var i = 0; i < list_products.length; i++) {
        if (list_products[i].type === typeProduct || typeProduct === 'all') {
            addProductToWeb(list_products[i]);
        }
    }
    products = document.querySelectorAll('#showListProduct1 .orderByPageHome');
    totalPageHome = Math.ceil(products.length / itemsPerPageHome);
    addButtonPageHome(totalPageHome);
    changePageHome(1);
}
// -------------------- phân loại sản sản ------------------------

function addListMenu(){
    document.write(`   <div class="menu-second">
            <div class="text-icon ">
                <p class="text-box-menu text-green-30">Danh mục nổi bật</p>
                <img class="image-icon-box-menu" src="public/icon/la.png">
            </div>
            <div class="menu-box">
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=raucuqua">
                        <img class="img-box-link" src="public/icon/danhmuc_1.webp">
                        <p class="text-green-20">Rau củ</p>
                    </a>
                </div>
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=traicay">
                        <img class="img-box-link" src="public/icon/trai_cay_box_link.webp">
                        <p class="text-green-20">Trái cây</p>
                    </a>
                </div> 
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=nuoc">
                        <img class="img-box-link" src="public/icon/nuoc_ep_box_link.webp">
                        <p class="text-green-20">Nước ép</p>
                    </a>
                </div> 
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=dokho">
                        <img class="img-box-link" src="public/icon/do_kho_box_link.webp">
                        <p class="text-green-20">Đồ khô</p>
                    </a>
                </div>
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=traicay">
                        <img class="img-box-link" src="public/icon/trai_cay_box_link.webp">
                        <p class="text-green-20">Salad</p>
                    </a>
                </div> 
                <div class="box-link">
                    <a class="a-box-link" href="/website-business/products.html?type=khac">
                        <img class="img-box-link" src="public/icon/thuc_pham_khac.webp">
                        <p class="text-green-20">Thực phẩm khác</p>
                    </a>
                </div>
            </div>
        </div>`);
}

// --------------phân trang chủ ---------------------
function showPageHome(pageNumber) {

    products.forEach(product => product.style.display = 'none');
    products.forEach(product => {
        product.classList.remove('activephanTrang');
    });
    
    // Tính toán chỉ số sản phẩm để hiển thị
    const start = (pageNumber - 1) * itemsPerPageHome;
    const end = Math.min(start + itemsPerPageHome, products.length);

    // Hiển thị sản phẩm cho trang hiện tại
    for (let i = start; i < end; i++) {
        products[i].style.display = 'block';
    }
   
   
    // Chọn tất cả các nút phân trang
    var paginationButtons = document.querySelectorAll('.phantrang');

    // Xóa lớp 'activephanTrang' khỏi tất cả các nút phân trang
    paginationButtons.forEach(button => button.classList.remove('activephanTrang'));
 
     // Thêm lớp 'activephanTrang' cho nút phân trang tương ứng với trang hiện tại
    if (pageNumber - 1 < paginationButtons.length) {
        paginationButtons[pageNumber - 1].classList.add('activephanTrang');
    }
}

function changePageHome(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPageHome) {
        showPageHome(pageNumber);
    }
}
// --------------phân trang chủ ---------------------
// -------------- thêm số trang tùy sản phẩm -------------------
function addButtonPageHome(totalPage){
    var stringAddPage='';
    for(var i = 0; i < totalPage; i++){
        stringAddPage += `<button class='phantrang' onclick="changePageHome(${i+1})">${i+1}</button>`
    }
    addButtonPage.innerHTML = stringAddPage;

}
// -------------- thêm số trang tùy sản phẩm -------------------