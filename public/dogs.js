$(function() {
	var img1 = $('#image1');
	var img2 = $('#image2');
	var dogs = $('#dogs');
	var voteDiv = $('#vote');
	var button1 = $('#vote1');
	var button2 = $('#vote2');
	var top10 = $('#topTen');
	var top10Button = $('#showTopTen');
	var votingButton = $('.votingButton');
	var winners = $('#winners');

	var dogArray = [];

	function vote(dogNumber) {
		var body = {
			winner: dogNumber == 1 ? dogArray[0]._id : dogArray[1]._id,
			loser: dogNumber == 1 ? dogArray[1]._id : dogArray[0]._id
		};
		$.post('/dogs', body, function(response) {
			getNewDogs();
		})
	}

	function getNewDogs() {
		$.get('/dogs', function(response) {
			console.log('response', response);
			if (response.length == 2 && response[0].url && response[1].url) {
				dogArray = response;
				img1.attr("src", dogArray[0].url);
				img2.attr("src", dogArray[1].url);
				dogs.fadeIn();
			}
		});
	}

	function getAllDogs() {
		winners.empty();
		$.get('/all', function(all) {
			console.log('all', all);
			for (var i in all) {
				var current = all[i];
				winners.append(`<img src="${current.url}">Win rate: ${current.total > 0 ? Math.floor(current.wins/current.total * 100) : 0}%`);
			}
		});
	}

	button1.click(function() {
		vote(1);
	});
	button2.click(function() {
		vote(2);
	});
	top10Button.click(function() {
		getAllDogs();
		top10.css("display", "flex");
		voteDiv.hide();
	});
	votingButton.click(function() {
		top10.hide();
		voteDiv.show();
	});

	getNewDogs(); // Get some fresh pups when the page loads
});
