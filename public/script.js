//Samir Hassan -->

$(document).ready(function () {
  $("#search-button").click(function () {
    // Retrieve keywords from text boxes
    let title = $("#title").val().toLowerCase();
    let artist = $("#artist").val().toLowerCase();

    // Make GET Ajax call to /search with keywords
    $.ajax({
      url: "/search", // the URL to send the request to
      type: "GET", // the HTTP method to use
      dataType: "json", // the type of data expected in response
      data: { title: title, artist: artist }, // the data to send to the server
      processData: true, // whether to process the data or not
      success: function (data) {
        // the function to call if the request succeeds

        // Clear existing rows in table
        $("#results-table").empty();

        // Add headers if they don't exist
        if ($("#results-table").find("thead").length === 0) {
          $("#results-table").append(
            "<thead><tr><th>Artist</th><th>Title</th></tr></thead>"
          );
        }

        // Add rows to table
        data.forEach(function (song) {
          let row = $(
            "<tr><td>" + song.artist + "</td><td>" + song.title + "</td></tr>"
          );
          if (song.numone) {
            row.addClass("lightpink");
          }
          $("#results-table").append(row);
        });
      },
      error: function (xhr, status, error) {
        // the function to call if the request fails
        alert("Error: " + error);
      },
    });
  });
});
