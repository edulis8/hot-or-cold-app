
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


var randomNumber = randomGen();
console.log(randomNumber);

var counter = 0;
var prevInput = null;
var input = null;

/*-------------------event listeners----------------------------*/
 $("form").submit(function() {

 	event.preventDefault();

  	prevInput = input;

  	console.log(prevInput);

  	input = $('input#userGuess').val();

  	input = parseInt(input, 10);

  	if(validateInput(input)){ //if input is truthy and validated, run functions
  			counter++;
  			console.log("validated");
  			giveFeedback(input);
  			guessCount();
  			listTheGuess(input);
  			$('input#userGuess').val('');
  	}

  });

  	$('a.new').click(function() {
  		newGame();
  	});

/*----------------function-------------------------*/
function newGame(){
	counter = 0;
	randomNumber = randomGen();
	$('#feedback').html("Make your Guess");
	$('#count').html("0");
	$('#guessList').empty();

}

function giveFeedback(input){
	// var guess = $('#userGuess').val();

	//console.log("Input inside giveFeedback " + input)

	//console.log(".val(): "+ $('#userGuess').val());

	//console.log("Guess inside giveFeedback: "+ guess);

	var feedback = hotOrCold(input);

	$('#feedback').html(feedback);

}

function guessCount(){
	$('#count').html(counter)
}

function listTheGuess(number){

	$('#guessList').append('<li>'+number+'</li>')
}

function hotOrCold(input){
	
	var diffCurrent = Math.abs(randomNumber - input);
	//console.log("Diff: " + diff);

	var diffPrevious = Math.abs(randomNumber - prevInput); 

	if(prevInput === null){
		return firstPass(diffCurrent);
	}

	else if(diffCurrent === 0){
		return "You got it!";
	}
	else if(diffCurrent < diffPrevious){
		return "Hotter";
	}
	else if(diffCurrent > diffPrevious){
		return "Colder";
	}
	else if(diffCurrent === diffPrevious){
		return "Same temperature as last guess!";
	}



}


function validateInput(input){
	if(input > 100 || input < 1){	
		alert("Please enter a number between 1 and 100!")
		$('input#userGuess').val('');
		return false;
	}
	else if(isNaN(input)){
		return false;
	}
	else{return true;}
}


function randomGen(){
	return Math.floor((Math.random() * 100)+1);
}


function firstPass(diff){


		if(diff > 50){
		return "Ice cold";
	}
	else if(diff <= 50 && diff > 30){
		return "Cold";
	}
	else if(diff <= 30 && diff > 20){
		return "Warm";
	}
	else if(diff <= 20 && diff > 10){
		return "Hot";
	}
	else if(diff <= 10 && diff >= 1){
		return "Very hot";
	}
	else if(diff === 0){return "You got it!"}
}


});


