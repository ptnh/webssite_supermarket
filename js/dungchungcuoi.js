
// -------------------- active theo loại sản phẩm ---------------------
// Lấy tất cả các nút menu
const menuButtons = document.querySelectorAll('.btn_showProduct');

// Lặp qua từng nút menu và thêm sự kiện 'click'
menuButtons.forEach(button => {
    button.addEventListener('click', function() {
       
        // Xóa class 'active-menu-1' khỏi tất cả các nút menu
        menuButtons.forEach(btn => {
            btn.classList.remove('active-menu-1');
        });
        
        // Thêm class 'active-menu-1' cho nút menu được click
        this.classList.add('active-menu-1');
    });
});

// -------------------- active theo loại sản phẩm ---------------------