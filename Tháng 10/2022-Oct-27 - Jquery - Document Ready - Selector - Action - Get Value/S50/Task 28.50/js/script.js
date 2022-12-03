

$(document).ready(function(){

$('#btn-submit-data').on('click',onBtnSubmitClick);

function onBtnSubmitClick() {
  // Access Order info from element
  var vFirstName = $("#inp-first-name");
  var vFirstNameVal = $("#inp-first-name").val();
  var vLastName = $("#inp-last-name");
  var vLastNameVal = $("#inp-last-name").val();
  var vAge = $("#inp-age");
  var vAgeVal = $("#inp-age").val();
  console.log(vFirstNameVal);
  console.log(vLastNameVal);
  console.log(vAgeVal);


  // var vEmail = document.getElementById("inp-email");
  // var vPhone = document.getElementById("inp-phone");
  // var vAddress = document.getElementById("inp-address");
  // var vMessage = document.getElementById("inp-message");
  // var vVoucher = document.getElementById("inp-voucher");
  // var vCheckInput = "";

  // // Check Valid data: Menu, Pizza type, order info
  // if (gMenu.menuName == null) {
  //   alert("Please choose pizza size!");
  // }
  // else if (gPizzaType.type == null) {
  //   alert("Please choose pizza type!");
  // }
  // else if (validationString(vFullName.value)) {
  //   alert("Please enter your full name!");
  //   vFullName.focus();
  // }
  // else if (!validationString(vEmail.value, 2)) {
  //   alert("Please enter your email!");
  //   vEmail.focus();
  // }
  // else if (!validationString(vPhone.value, 3)) {
  //   alert("Please enter your phone number!");
  //   vPhone.focus();
  // }
  // else if (validationString(vAddress.value)) {
  //   alert("Please enter your address!");
  //   vAddress.focus();
  // }
  // else if (validationString(vMessage.value)) {
  //   alert("Please enter your Message!");
  //   vMessage.focus();
  // }
}});