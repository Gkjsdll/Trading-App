"use strict";

$(document).ready(init);

var $firstName, $lastName, $phone, $email, $pass1, $pass2;

var fields;

function init() {
  $("#formRegister").submit(doRegister);
  $firstName = $("#firstName");
  $lastName = $("#lastName");
  $phone = $("#phone");
  $email = $("#email");
  $pass1 = $("#password");
  $pass2 = $("#verifyPassword");
  fields = [$firstName, $lastName, $phone, $email, $pass1, $pass2];
}

function clearFields() {
  fields.forEach(function(field){
    debugger;
    field.val("");
  });
  console.log("Fields cleared.");
}

function doRegister(e){
  e.preventDefault();
  clearFields();
}
