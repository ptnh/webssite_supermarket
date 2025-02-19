var currentuser;
window.onload = function () {
    khoiTao();
    currentuser = getCurrentUser();
    addProductToTable(currentuser);
}

// ----------------- thêm sản phẩm vào bảng --------------------
function addProductToTable(user) {
    let totalMoney = 0;
	var table = document.getElementsByClassName('tableProduct')[0];
    var totalMoneyProduct = document.getElementById('total_money--product');
	var s = `
    <thead class="tableProduct_thead">
        <tr class="tableProduct_thead--tr">
            <th class="tableProduct_thead--tr--th">Thông tin sản phẩm</th>
            <th class="tableProduct_thead--tr--th">Đơn giá</th>
            <th class="tableProduct_thead--tr--th">Số lượng</th>
            <th class="tableProduct_thead--tr--th">Thành tiền</th>
            <th class="tableProduct_thead--tr--th"></th>
        </tr>
    </thead>
    <tbody class="tableProduct_tbody">`;

	if (!user) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	} else if (user.products.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	}

	var totalPrice = 0;
	for (var i = 0; i < user.products.length; i++) {
		var masp = user.products[i].ma;
        var p = timKiemTheoMa(list_products, masp);
		var soluongSp = user.products[i].soluong;
        var money = 0;
        console.log(user.products);
		s += `
        <tr class="tableProduct_tbody--tr">
            <td  class="tableProduct_tbody--tr--td">
                <img class="img_product--table" src="` +p.img + `" alt="ảnh sản phẩm chờ tải">
                <p class="get-name">`+p.name+`</p>
                <p class="get-code" style="visibility: hidden;">`+masp+`</p>
            </td>`;
        if (p.priceQuantity === 0){
            money = p.priceWeight;
            
        } else {
            money = p.priceQuantity;            
        }

        s +=    `
            <td  class="tableProduct_tbody--tr--td get-money">`+formatCurrency(money)+`</td>
            <td  class="tableProduct_tbody--tr--td">
                <button class="btn_table--cart decrease-btn">-</button>
                <p id="quantity_product--cart" class="quantity_product">`+soluongSp+`</p>
                <button class="btn_table--cart increase-btn">+</button>
            </td>
            <td  class="tableProduct_tbody--tr--td total_money--cart">` +formatCurrency(money * parseFloat(soluongSp))+`</td>
            <td class="" onclick="deleteProduct('`+masp+`')">x</td>
            </tr>
		`;
		// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
        totalMoney += money * parseFloat(soluongSp);
        totalMoneyProduct.textContent = formatCurrency(totalMoney);
	}

	s += `
        </tbody>
    </table>
	`;

	table.innerHTML = s;

    // ----------------- btn tăng giảm số lượng --------------------

    // Lấy danh sách các button giảm số lượng và tăng số lượng
    let decreaseBtns = document.querySelectorAll('.decrease-btn');
    let increaseBtns = document.querySelectorAll('.increase-btn');
    let quantityElements = document.querySelectorAll('.quantity_product');
    let totalMoneyCart = document.querySelectorAll('.total_money--cart');
    let getmoney = document.querySelectorAll('.get-money');
    let getName = document.querySelectorAll('.get-code');
    // Gán sự kiện onclick cho từng button giảm số lượng và tăng số lượng
    for (let i = 0; i < decreaseBtns.length; i++) {
        decreaseBtns[i].onclick = function() {
            let count = parseFloat(quantityElements[i].textContent);

            if (count > 0) {
                count--;
                tammoney = parseInt(getmoney[i].textContent)*1000;
                totalMoneyCart[i].textContent = formatCurrency(count*tammoney);
                quantityElements[i].textContent = count ;
                totalMoneyProduct.textContent =formatCurrency((parseInt(totalMoneyProduct.textContent.replace(/[^\d]/g, ''),10) -  parseInt(tammoney)));
                
                for (var ii = 0; ii < user.products.length; ii++) { // check trùng sản phẩm
                    if (user.products[ii].ma == getName[i].textContent) {
                        user.products[ii].soluong--;
                        user.products[ii].tongtien = user.products[ii].gia * user.products[ii].soluong;
                        break;
                    }  
                }
                setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
  
                capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng

            }
        };

        increaseBtns[i].onclick = function() {
            let count = parseFloat(quantityElements[i].textContent);
            count++;
            tammoney = parseInt(getmoney[i].textContent)*1000;
           
            totalMoneyCart[i].textContent = formatCurrency(count*tammoney);
            quantityElements[i].textContent = count ;
            totalMoneyProduct.textContent =formatCurrency((parseInt(totalMoneyProduct.textContent.replace(/[^\d]/g, ''),10) +  parseInt(tammoney)));
            for (var ii = 0; ii < user.products.length; ii++) { // check trùng sản phẩm
                if (user.products[ii].ma == getName[i].textContent) {
                    user.products[ii].soluong++;
                    user.products[ii].tongtien = user.products[ii].gia * user.products[ii].soluong;
                   
                    break;
                }    
            }
            setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại

            capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng
        };
    }
// ----------------- btn tăng giảm số lượng --------------------
}
function compareDay(dateValue, hourValue){
   
    // Tách chuỗi ngày thành các phần
    const [inputYear, inputMonth, inputDay] = dateValue.split('-');
   
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = today.getHours();
    
    // So sánh ngày và giờ
    if (dateValue===''){
        notification('fa-solid fa-user', 'Bạn chưa lựa chọn ngày giờ', 'yellow');
        return false;
    } else if (Number(inputYear) < year || (Number(inputYear) === year && Number(inputMonth) < month) || (Number(inputYear) === year && Number(inputMonth) === month && Number(inputDay) < day) ||
    (Number(inputYear) === year && Number(inputMonth) === month && Number(inputDay) === day && Number(hourValue) < hours)) {
        notification('fa-solid fa-user', 'Bạn đã lựa chọn ngày đã qua', 'yellow');
        return false;
    } else if (Number(inputYear) === year && Number(inputMonth) === month && Number(inputDay) === day && Number(hourValue) > hours) {
        notification('fa-solid fa-user', 'Lựa chọn ngày hợp lý', 'red');
        return true;
    } else if (Number(inputYear) > year || (Number(inputYear) === year && Number(inputMonth) > month) || (Number(inputYear) === year && Number(inputMonth) === month && Number(inputDay) > day)) {
        // notification('fa-solid fa-user', 'Lựa chọn ngày hợp lý', 'green');
        return true;
    }

  
}

// btn thanh toán
function thanhtoanngay(){
    var dateValue = document.getElementById('datepicker').value;
    var hourValue = document.getElementById('time-select').value;
    if(compareDay(dateValue, hourValue)){
        alert('oke');
        currentuser = getCurrentUser();
        for (i = 0; i < currentuser.products.length; i++) { 
            currentuser.products[i].date = dateValue+":"+hourValue;
        }
        setCurrentUser(currentuser);
        window.location.href = 'file:///F:/website-business/thanhtoan.html';
    
    }
       
}

// onclick delete product
function deleteProduct(masp){
    console.log(currentuser.products);
    for (var i = 0; i < currentuser.products.length; i++) {
        if(currentuser.products[i].ma === masp){
            // xóa khỏi mảng
            currentuser.products.splice(i, 1);
            // console.log('s1'+currentuser.products[i].masp);
            break; // Dừng vòng lặp sau khi xóa sản phẩm
        }
    }
    setCurrentUser(currentuser);
    capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng
    addProductToTable(currentuser);
    notification(`fa-solid fa-user`,`Đã xóa sản phẩm khỏi giỏ hàng`,`yellow`);
}