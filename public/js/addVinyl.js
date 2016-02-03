"use strict";

$(document).ready(init);

var $artist, $album, $condition, $year, $genre;

var fields;

function init() {
  $artist = $("#artist");
  $album = $("#album");
  $condition = $("#condition");
  $year = $("#year");
  $genre = $("#genre");
  fields = [$artist, $album, $condition, $year, $genre];
  $("#formAddVinyl").submit(doAddVinyl);
};

function doAddVinyl(e){
  e.preventDefault();
  var vinyl = {};

  vinyl.artist = $artist.val();
  vinyl.album = $album.val();
  vinyl.condition = $condition.val();
  vinyl.year = $year.val();
  vinyl.genre = $genre.val();

  $.post("/vinyls", vinyl)
  .success(function(savedVinyl) {
    swal({
      title: "Vinyl added",
      text: "Would you like to add another vinyl to your collection?",
      closeOnConfirm: false,
      closeOnCancel: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Add More!",
      cancelButtonText: "No, View Collection"
    }, function(isConfirm){
      if(isConfirm){
        clearFields();
        swal.close();
      }
      else {
        location.href = "/dashboard";
      }
    })
  })
  .fail(function(err) {
    res.status(400).send(err);
  });
}

function clearFields() {
  fields.forEach(function(field){
    field.val("");
  });
}
