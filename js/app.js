$(function(){

$('form').submit(function(event){
  event.preventDefault();
	var userSearch = $('.form-control').val();
	searchResults(userSearch);
  $('form')[0].reset();
});



function searchResults(userSearch) {
	$.ajax({
		method: "GET",
		url: 'https://www.googleapis.com/youtube/v3/search',
		dataType: 'json',
		data: {
			part: 'snippet',
      maxResults: 12,
			key: 'AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI',
			q: userSearch }
	})
	.done(function(response){
		$.each(response.items, function(index, value) {
      $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" class="thumbnail"><img src="' + value.snippet.thumbnails.default.url + '" alt="' + value.snippet.title +'"></a></div>');
		});
	});
}

});
