
var adminInfo = [{
    "username": "admin",
    "pass": "adadad"
}];

var totalPageHome, products, itemsPerPageHome, addButtonPage;

function khoiTao() {
    itemsPerPageHome = 15;
    
    // get data từ localstorage
    list_products = list_products;
    capNhat_ThongTin_CurrentUser();
    // autocomplete cho khung tim kiem
	autocomplete(document.getElementById('search-box'), list_products);
    changeSlogan();
}

function closeAllLink(){
    var container = document.getElementById("list_search");
    container.innerHTML = "";
}

function autocomplete(inp, arr) {
    
    inp.addEventListener("keyup", function (e) {
        if (e.keyCode != 13 && e.keyCode != 40 && e.keyCode != 38) { // not Enter,Up,Down arrow
            var inputValue = this.value; // Lấy giá trị từ input
            closeAllLink();
            for (var i = 0; i < arr.length; i++) {    
                if (arr[i].name.toUpperCase().includes(inputValue.toUpperCase())) {
                    
                    // Tạo div và a mới cho mỗi phần tử thỏa mãn điều kiện
                    var divElement = document.createElement("div");
                    divElement.className = "new_link-search";
                    divElement.setAttribute("class", "link_search");
                    
                    var anchorElement = document.createElement("a");
                    anchorElement.setAttribute("href", `/website-business/chitietsanpham.html?masp=${arr[i].masp}`);

                    anchorElement.textContent = arr[i].name;
                    
                    divElement.appendChild(anchorElement); // Thêm a vào trong div
                    
                    var container = document.getElementById("list_search");
                    container.appendChild(divElement); // Thêm div vào trong container
                }
                
            }
            if(inputValue==''){
                closeAllLink();
            }
        }
       

        
        // <div class="link_search"><a href="#" class="link_product">search</a></div>
    });
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLink();
    });
}
// --------------------------- Format tiền -----------------------------------
function formatCurrency(number) {
    // Tạo đối tượng NumberFormat để định dạng số
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'symbol', // 'symbol' để hiển thị ký hiệu tiền tệ
    });
    
    // Định dạng số
    return formatter.format(number).replace('₫','đ').replace(/\s/g, ''); // Thay ký hiệu ₫ bằng đ
}

// --------------------------- Format tiền -----------------------------------

