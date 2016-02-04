"use strict"

$(document).ready(init);

function init() {
  $("#formPassReset").submit(doPassReset);
};

function doPassReset(e) {
  e.preventDefault();
  $.post("/users/forgot", {email: $("#email").val()})
  .success(function() {
    swal("Password reset e-mail sent")
  })
  .fail(function(err) {
    console.error(err);
  })
}
