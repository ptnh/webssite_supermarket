function User(username, pass, hoTen, phone, sex, numberHome, street, village, district, province, products, donhang) {
	this.hoTen = hoTen || '';
	this.username = username;
	this.pass = pass;
    this.phone = phone;
    this.sex = sex || '';
    this.numberHome = numberHome || '';
    this.street = street||'';
    this.village = village||'';
    this.district = district||'';
    this.province = province||'';
	this.products = products || [];
	this.donhang = donhang || [];
}

function Product(masp, name, img, priceQuantity, priceWeight, discount, imgChild1, imgChild2, imgChild3,type, describe, shoppingGuide) {
	this.masp = masp;
    this.name = name;
	this.img = img;
    this.imgChild1 = imgChild1;
    this.imgChild2 = imgChild2;
    this.imgChild3 = imgChild3;
	this.price = priceQuantity;
	this.price = priceWeight;
	this.discount = discount;
    this.type = type;
    this.describe =  describe;
    this.shoppingGuide = shoppingGuide;
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function addProductToWeb(p){
    let priceShow;
    if(p.priceQuantity === 0){
        priceShow = p.priceWeight;
    } else if (p.priceWeight === 0){
        priceShow = p.priceQuantity;
    }
  
    var newDivProduct = `
        <div class="listProducts_item orderByPageHome">
        <a href="file:///F:/website-business/chitietsanpham.html?masp=` + p.masp + `" class="link_detailProduct">
            <img src="` + p.img + `" alt="" class="listProducts_item--img">
            <div class="boxHidden">
                <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
                <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
                <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
            </div>
        </a>
        <div class="listProducts_item--info">
            <div class="listProducts_item--info--name text-black-20">` +p.name+ `</div>
            <div class="listProduct_item--info--price">
                <div class="price_box--new textchung">`+formatCurrency(priceShow)+`</div>
                <div class="price_box--old price_discount">`+formatCurrency(p.discount)+`</div>
            </div>
            <button class="listProduct_item--info--btn"  onclick="themVaoGioHang('`+p.masp+`', '`+p.name+`', '`+p.priceQuantity+`', '`+p.priceWeight+`', '`+ p.img +`')">Thêm vào giỏ hàng</button>    
        </div>
    </div>
    `
    var products = document.getElementById('showListProduct1');
	products.innerHTML += newDivProduct;
}
function addProductToProducts(p){
    let priceShow;
    if(p.priceQuantity === 0){
        priceShow = p.priceWeight;
    } else if (p.priceWeight === 0){
        priceShow = p.priceQuantity;
    }
    formatCurrency(priceShow);
    var newDivProduct = `
        <div class="listProducts_item orderByPage">
            <a href="file:///F:/website-business/chitietsanpham.html?masp=` + p.masp + `" class="link_detailProduct">
                <img src="` + p.img + `" alt="" class="listProducts_item--img">
                <div class="boxHidden">
                    <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
                    <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
                    <button class="buttonLinkBoxHidden"><i class="iconBoxHidden fa-solid fa-bars"></i></button>
                </div>
            </a>
            <div class="listProducts_item--info">
                <div class="listProducts_item--info--name textchung">` +p.name+ `</div>
                <div class="listProduct_item--info--price">
                    <div class="price_box--new textchung">`+priceShow+`</div>
                    <div class="price_box--old textchung">`+p.discount+`</div>
                </div>
                <button class="listProduct_item--info--btn"  onclick="themVaoGioHang('`+p.masp+`', '`+p.name+`', '`+p.priceQuantity+`', '`+p.priceWeight+`', '`+ p.img +`')">Thêm vào giỏ hàng</button>    
            </div>
        </div>
    `
    var products = document.getElementById('listProductFilter');
	products.innerHTML += newDivProduct;
}

function addProductDetailToWeb(p, soluong){

    let priceShow;
    if(p.priceQuantity === 0){
        priceShow = p.priceWeight;
    } else if (p.priceWeight === 0){
        priceShow = p.priceQuantity;
    }
    // priceWeightString = priceShow;
    // priceWeight = priceWeightString.replace(/[.đ]/g, '');
    
    // priceDiscountString = p.discount;
    // priceDiscount = priceDiscountString.replace(/[.đ]/g, '');
        
    priceSave = priceShow - p.discount;
  
    // Loại bỏ ký tự 'đ' và dấu chấm phân cách hàng nghìn (nếu có)
   
    var detailProductString = ` <div class="product">
    <img class="product_image" src="`+p.img + `">
    <div class="product_advertisement">
        <img class="product_advertisement--svg" src="../flash.svg">
        <p class="product_advertisement--text">Khuyễn mãi chỉ còn:</p>
    </div>
    <div class="product_img">
        <img class="product_img--chlid" src="`+p.imgChild1+`">
        <img class="product_img--chlid" src="`+p.imgChild2+`">
        <img class="product_img--chlid" src="`+p.imgChild3+`">
    </div>
</div>

<div class="tam">
        <!-- css cho thao tác chọn sp -->
    <div class="info__product">
        <p class="info__product_name">`+p.name+`</p>
        <p class="info__product_status">Tình trạng: <span class="info__product_status--span">còn hàng</span></p>
        <div class="info__product_price">
            <div class="info__product_price--sell">
                <div class="info__product_price--sell--promotion"><span class="info__product_price--sell--promotion--span">`+formatCurrency(priceShow)+`</span></div>
                <div class="info__product_price--sell--old">`+formatCurrency(p.discount)+`</div>
            </div>
            <div class="info__product_price--economical">
                <p class="info__product_price--economical--text">Tiết kiệm: <sapn class="info__product_price--economical--text--span">`+priceSave+`₫</sapn></p>
            </div>
        </div>`;

        if(p.priceQuantity){
            detailProductString = detailProductString + `<div class="info__product_value">
            <div class="info__product_value--quantity">
                <p class="info__product_value--quantity--text">Số lượng:</p>
                <div class="info__product_value--quantity--select">
                    <button class="info__product_value--quantity--select--btn" id="decrease-btn">-</button>
                    <span id="quantity__product_select">`+soluong+`</span>
                    <button class="info__product_value--quantity--select--btn" id="increase-btn">+</button>
                </div>
            </div>
            
        </div>`
        } else {
            detailProductString = detailProductString + `<div class="info__product_value">
            <div class="info__product_value--weight">
                <p class="info__product_value--weight--text">Trọng lượng:</p>
                <input type="text" id="value--weight" name="value--weight"  oninput="updatePrice(this.value)"><span>kg</span>
            </div>
        </div>`
        }

        detailProductString = detailProductString + `<div class="info__product_totalprice">
            <p class="info__product_totalprice--text">Thành tiền:</p>
            <p class="info__product_totalprice--money">0đ</p>
        </div>
        <button class="info__product_addcart" onclick="themSanPhamVaoGioHang('`+p.masp+`')">
            Thêm vào giỏ hàng
        </button>
    </div>
    <!-- giá cả, khuyển mãi,... -->
    <div class="special__program">
        <div class="special__program_slogan">
            <img class="special__program_slogan-icon" src="public/icon/giftbox.webp">
            <p class="special__program_slogan-text">Khuyến mãi đặc biệt !!!</p>
        </div>
        <div class="special__program_content">
            <div class="special__program_content-detail">
                <img class="special__program_content-detail-icon" src="public/icon/km_product1.webp" alt="">
                <p class="special__program_content-detail-text">Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng.</p>
            </div>
            <div class="special__program_content-detail">
                <img class="special__program_content-detail-icon" src="public/icon/km_product1.webp" alt="">
                <p class="special__program_content-detail-text">Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng.</p>
            </div>
            <div class="special__program_content-detail">
                <img class="special__program_content-detail-icon" src="public/icon/km_product3.webp" alt="">
                <p class="special__program_content-detail-text">Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng.</p>
            </div>
        </div>
    </div>
</div>`;
    var detailProduct = document.getElementById('showDetailProduct1');
    detailProduct.innerHTML = detailProductString;
}