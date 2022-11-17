"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gREADY_STATE_REQUEST_DONE = 4;
var gSTATUS_REQUEST_DONE = 200;

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// Hàm này để xử lý sự kiện nút check voucher click
function onBtnCheckVoucherClick(){
  // B1: lấy giá trị nhập trên form, mã voucher (Thu thập dữ liệu)
  var vVoucherCodeElement = document.getElementById("voucher");
  var vVoucherCode = vVoucherCodeElement.value.trim();
  // B2: Validate data
  var vIsValidateData = validateData(vVoucherCode);
  if(vIsValidateData) {
    // B3: Tạo request và gửi mã voucher về server
    var bXmlHttp = new XMLHttpRequest();
    sendVoucherToServer(vVoucherCode, bXmlHttp);
    // B4: xu ly response khi server trả về
    bXmlHttp.onreadystatechange = function() {
      if(bXmlHttp.readyState === gREADY_STATE_REQUEST_DONE
        && bXmlHttp.status === gSTATUS_REQUEST_DONE) {
          processResponse(bXmlHttp);
        }
        else{
          var vResultCheckElement = document.getElementById("div-result-check");
          vResultCheckElement.innerHTML  = "Không tồn tại mã giảm giá"; 
        }
    }
  }
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// Hàm này dùng để validate data
// input: ma voucher nguoi dung nhap vao
// output: tra ve true neu ma voucher duoc nhap, nguoc lai thi return false
function validateData(paramVoucher) {
  var vResultCheckElement = document.getElementById("div-result-check");
  if(paramVoucher === "") {
    // Hiển thị câu thông báo lỗi ra
    vResultCheckElement.innerHTML = "Mã giảm giá chưa nhập!"
    // Thay đổi class css, để đổi màu chữ thành màu đỏ
    vResultCheckElement.className = "text-danger";
    return false;
  }
  
  // Thay đổi class css, để đổi màu chữ thành màu đen bình thường
  vResultCheckElement.className = "text-dark";
  return true;
}

// Ham thuc hien viec call api va gui ma voucher ve server
function sendVoucherToServer(paramVoucher, paramXmlVoucherRequest) {
  paramXmlVoucherRequest.open("GET", "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/" + paramVoucher, true);
  paramXmlVoucherRequest.send();
}

// Hàm này được dùng để xử lý khi server trả về response
function processResponse(paramXmlHttp) {
  // B1: nhận lại response dạng JSON ở xmlHttp.responseText
  var vJsonVoucherResponse = paramXmlHttp.responseText;
  // B2: Parsing chuỗi JSON thành Object
  var vVoucherResObj = JSON.parse(vJsonVoucherResponse); 
  console.log(vJsonVoucherResponse);
  // B3: xử lý mã giảm giá dựa vào đối tượng vừa có
  var vDiscount = vVoucherResObj.phanTramGiamGia;
  var vResultCheckElement = document.getElementById("div-result-check");
  vResultCheckElement.innerHTML  = "Mã giảm giá " + vDiscount +"%"; 
}