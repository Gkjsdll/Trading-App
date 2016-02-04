"use strict";

$(document).ready(init);

function init() {
  // $("#IdCatalog").on("click", ".vinylListing button", doBarter);
  $("#IdFormFilter").submit(doFilter);
}

function doFilter(e) {
  e.preventDefault();
  var $listings = $(".vinylListing");
  $listings.show();
  var filter = $("#IdFilter").val();
  for(var i = 0; i < $listings.length; i++) {
    if($listings.find(".artist").eq(i).text().substr(8).indexOf(filter) === -1){
      $listings.eq(i).hide();
    }
  }
}
