"use strict";

$(document).ready(init);

function init() {
  $("#ownedVinyls").on("click", ".deleteVinyl", doVinylDelete) //deferred event listener for the buttons in each vinyl listing
  $("#ownedVinyls").on("change", ".availableCheck", doVinylAvail)
};

function doVinylDelete(){
  var $this = $(this);
  swal({
    title: `Are you sure you would like to delete ${$this.closest(".row").find(".album").text().substring(7)}?`,
    showCancelButton: true,
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if(isConfirm) {
      $.ajax({
        url: "/vinyls",
        method: "DELETE",
        data: {vinyl_id: $this.data("vinyl-id")}
      })
      .success(function() {
        $this.closest("li").remove();
        swal.close();
      })
      .fail(function(err) {
        console.error(err);
      });
    }
    else {
      swal.close();
    }
  });
}

function doVinylAvail(){
  var $this = $(this);
  var sendData = {
    vinyl_id: $this.data('vinyl-id'),
    available: $this.prop('checked')
  }
  $.ajax({
    url: "/vinyls",
    method: "PUT",
    data: sendData
  })
  .fail(function(err){
    return console.error(err);
  })
}
