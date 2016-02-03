"use strict";

var $firstName, $lastName, $phone, $email, $pass1, $pass2;

var fields;

$(document).ready(init);

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
    field.val("");
  });
  console.log("Fields cleared.");
}

function doRegister(e){
  e.preventDefault();
  if($pass1.val() !== $pass2.val()){
    swal("Passwords must match")
  }
  else{
    $.post("/users/register", {
      email: $email.val(),
      password: $pass1.val(),
      name: {
        first: $firstName.val(),
        last: $lastName.val()
      },
      phone: $phone.val()
    })
    .success(function(data) {
      swal("New User Created")
      location.href = "/users/login";
    })
    .fail(function(err) {
      console.error(err);
      swal("An Error Has Occurred", "See console for details");
    })

    clearFields();
  }
}