// --------------------------- Thêm header -----------------------------------
function addHeader(){
    var writeHeader = `
    <div class="header">
        <div class="header_top">
            <div class="header_top--advertisement">
                <i class="header_top--advertisement--icon icon-yellow fa-solid fa-bell"></i>  
                <p class="header_top--advertisement--text text-white-16" id="preferentialSlogan"></p>
            </div>
            <div class="header_top--contact">
                <i class="header_top--contact--icon fa-regular fa-comment"></i>
                <div class="header_top--contact--info">
                    <p class="header_top--contact--info--text">Tư vấn mua hàng</p>
                    <p class="header_top--contact--info--number"><strong>0379073235</strong></p>
                </div>
            </div>
        </div>
        <div class="header_center">
            <div class="header_center--logo">
                <a href="file:///F:/website-business/trangchu.html">
                    <img class="header_center--logo--img" src="public/icon/logo.png" alt="">
                </a>    
            </div>
            <form class="header_center--search input--search" method="get" action="index.html">
           
                <input id="search-box" name="search" class="header_center--search--input" type="text" placeholder="Tìm kiếm sản phẩm"></input>
                <button style="border: 1px solid yellow;" type="submit">
                    <i class="header_center--search--icon fa-solid fa-magnifying-glass"></i>
                </button>
                
                <div id="list_search">
                   
                </div>
            </form>
            <section class="header_center--user">
                <div class="header_center--user--account">
                    <div class="show_name_account">
                        <i  class="header_center--user--account--icon fa-solid fa-user"></i>
                    </div>
                    <div class="header_center--user--account--submenu">
                        <ul class="header_center--user--account--submenu--ul">
                        `;
    var user = getCurrentUser();
    if (!user) {
        writeHeader += ` 
        <li class="header_center--user--account--submenu--ul--li"><a class="header_center--user--account--submenu--ul--li--a" href="file:///F:/website-business/dangnhap.html">Đăng nhập</a></li>`;
    } else {
        writeHeader += `
        <li class="header_center--user--account--submenu--ul--li"><a class="header_center--user--account--submenu--ul--li--a" href="file:///F:/website-business/canhan.html">Cá nhân</a></li>
        <li class="header_center--user--account--submenu--ul--li"><a class="header_center--user--account--submenu--ul--li--a" onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">Đăng xuất</a></li>`;
    }
                
    writeHeader += `                     
                        </ul>
                    </div>
                    
                </div>
                <div class="header_center--user--cart">
                    <i class="header_center--user--cart--icon fa-solid fa-cart-shopping">
                        <span class="count_product">0</span>
                    </i>
                    <div class="header_center--user--cart--submenu">
                        <ul class="header_center--user--cart--submenu--ul">
                            <li class="header_center--user--cart--submenu--ul--li"><a class="header_center--user--cart--submenu--ul--li--a" href="file:///F:/website-business/giohang.html">Xem giỏ hàng</a></li>
                            <!-- <li><a href="#">Đăng nhập</a></li> -->
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <div class="header_menu">
            <div class="header_menu--left">
                <div class="header_menu--left--catalog">
                    <i class="header_menu--left--catalog--icon fa-solid fa-bars"></i>
                    <p class="header_menu--left--catalog--text">Danh mục sản phẩm</p>
                    <i class="header_menu--left--catalog--icon fa-solid fa-caret-down"></i>
                </div>
                <div class="header_menu--content">
                    <ul class="header_menu--content--ul">
                        <li class="header_menu--content--ul--li">
                            <div class="header_menu--content--ul--li--icon">
                                <img class="header_menu--content--ul--li--icon--img" src="public/icon/dohop.png">
                                <a href="file:///F:/website-business/products.html?type=thitca" class="header_menu--content--ul--li--icon--text text-black-20">Thịt và cá</a>
                            </div>
                            <i class="header_menu--content--ul--li--iconright fa-solid fa-arrow-right"></i>
                            <div class="header_menu--content--ul--li--menuchild">
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Thịt heo</p>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=heobachi" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Thịt ba chỉ</a>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=suonnonheo" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Sườn non</a>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=heobam" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Thịt băm</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Thịt bò</p>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=bobam"  class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Thịt băm</a>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=suonbo"  class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Sườn bò</a>
                                    <a href="file:///F:/website-business/chitietsanpham.html?masp=xuongbo" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Xương bò</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                <p href="#" class="header_menu--content--ul--li--menuchild--link--type text-green-20">Hải sản</p>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cá hồi</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cá tra</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Tôm</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cua</a>
                            </div>
                            </div>
                        </li>
                        <li class="header_menu--content--ul--li">
                            <div class="header_menu--content--ul--li--icon">
                                <img class="header_menu--content--ul--li--icon--img" src="public/icon/icon_rau_cu.jpg">
                                <a href="file:///F:/website-business/products.html?type=raucuqua"  class="header_menu--content--ul--li--icon--text text-black-20">Rau củ quả</a>
                            </div>
                            <i class="header_menu--content--ul--li--iconright fa-solid fa-arrow-right"></i>
                            <div class="header_menu--content--ul--li--menuchild">
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Rau</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Rau muống</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Rau cải</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Rau mồng tơi</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Rau dền</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Củ</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Khoai lang</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Khoai tây</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cà rốt</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Củ cải đỏ</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cut cải xoăn</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Quả</p>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dưa leo</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dưa chuột</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Cà chua</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Bí đao</a>
                                <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Bí ngô</a>
                            </div>
                            </div>
                        </li>
                        <li class="header_menu--content--ul--li">
                            <div class="header_menu--content--ul--li--icon">
                                <img class="header_menu--content--ul--li--icon--img" src="public/icon/icon_trai_cay.png">
                                <a href="file:///F:/website-business/products.html?type=traicay"  class="header_menu--content--ul--li--icon--text text-black-20">Trái cây</a>
                            </div>
                            <i class="header_menu--content--ul--li--iconright fa-solid fa-arrow-right"></i>
                            <div class="header_menu--content--ul--li--menuchild">
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Trái cây tươi</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dưa hấu</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dưa lưới</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dâu tây</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Xoài</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Chôm chôm</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Trái cây chế biến</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Mít sấy</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dừa sấy</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Khoai lang sấy</a>
                                </div>
                            </div>
                        </li>
                        <li class="header_menu--content--ul--li">
                            <div class="header_menu--content--ul--li--icon">
                                <img class="header_menu--content--ul--li--icon--img" src="public/icon/banhmi.webp">
                                <a  href="file:///F:/website-business/products.html?type=nuoc"  class="header_menu--content--ul--li--icon--text text-black-20">Nước uống</a>
                            </div>
                            <i class="header_menu--content--ul--li--iconright fa-solid fa-arrow-right"></i>
                            <div class="header_menu--content--ul--li--menuchild">
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Nước giải khát</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Pepsi</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Coca</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">7 up</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Red Bull</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Nước đóng chai</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Nước suối</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Nước khoáng</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Nước trái cây</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Nước cam</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Nước nho</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Nước dâu</a>
                                </div>      
                            </div>
                        </li>
                        <li class="header_menu--content--ul--li">
                            <div class="header_menu--content--ul--li--icon">
                                <img class="header_menu--content--ul--li--icon--img" src="public/icon/public/icon/thit.png">
                                <a  href="file:///F:/website-business/products.html?type=khac"  class="header_menu--content--ul--li--icon--text text-black-20">Khác</a>
                            </div>
                            <i class="header_menu--content--ul--li--iconright fa-solid fa-arrow-right"></i>
                            <div class="header_menu--content--ul--li--menuchild">
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Gia dụng</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Dầu ăn</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Xà phòng</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Khác</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Ngũ cốc</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Yến mạch</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Đậu</a>
                                </div>
                                <div class="header_menu--content--ul--li--menuchild--link">
                                    <p class="header_menu--content--ul--li--menuchild--link--type text-green-20">Thực phẩm chế biến sẵn</p>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Mỳ ăn liền</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Bánh</a>
                                    <a href="#" class="header_menu--content--ul--li--menuchild--link--type--chlid text-black-20">Kẹo</a>
                                </div>  
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="header_menu--right">
                <ul class="header_menu--right--ul">
                    <li class="header_menu--right--ul--li"><a class="header_menu--right--ul--li--a text-white-16" href="file:///F:/website-business/trangchu.html">Trang chủ</a></li>
                    <li class="header_menu--right--ul--li"><a class="header_menu--right--ul--li--a text-white-16" href="/website-business/gioithieu.html">Giới thiệu</a></li>
                    <li class="header_menu--right--ul--li"><a class="header_menu--right--ul--li--a text-white-16" href="/website-business/tintuc.html">Tin tức</a></li>
                    <li class="header_menu--right--ul--li"><a class="header_menu--right--ul--li--a text-white-16" href="/website-business/chinhsach.html">Chính sách</a></li>
                    <li class="header_menu--right--ul--li"><a class="header_menu--right--ul--li--a text-white-16" href="/website-business/lienhe.html">Liên hệ</a></li>
                </ul>
            </div>
            
        </div>
    </div>
    `;
    document.write(writeHeader);
}
// --------------------------- Thêm header -----------------------------------
// --------------------------- Slogan thay đổi sau 5s -----------------------------------
function changeSlogan() {
    var sloganString = document.getElementById('preferentialSlogan');
    if (preferentialSlogan.length > 1) {
        var currentIndex = (Math.floor(Date.now() / 5000) % preferentialSlogan.length); // Chọn chỉ số slogan dựa trên thời gian
        sloganString.innerHTML = preferentialSlogan[currentIndex].head+ `<span class="icon-yellow"><strong>` + preferentialSlogan[currentIndex].between+ `</strong></span> ` + preferentialSlogan[currentIndex].end;
    }
}
// Thiết lập setInterval để chạy hàm changeSlogan mỗi 5 giây
setInterval(changeSlogan, 5000);
// --------------------------- Slogan thay đổi sau 5s -----------------------------------

