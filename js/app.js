$(function() {

  /* -- Variables -- */
  var nextPageToken;
  var prevPageToken;
  var userQuery;

  /* -- Event Listeners -- */
  $('form').submit(function(event) {
    event.preventDefault();
    var userSearch = $('.form-control').val();
    searchResults(userSearch);
    userQuery = userSearch;
    $('form')[0].reset();
  });

  $('#next').click(function(event) {
    nextPage();
  });

  $('#prev').click(function(event) {
    prevPage();
  });

  /* -- AJAX Functions -- */
  /* Used to preform the initial search and set the search variables */
  function searchResults(userSearch) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        data: {
          part: 'snippet',
          maxResults: 12,
          key: 'AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI',
          q: userSearch
        }
      })
      .done(function(response) {
        nextPageToken = response.nextPageToken;
        prevPageToken = response.prevPageToken;
        printToPage(response);
      });
  }

  function nextPage() {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        data: {
          part: 'snippet',
          pageToken: nextPageToken,
          maxResults: 12,
          key: 'AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI',
          q: userQuery
        }
      })
      .done(function(response) {
        nextPageToken = response.nextPageToken;
        prevPageToken = response.prevPageToken;
        printToPage(response);
      });
  }

  function prevPage() {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        data: {
          part: 'snippet',
          pageToken: prevPageToken,
          maxResults: 12,
          key: 'AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI',
          q: userQuery
        }
      })
      .done(function(response) {
        nextPageToken = response.nextPageToken;
        prevPageToken = response.prevPageToken;
        $('.thumbnails .row').empty();
        printToPage(response);
      });
  }

  /* -- Helper functions -- */
  function printToPage(response) {
    $('.thumbnails .row').empty();
    $.each(response.items, function(index, value) {
      $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" class="thumbnail"><img src="' + value.snippet.thumbnails.default.url + '" alt="' + value.snippet.title + '"></a></div>');
    });
  }

});
