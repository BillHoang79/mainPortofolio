 //fancy box plug in
$(document).ready(function() {
	$(".fancybox").fancybox()
})

// Searchbar handler
$(function() {
	var searchField = $('#query')
	var icon = $('#search-btn')

	// Focus Event Handler, expands on click
	$(searchField).on('focus', function() {
		$(this).animate({
			//how much the bar will expand
			width:'100%'
		//speed at which the search box expands
		}, 400)
		//same thing for the search icon
		$(icon).animate({
			right: '10px'
		}, 400)
	})

	// Blur Event Handler, returns to original form after search
	$(searchField).on('blur', function() {
		if(searchField.val() == '') {
			$(searchField).animate({ 
				// back to original with
				width: '45%'
			//speed
			},400, function(){})
			$(icon).animate({
			//same for icon
				right: '360px'
			},400, function(){})
		}
	})

	$('#search-form').submit(function(e) {
		e.preventDefault()
	})
})

function search() {
	// Clear Results meaning when you make multiple searches, the previous search results gets cleared
	$('#results').html('')
	$('#buttons').html('')

	// Get Form Input
	q = $('#query').val()

	// Run Get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyCIXy1HY4Xz1DGlp9DcpfTqEt_gPmZmjFM'},
			function(data) {
				//access previous page, next page
				var nextPageToken = data.nextPageToken
				var prevPageToken = data.prevPageToken

				// Log data
				console.log(data)

				$.each(data.items, function(i, item) {
					//builds output, video's title, tags, etc
					var output = getOutput(item)

					// Display Results, attaches it to Ordered List 'results'
					$('#results').append(output)
				})

				//variable that create the buttons
				var buttons = getButtons(prevPageToken, nextPageToken)

				//Display Buttons
				$('#buttons').append(buttons)
			}
	)
}


// Next Page Function
function nextPage() {
	//token comes from var btnoutput, when clicking the button we are passing through data to load previous/next page
	var token = $('#next-button').data('token')
	var q     = $('#next-button').data('query')

	//Clear results
	$('#results').html('')
	$('#buttons').html('')

	// Get Form Input
	q = $('#query').val()

	// Run Get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type:'video',
			key: 'AIzaSyCIXy1HY4Xz1DGlp9DcpfTqEt_gPmZmjFM'},
			function(data) {
				//access previous page, next page
				var nextPageToken = data.nextPageToken
				var prevPageToken = data.prevPageToken

				// Log data
				console.log(data)

				$.each(data.items, function(i, item) {
					//builds output, video's title, tags, etc
					var output = getOutput(item)

					// Display Results, attaches it to Ordered List 'results'
					$('#results').append(output)
				})

				//variable that create the buttons
				var buttons = getButtons(prevPageToken, nextPageToken)

				//Display Buttons
				$('#buttons').append(buttons)
			}
	)

}

// Prev Page Function
function prevPage() {
	var token = $('#prev-button').data('token')
	var q     = $('#prev-button').data('query')

	// Clear Results
	$('#results').html('')
	$('#buttons').html('')

	// Get Form Input
	q = $('#query').val()

	// Run get request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCIXy1HY4Xz1DGlp9DcpfTqEt_gPmZmjFM'},
			function(data) {
				var nextPageToken = data.nextPageToken
				var prevPageToken = data.prevPageToken

				// Log Data
				console.log(data)

				$.each(data.items, function(i, item) {
					// Get Output
					var output = getOutput(item)

					//Display Results
					$('#results').append(output)
				})

				var buttons = getButtons(prevPageToken, nextPageToken)

				// Display Buttons
				$('#buttons').append(buttons)
			}
	)
}

// Build Output, variables for storing info 
function getOutput(item) {
	var videoId      = item.id.videoId
	var title        = item.snippet.title
	var description  = item.snippet.description
	var thumb        = item.snippet.thumbnails.high.url
	var channelTitle = item.snippet.channelTitle
	var videoDate    = item.snippet.publishedAt

	// Build Output String, stores al the tags being called into output,, fancybox is a plug in
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	''

	return output
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken) {
	if(!prevPageToken) {
		//div with a class of button container, holding button
		var btnoutput = '<div class="button-container">'+
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>'
	} else {
		//same thing as above but includes both prev and next, so when you click on next the prev button is called and stored
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>'
	}

	return btnoutput

}

