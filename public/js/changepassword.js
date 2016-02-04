"use strict";

$(document).ready(init);

function init() {
  $("#formPassChange").submit(doPassChange);
}

function doPassChange(e) {
  e.preventDefault();
  var newPass = $("#newPass").val();
  var newPassVerify = $("#newPassVerify").val();
  var oldPass = $("#oldPass").val();
  if(newPass !== newPassVerify){
    swal("New Passwords entered do not match");
  }
  else{
    $.ajax({
      url: "/users/password",
      method: "PUT",
      data: {
        oldPass: oldPass,
        newPass: newPass
      }
    })
    .success(function() {
      location.href = "/dashboard";
    })
    .fail(function(err) {
      swal(err.responseText);
    })
  }
}
