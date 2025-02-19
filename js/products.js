var list_products1 = list_products;
var list_products2;
// var tam = false;
var totalPages, products, itemsPerPage, luuticklocgia=0;
var xxx;
window.onload = function () {
    khoiTao();
    // lấy danh sách sản phẩm    
    setCurrentProducts(list_products1);
    // gán danh sách vào xxx
    xxx = getCurrentProducts();
    //sắp xếp, mảng lọc thể loại, hiển thị sản phẩm
    xxx.sort((a, b) => a.name.localeCompare(b.name));
    const filteredItems = xxx.filter(item => item.type === phanTich_URL_phanLoaiSanPham());
    filteredItems.forEach(item => {
        addProductToProducts(item);
    });
    //cập nhật danh sách sản phẩm,
    setCurrentProducts(filteredItems);

    
    itemsPerPage = 12;
    products = document.querySelectorAll('#listProductFilter .orderByPage');
    totalPages = Math.ceil(products.length / itemsPerPage);
    changePage(1);
}

var typeProduct;
function phanTich_URL_phanLoaiSanPham(){
    typeProduct = window.location.href.split('?')[1]; // lấy tên
    typeProduct = typeProduct.split('type=').join('');
    return typeProduct;
}

let giatritimkiem = [0, 'a'];
function orderByProducts(sortType, clickedButton) {
    alert(giatritimkiem[0]);
    if(sortType.match(/\d+/)===null){
        giatritimkiem[0] = giatritimkiem[0];
        if(luuticklocgia===0 && giatritimkiem[0]===0){
            giatritimkiem[0]=10000000;
        }
    }else {
        giatritimkiem[0] = sortType.match(/\d+/);
    }
    giatritimkiem[1] = sortType.replace(/\d+$/, '');
    
    xxx = getCurrentProducts();
    alert('s'+luuticklocgia + '-'+giatritimkiem[0]);
    
    xxx = list_products.filter(item => item.type === phanTich_URL_phanLoaiSanPham());
    xxx.sort((a, b) => b.sell - a.sell);
    const filteredItemss = xxx.filter(item =>  (item.priceQuantity <= giatritimkiem[0]) && (item.priceWeight <= giatritimkiem[0]));
            
    setCurrentProducts(filteredItemss);
    luuticklocgia = giatritimkiem[0]; 
    switchCase(giatritimkiem[1]);
       
    
    // Xóa lớp active khỏi tất cả các nút
    document.querySelectorAll('.filter__button').forEach(button => button.classList.remove('filter__button--active'));
    // Thêm lớp active cho nút được nhấp
    clickedButton.classList.add('filter__button--active');
    
   

    xxx = getCurrentProducts();
    var productContainer = document.getElementById('listProductFilter');
    productContainer.innerHTML = '';
    
    for (var i = 0; i < xxx.length; i++) {
        addProductToProducts(xxx[i]);
    }
    
    products = document.querySelectorAll('#listProductFilter .orderByPage');
    totalPages = Math.ceil(products.length / itemsPerPage);
    changePage(1);

    // Xóa tick các checkbox khác mỗi khi ấn tick
    var checkboxes = document.querySelectorAll('.price-filter__form .price-filter__input');
    checkboxes.forEach(function(cb) {
        if (cb !== clickedButton) {
            cb.checked = false;
        }
    });
}
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// -------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

function orderByProducts1(sortType, clickedButton) {
   
    const sortTypeKeyNum = sortType.match(/\d+/);
    const sortTypeKeyStr = sortType.replace(/\d+$/, '');
    xxx = getCurrentProducts();
    alert('s'+luuticklocgia + '-'+sortTypeKeyNum + sortTypeKeyStr);
    if (sortTypeKeyStr === 'price') {
        if (parseInt(sortTypeKeyNum) != parseInt(luuticklocgia)) {
            xxx = list_products.filter(item => item.type === phanTich_URL_phanLoaiSanPham());
            xxx.sort((a, b) => b.sell - a.sell);
            const filteredItemss = xxx.filter(item =>  (item.priceQuantity <= sortTypeKeyNum) && (item.priceWeight <= sortTypeKeyNum));
            setCurrentProducts(filteredItemss);
           
            luuticklocgia = sortTypeKeyNum; 
            // alert('ss'+luuticklocgia + '-'+sortTypeKeyNum);
            // if (tam === true) {
            //     alert('tam2');
            //     xxx = list_products.filter(item => item.type === phanTich_URL_phanLoaiSanPham());
            //     setCurrentProducts(xxx);
            //     tam = 0;
            // }
            // tam=false;
        } else if (parseInt(sortTypeKeyNum) === parseInt(luuticklocgia)){
            // tam = true;
            xxx = list_products.filter(item => item.type === phanTich_URL_phanLoaiSanPham());
            setCurrentProducts(xxx);
            luuticklocgia = 0;
            alert('2222');
        }
    }else if (sortTypeKeyStr != 'price') {
        switchCase(sortType);

        // Xóa lớp active khỏi tất cả các nút
        document.querySelectorAll('.filter__button').forEach(button => button.classList.remove('filter__button--active'));
        // Thêm lớp active cho nút được nhấp
        clickedButton.classList.add('filter__button--active');
    }
   

    xxx = getCurrentProducts();
    var productContainer = document.getElementById('listProductFilter');
    productContainer.innerHTML = '';
    
    for (var i = 0; i < xxx.length; i++) {
        addProductToProducts(xxx[i]);
    }
    
    products = document.querySelectorAll('#listProductFilter .orderByPage');
    totalPages = Math.ceil(products.length / itemsPerPage);
    changePage(1);

    // Xóa tick các checkbox khác mỗi khi ấn tick
    var checkboxes = document.querySelectorAll('.price-filter__form .price-filter__input');
    checkboxes.forEach(function(cb) {
        if (cb !== clickedButton) {
            cb.checked = false;
        }
    });
}

function switchCase(sortType) {
    xxx = getCurrentProducts();
    switch (sortType) {
        case 'a':
            xxx.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'z':
            xxx.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'new':
            xxx.sort((a, b) => {
                const dateA = new Date(a.dateAdded);
                const dateB = new Date(b.dateAdded);
                return dateB - dateA;
            });
            ;
            break;
        case 'cao':
            xxx.sort((a, b) => a.discount - b.discount);
            break;
        case 'thap':
            xxx.sort((a, b) => b.discount - a.discount);
            break;
        case 'chay':
            xxx.sort((a, b) => b.sell - a.sell);
            break;
        case 'price':
            break;
    }
    setCurrentProducts(xxx);
}

function showPage(pageNumber) {
    products.forEach(product => product.style.display = 'none');
    // Tính toán chỉ số sản phẩm để hiển thị
    const start = (pageNumber - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, products.length);

    // Hiển thị sản phẩm cho trang hiện tại
    for (let i = start; i < end; i++) {
        products[i].style.display = 'block';
    }
}

function changePage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        showPage(pageNumber);
    }
}
