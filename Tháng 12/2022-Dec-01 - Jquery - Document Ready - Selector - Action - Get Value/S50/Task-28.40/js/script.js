$(document).ready(function () {
   /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
   var gREADY_STATE_REQUEST_DONE = 4;
   var gSTATUS_REQUEST_DONE = 200;

   /*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
   $("#btn-check-voucher").on("click", onBtnCheckVoucherClick);

   /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
   function onBtnCheckVoucherClick() {
      var vInputVoucher = $("#voucher");
      var vDivResultCheck = $("#div-result-check");
      console.log(
         "%cSubtask 1",
         "color:blue",
         "\nTôi lấy dữ liệu từ \nInput, id = " +
            vInputVoucher.attr("id") +
            " - placeholder = " +
            vInputVoucher.attr("placeholder") +
            "\nTác động vào \nDiv, id = " +
            vDivResultCheck.attr("id") +
            " - innerHTML = " +
            vDivResultCheck.html()
      );

      var vVoucherObj = {
         maGiamGia: "",
      };

      //B1: Thu Thập Dữ Liệu ( lấy giá trị nhập trên form)
      readData(vVoucherObj);
      //B2: Kiểm tra dư liệu nhập vào có rỗng ko
      if (validateData(vVoucherObj)) {
         //B3: Gọi Server
         var vXhttp = new XMLHttpRequest();
         sendVoucherToServer(vXhttp, vVoucherObj.maGiamGia);
         //B4: Xử lý hiển thị
         vXhttp.onreadystatechange = function () {
            debugger;
            if (this.status == gSTATUS_REQUEST_DONE && this.readyState == gREADY_STATE_REQUEST_DONE) {
               console.log(vXhttp.responseText);
               processData(vXhttp);
            } else {
               $("#div-result-check").html("Sai mã giảm giá!");
               $("#div-result-check").prop("class", "text-danger");
            }
         };
      }

      function readData(paramObj) {
         paramObj.maGiamGia = $("#voucher").val();
      }

      function validateData(paramObj) {
         if (paramObj.maGiamGia == "") {
            $("#div-result-check").html("Vui lòng nhập mã giảm giá!");
            $("#div-result-check").prop("class", "text-danger");
            return false;
         }
         $("#div-result-check").prop("class", "text-dark");
         return true;
      }

      function sendVoucherToServer(paramXhttp, paramVoucher) {
         paramXhttp.open(
            "GET",
            "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail" + "/" + paramVoucher,
            true
         );
         paramXhttp.send();
      }

      function processData(paramXhttp) {
         var vResponse = JSON.parse(paramXhttp.responseText);
         $("#div-result-check").html("mã giảm giá: " + vResponse.phanTramGiamGia + "%");
      }
      /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
   }
});
