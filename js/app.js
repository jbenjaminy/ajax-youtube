$(function(){

$('.btn').click(function(){
	var userSearch = $('.form-control').val();
	searchResults(userSearch);
});

function searchResults(userSearch) {
	$.ajax({
		method: "GET",
		url: 'https://www.googleapis.com/youtube/v3/search',
		dataType: 'json',
		data: {
			part: 'snippet',
			key: 'AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI',
			q: userSearch }
	})
	.done(function(response){
		$.each(response.items, function(index, value) {
		console.log(value.snippet.thumbnails.default.url);
		
		});
	});
}

});
