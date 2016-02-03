"use strict";

$(document).ready(init);

var $artist, $album, $condition, $year, $genre;

function init() {
  $artist = $("#artist");
  $album = $("#album");
  $condition = $("#condition");
  $year = $("#year");
  $genre = $("#genre");
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
    console.log(savedVinyl);
  })
  .fail(function(err) {
    res.status(400).send(err);
  });
}