// --------------------------- Thêm footer -----------------------------------
function addFooter(){
    document.write(`
    <div class="footer">
        <div class="footer_left">
            <img class="footer_left--img" src="public/icon/logo.png">
            <p class="footer_left--content">
                Chúng tôi hi vọng tất cả người tiêu dùng Việt nam sẽ được sử dụng những thụ phẩm rau củ quả tươi ngon, bổ dưỡng và an toàn nhất tại cửa hàng cung cấp thực phẩm rau củ sạch Dola Organic.
            </p>
            <p class="footer_left--text">Hình thức thanh toán</p>
            <div class="footer_left--pay">
                <img class="footer_left--pay--link" src="public/icon/img-methob-pay-1.webp">
                <img class="footer_left--pay--link" src="public/icon/img-methob-pay-2.webp">
                <img class="footer_left--pay--link" src="public/icon/img-methob-pay-3.webp">
            </div>
        </div>
        <div class="footer_leftCenter">
            <p class="footer_leftCenter--text">
                Chính sách
            </p>
            <div class="footer_leftCenter--policy">
                <a class="footer_leftCenter--polic--link" href="">Chính sách thành viên</a><br>
                <a class="footer_leftCenter--polic--link" href="">Chính sách thanh toán</a><br>
                <a class="footer_leftCenter--polic--link" href="">Hướng dẫn mua hàng</a><br>
                <a class="footer_leftCenter--polic--link" href="">Bảo mật thông tin cá nhân</a><br>
                <a class="footer_leftCenter--polic--link" href="">Quà tặng cá nhân</a>
            </div>
        </div>
        <div class="footer_rightCenter">
            <p class="footer_rightCenter--text">
                Thông tin chung
            </p>
            <div class="footer_rightCenter--policy">
                <a class="footer_rightCenter--polic--link" href="">Địa chỉ: Đường số 20, Hiệp Bình Chánh, Thủ Đức, Hồ Chí Minh, Việt Nam</a><br>
                <a class="footer_rightCenter--polic--link" href="">Điện thoại: 0379073235</a><br>
                <a class="footer_rightCenter--polic--link" href="">Email: hanhptn.12a1bb.1920@gmail.com</a><br>
            </div>
        </div>
        <!-- <div class="footer-right">
            <p>instagram</p>
        </div> -->
    </div>
    `)
}
// --------------------------- Thêm footer -----------------------------------
// ---------------------------- Hàm get set cho người dùng hiện tại đã đăng nhập ------------------------
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}

