"use strict";

$(document).ready(init);

function init(){
  $("#navLogout").on("click", logout)
  // $("#navLogin").click(login)
  // $("#navRegister").click(logout)
  // $("#navDashboard").click(logout)
  // $("#navUsers").click(logout)
  // $("#navCatalog").click(logout)
}

function logout(){
  $.post("/users/logout")
  .success(function(data){
    location.href = "/";
  })
  .fail(function(err){

  })
}
