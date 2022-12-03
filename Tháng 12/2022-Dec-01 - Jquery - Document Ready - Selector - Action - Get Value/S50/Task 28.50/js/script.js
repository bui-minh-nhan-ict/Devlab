

$(document).ready(function(){

$('#btn-submit-data').on('click',onBtnSubmitClick);
$('#btn-clear-log').on('click',onBtnClearHTMLClick);

function onBtnSubmitClick() {
  // Hiển thị dữ liệu vào div
  var vFirstName = $("#inp-first-name");
  var vFirstNameVal = $("#inp-first-name").val();
  var vLastName = $("#inp-last-name");
  var vLastNameVal = $("#inp-last-name").val();
  var vAge = $("#inp-age");
  var vAgeVal = $("#inp-age").val();
  var vDivShow = $('#p-html-log');
  

  // Validate dữ liệu input
  var isValidate = validateInput(vFirstNameVal, vLastNameVal, vAgeVal);
  if (isValidate) {
    vDivShow.html('First Name: ' +vFirstNameVal +'<br>'+ 'Last Name: ' +vLastNameVal +'<br>'+ 'Age: ' +vAgeVal +'<br>');
  }

};
function validateInput(paraFirstName, paraLastName, paraAge) {
  var vResult = true;
  if(paraFirstName.trim().length ==0 ){
      alert("Please enter your first name")
      vResult = false;
  }
  if(paraLastName.trim().length ==0){
      alert("Please enter your last name")
      vResult = false;
  }
  if(isNaN(paraAge) || paraAge < 0 || paraAge > 200){
    alert("Please enter your age")
    vResult = false;
}
  return vResult;
}


  function onBtnClearHTMLClick() {
    $("#p-html-log").empty();

}});