function getCurrentProducts() {
    return JSON.parse(window.localStorage.getItem('CurrentProducts')); // Lấy dữ liệu từ localstorage
}

function setCurrentProducts(u) {
    window.localStorage.setItem('CurrentProducts', JSON.stringify(u));
}

// ---------------------------- Hàm get set cho người dùng hiện tại đã đăng nhập ------------------------
// ---------------------------- Hàm get set cho giỏ hàng đã đăng nhập ------------------------
function getCurrentBill() {
    return JSON.parse(window.localStorage.getItem('CurrentBill')); // Lấy dữ liệu từ localstorage
}

function setCurrentBill(u) {
    window.localStorage.setItem('CurrentBill', JSON.stringify(u));
}

// ---------------------------- Hàm get set cho giỏ hàng đã đăng nhập ------------------------

// --------------------------- Thêm vào giỏ hàng -----------------------------------

function themVaoGioHang(masp, tensp, priceQuantity, priceWeight, img) {
    var price;
    if(priceQuantity!= 0 ){
        price = priceQuantity;
    } else if(priceWeight != 0 ){
        price = priceWeight;
    }
    // price = parseInt(price.replace(/[^\d.]/g, ''), 10);
    var user = getCurrentUser();
    if (!user) {
        notification(`fa-solid fa-user`,`Bạn cần đăng nhập để mua hàng`,`yellow`);
       
        window.location.href = 'file:///F:/website-business/dangnhap.html';
        return;
    }
    if (user.off) {
       
        notification(`fa-solid fa-user`,`Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!`,`yellow`);
        // addAlertBox('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
        return;
    }
    var t = new Date();
    var daCoSanPham = false;;

    for (var i = 0; i < user.products.length; i++) { // check trùng sản phẩm
        if (user.products[i].ma == masp) {
            user.products[i].soluong++;
            daCoSanPham = true;
            break;
        }
    }

    if (!daCoSanPham) { // nếu không trùng thì mới thêm sản phẩm vào user.products
        user.products.push({
            "ma": masp,
            "ten":tensp,
            "img":img,
            "soluong": 1,
            "date": t,
            "gia":price,
            "tongtien":price,
        });
    }


   

    setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
    // updateListUser(user); // cập nhật list user
    capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng
    console.log(user.products);
    notification(`fa-solid fa-circle-check`,`Thêm sản phẩm thành công!`,`green`);
   
}

// --------------------------- Thêm vào giỏ hàng -----------------------------------

// --------------------------- Đăng ký tài khoản -----------------------------------
function signUp(form) {
    

    var hovaten = form.ho.value.trim();
    var phone = form.phone.value.trim();
    var username = form.newUser.value.trim();
    var pass = form.newPass.value.trim();

    var newUser = new User(username, pass, hovaten, phone,'','','','','','','','');
    var listUser = getListUser();

    // Check if username already exists
    for (var u of listUser) {
        if (newUser.username === u.username) {
            alert('Tên đăng nhập đã có người sử dụng!');
            return false;
        }
    }
 
    // Add new user to the list
    listUser.push(newUser);
    setListUser(listUser);
    
    // Optionally, you can log in the newly registered user automatically
    window.localStorage.setItem('CurrentUser', JSON.stringify(newUser));
   
    alert('Đăng kí thành công, Bạn sẽ được tự động đăng nhập!');
    window.location.href = 'file:///F:/website-business/trangchu.html';

    return false; // Prevent form submission and page reload
}

