var  app = angular.module('myApp', []);

/*
//adds 0 infront of the time if hours are between 1-9
function addZero(t) {
	if (t < 10) {
		t = "0" + t
	}
	//returns time back
	return t
}
//runs the clock
function runClock () {
	//stores time into today
	var today = new Date()

	//stores values into vars
	var hour = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	var ampm = (hour >= 12 ? ' pm' : ' am')
	//stores values into vars
	var date = today.getDate()
	var month = today.getMonth()
	var year = today.getFullYear()
	
	//applies am or pm
	hour = hour % 12 || 12

	//converts 24 hour clock to 12 hour clock
	if(hour > 12) {
		hour = hour - 12
	}
	//changes month from 0-11 t0 1-12
	if(month == 11  || month == 0 ){
		month++
	}else {
		month++
	}

	//updates minutes and second from line 1
	hour = addZero(hour)
	minutes = addZero(minutes)
	seconds = addZero(seconds)

	//grabs id clock from html and changes text to time visversa for date
	document.getElementById('clock').textContent = hour + ":" + minutes + ':' + seconds + ampm
	document.getElementById('date').textContent = month + "/" + date + "/" + year

	//runs the function every second
	setTimeout(function () {
		runClock()
	}, 1000)
}

//event listener to start function and displays time and date
document.getElementById('date').addEventListener('onload', runClock(), false)
document.getElementById('clock').addEventListener('onload', runClock(), false)

*/