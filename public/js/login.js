"use strict";

$(document).ready(init);

var $formLogin, $email, $pass;

function init() {
  $email = $("#email");
  $pass = $("#password");
  $("#formLogin").submit(doLogin);
}

function doLogin(e){
  e.preventDefault();
  console.log("Login attempted");
  $.post("/users/login", {email: $email.val(), password: $pass.val()})
  .success(function(data) {
    swal({ //This uses sweet alert to redirect the user to /dashboard after clicking OK
      title: "Logged in Successfully",
      clonOnConfirm: false
    }, function(){
      location.href = "/dashboard";
    });
  })
  .fail(function(err) {
    swal("An Error Has Occurred", "See console for details")
  })
}