// Hàm get set cho danh sách người dùng
function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}

function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}
// --------------------------- Đăng ký tài khoản -----------------------------------
// --------------------------- Đăng nhập tài khoản -----------------------------------
function logIn(form) {
    var name = form.username.value.trim();
    var pass = form.pass.value.trim();
    var newUser = new User(name, pass);
    // Lấy dữ liệu từ danh sách người dùng localstorage
    var listUser = getListUser();

    // Kiểm tra xem dữ liệu form có khớp với người dùng nào trong danh sách ko
    for (var u of listUser) {
        if (equalUser(newUser, u)) {
            if(u.off) {
                alert('Tài khoản này đang bị khoá. Không thể đăng nhập.');
                return false;
            }
            setCurrentUser(u);

            // Reload lại trang -> sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
            // location.reload();
            window.location.href = 'file:///F:/website-business/trangchu.html';
            return false;
        }
    }
    // Đăng nhập vào admin
    for (var ad of adminInfo) {
        alert('oke4');
        if (equalUser(newUser, ad)) {
            alert('Xin chào admin .. ');
            window.localStorage.setItem('admin', true);
            window.location.assign('admin.html');
            return false;
        }
    }
    
    // Trả về thông báo nếu không khớp
    alert('Nhập sai tên hoặc mật khẩu !!!');
    // form.username.focus();
    // return false;
}

// --------------------------- Đăng nhập tài khoản -----------------------------------
// --------------------------- Đăng xuất --------------------------------
function logOut() {
    window.localStorage.removeItem('CurrentUser');
    location.reload();
}
// --------------------------- Đăng xuất --------------------------------
// ------------------- tam chua sap xep -------------------------
// Check xem có ai đăng nhập hay chưa (CurrentUser có hay chưa)
// Hàm này chạy khi ấn vào nút tài khoản trên header
function checkTaiKhoan() {
    if (!getCurrentUser()) {
        window.location.href = 'file:///F:/website-business/trangchu/handleAccount.html';
    }
   
}

// Cập nhật số lượng hàng trong giỏ hàng + Tên current user
function capNhat_ThongTin_CurrentUser() {
    var u = getCurrentUser();
    if (u) {
        // Cập nhật số lượng hàng vào header
        document.getElementsByClassName('count_product')[0].innerHTML = getTongSoLuongSanPhamTrongGioHang(u);
        // Cập nhật tên người dùng
        // Ví dụ sử dụng querySelector để rõ ràng và cụ thể
        document.querySelector('.show_name_account .header_center--user--account--icon').textContent = ' ' + u.username;

        // bỏ class hide của menu người dùng
        // document.getElementsByClassName('menuMember')[0]
        //     .classList.remove('hide');
    }
}


// tính tổng số lượng các sản phẩm của user u truyền vào
function getTongSoLuongSanPhamTrongGioHang(u) {
    var soluong = 0;
    for (var p of u.products) {
        soluong += p.soluong;
    }
    return soluong;
}

function timKiemTheoMa(list, ma) {
    for (var l of list) {
        if (l.masp == ma) return l;
    }
}

// ------------------- tam chua sap xep -------------------------

// ------------------- chức năng ấn sao chép ---------------------
function copyToClipboard(element) {
    // Lấy giá trị của thuộc tính data-code từ phần tử đã nhấp
    const discountCode = element.getAttribute('data-code');

    // Sử dụng API Clipboard để sao chép mã giảm giá vào clipboard
    navigator.clipboard.writeText(discountCode)
        .then(() => {
            // Thông báo cho người dùng rằng mã đã được sao chép
            alert('Mã giảm giá đã được sao chép: ' + discountCode);
        })
        .catch(err => {
            // Xử lý lỗi nếu không thể sao chép
            console.error('Không thể sao chép mã giảm giá: ', err);
        });
}

