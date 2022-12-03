"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
$(document).ready(function(){
var gREADY_STATE_REQUEST_DONE = 4;
var gSTATUS_REQUEST_DONE = 200;

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
$('#btn-check-voucher').on('click',onBtnCheckVoucherClick)
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// Hàm này để xử lý sự kiện nút check voucher click
function onBtnCheckVoucherClick(){
  
  'use strict';
  var vInputVoucher = $('#voucher'); // truy vấn ô Text (ô mã giảm giá)
  var vDivResultCheck = $('#div-result-check'); //truy vấn thẻ div có id là #div-result-check
  console.log('SubTask 1');
  console.log('Dữ liệu từ: ');
  console.log ('Input, id = ' +vInputVoucher.attr('id')+' - placeholder = '+ vInputVoucher.attr('placeholder'));
  console.log('Tác động vào');
  console.log('Div, id= ' +vDivResultCheck.attr('id')+ ' - innerHTML = ' +vDivResultCheck.html());

  // Khai báo đối tượng voucher để sử dụng trong các bước
  var vVoucherObj = {
    maGiamGia: ''
  }
  // B1: lấy giá trị nhập trên form, mã voucher (Thu thập dữ liệu)
  var vVoucherCode = readData(vVoucherObj);
  // B2: Validate data
  var vIsValidateData = validateData(vVoucherObj);
  
  // B3: Gọi server
    var vXmlHttp = new XMLHttpRequest();
    sendVoucherToServer(vVoucherObj, vXmlHttp);
  //B4: xu ly response khi server trả về
    vXmlHttp.onreadystatechange = function() {
      if(vXmlHttp.readyState === gREADY_STATE_REQUEST_DONE
        && vXmlHttp.status === gSTATUS_REQUEST_DONE) {
          processResponse(vXmlHttp);
        }
        else if (vXmlHttp.readyState === gREADY_STATE_REQUEST_DONE){
          var vDivResultCheck = $('#div-result-check');
          vDivResultCheck.html('Mã giảm giá '+vVoucherObj.maGiamGia+ ' không tồn tại');
        }
          
        
    }
  }
});

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

//Hàm đọc data từ ô Text
function readData(paramVoucherObject){
  'use strict';
  var vInputVoucher = $('#voucher');
  var vValueVoucher = vInputVoucher.val();
  paramVoucherObject.maGiamGia = vValueVoucher; //???
}


// Hàm này dùng để validate data
// input: ma voucher nguoi dung nhap vao
// output: tra ve true neu ma voucher duoc nhap, nguoc lai thi return false
function validateData(paramVoucherObject) {
  var vDivResultCheck = $("#div-result-check"); //truy vấn thẻ div có id là #div-result-check
  if(paramVoucherObject.maGiamGia === "") {
    // Hiển thị câu thông báo lỗi ra
    vDivResultCheck.html("Mã giảm giá chưa nhập!");
    // Thay đổi class css, để đổi màu chữ thành màu đỏ
    vDivResultCheck.prop('class', "text-danger");
    return false;
  }
  

  // Thay đổi class css, để đổi màu chữ thành màu đen bình thường
  vDivResultCheck.prop('class', "text-dark");
  return true;
}

// Hàm thực hiện call api và gửi mã voucher về server
function sendVoucherToServer(paramVoucherObject, paramXmlVoucherRequest) {
  paramXmlVoucherRequest.open("GET", "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/" + paramVoucherObject.maGiamGia, true);
  paramXmlVoucherRequest.send();
}

// Hàm này được dùng để xử lý khi server trả về response
function processResponse(paramXmlHttp) {
  'use strict';
  // B1: nhận lại response dạng JSON ở xmlHttp.responseText
  var vJsonVoucherResponse = paramXmlHttp.responseText;
  console.log (vJsonVoucherResponse);
  // B2: Parsing chuỗi JSON thành Object
  var vVoucherResObj = JSON.parse(vJsonVoucherResponse); 
  console.log(vJsonVoucherResponse);
  // B3: xử lý mã giảm giá dựa vào đối tượng vừa có
  var vDiscount = vVoucherResObj.phanTramGiamGia;
  var vResultCheckElement = document.getElementById("div-result-check");
  vResultCheckElement.innerHTML  = "Mã giảm giá " + vDiscount +"%"; 
}