// ------------------- chức năng ấn sao chép ---------------------
// ------------------- link chat zalo, goToTop ---------------------
// Hàm để kiểm tra vị trí cuộn và hiển thị nội dung
// Hàm để kiểm tra vị trí cuộn và hiển thị nội dung
function handleScroll() {
    // Lấy phần tử mà bạn muốn cập nhật nội dung
    var linkContactZalo = document.getElementById('linkContactZalo');
    
    // Vị trí cuộn hiện tại của cửa sổ
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // Đặt vị trí cuộn mà bạn muốn kích hoạt nội dung (ở đây là 100px từ đầu trang)
    var triggerPoint = 100;

    // Kiểm tra nếu cuộn đã đạt đến vị trí kích hoạt
    if (scrollPosition > triggerPoint) {
        // Cập nhật nội dung HTML nếu cuộn vượt qua vị trí kích hoạt
        var chatZaloHtml = `<a href="https://zalo.me/0332212903" class="chatZalo" target="_blank" aria-label="Chat with us on Zalo"></a>
        <a href="#preferentialSlogan" class="goToTop"></a>`;
        linkContactZalo.innerHTML = chatZaloHtml;
    } else {
        // Xóa nội dung HTML nếu cuộn quay lại trên vị trí kích hoạt
        linkContactZalo.innerHTML = '<a href="https://zalo.me/0332212903" class="chatZalo" target="_blank" aria-label="Chat with us on Zalo"></a>';
    }
}
// Gán hàm kiểm tra cuộn cho sự kiện cuộn của cửa sổ
window.addEventListener('scroll', handleScroll);

// ------------------- link chat zalo ---------------------
// ------------------- notification ---------------------
function notification(icon, text, color) {
    var notification = document.getElementById('notification');
    notification.innerHTML = `
        <div class="icon-text">
            <i class="${icon}"></i>
            <span>${text}</span>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
    `;
    notification.style.backgroundColor = color;

    // Hiển thị thông báo
    notification.style.opacity = 1;

    // Thêm sự kiện click cho nút đóng
    var closeButton = notification.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        notification.style.opacity = 0;
        // Xóa thông báo sau khi hiệu ứng mờ dần hoàn tất
        setTimeout(() => {
            notification.innerHTML = '';
        }, 1000); // Thời gian hiệu ứng mờ dần (1 giây)
    });

    // Đặt thời gian chờ để làm thông báo biến mất nếu không nhấp nút đóng
    setTimeout(() => {
        // Hiệu ứng mờ dần
        notification.style.opacity = 0;
        // Xóa thông báo sau khi hiệu ứng mờ dần hoàn tất
        setTimeout(() => {
            notification.innerHTML = '';
        }, 1000); // Thời gian hiệu ứng mờ dần (1 giây)
    }, 5000); // Thay đổi thời gian hiển thị trước khi mờ dần (5 giây)
}

// ------------------- notification ---------------------

// ----------------
{/*                     <li class="header_menu--right--ul--li">
                        <a class="header_menu--right--ul--li--a text-white-16" href="#">Sản phẩm</a>
                        <i class="header_menu--right--ul--li--icon  icon-white fa-solid fa-caret-down"></i>
                        <div class="header_menu--right--ul--li--submenu">
                            <ul class="header_menu--right--ul--li--submenu--ul">
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Rau củ</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Rau ăn lá</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Rau ăn củ</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Rau gia vị</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Rau ăn quả</a></li>
                                    </ul>
                                </li>
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Trái cây</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Trái cây trong nước</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Trái cây nhập khẩu</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Trái cây đông lạnh</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Trái cây sấy</a></li>
                                    </ul>
                                </li>
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a  class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Thịt và hải sản</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Thịt heo</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Thịt bò</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Thịt nhập</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Thủy hải sản</a></li>
                                    </ul>
                                </li>
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a  class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Đồ khô</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Đậu các loại</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Hạt các loại</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Gạo các loại</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Trà các loại</a></li>
                                    </ul>
                                </li>
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a  class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Thức uống</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Sữa thực vật</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Sữa động vật</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Nước đóng chai</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Nước ép và sinh tố</a></li>
                                    </ul>
                                </li>
                                <li class="header_menu--right--ul--li--submenu--ul--li"><a  class="header_menu--right--ul--li--submenu--ul--li--a" href="#">Sản phẩm chế biến</a>
                                    <ul class="header_menu--right--ul--li--submenu--ul--li--hasmenu">
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Bánh mì đông lạnh</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Bún các loại</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Mì các loại</a></li>
                                        <li class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li"><a class="header_menu--right--ul--li--submenu--ul--li--hasmenu--li--a" href="#">Thực phẩm đông lạnh</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </li> */}
                    // ---------------------