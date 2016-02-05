var prompt = require ('sync-prompt').prompt;

//Part 1 

//generateCards()
var generateCards = function(){
	var orderDeck = [];
	var suit = ["♦", "♣", "♥", "♠"];
	var face = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	var num = 0;
	for (var x = 0 ; x < suit.length; x++){
		for (var y = 0 ; y < face.length ; y++){
			orderDeck[num] = {suitType: suit[x], faceType: face[y]};
			//keep in mind you cannot add objects to arrays using push****
			num++;
		}
	}
	return orderDeck;

};

//shuffle(Array)
var shuffle = function (Array){
	var shuffledDeck = [];
	for (var x = 0; Array.length > 0; x++){
		var num = Math.floor(Math.random() * (Array.length - 0 + 1)); //floor to make the number integer
			shuffledDeck[x] = Array[num];
		Array.splice(num, 1);
	}
	return shuffledDeck;
};

// calculateHand(Array)
var calculateHand = function(Array){
	var totalValue = 0;
	var numA = 0;
	for (var x = 0; x < Array.length; x++){

		//console.log("Face type of Array" + x + " = " + Array[x].faceType );

		if (Array[x].faceType === 'J' || Array[x].faceType === 'Q' || Array[x].faceType === 'K'){
			totalValue += 10;
		}
		else if (Array[x].faceType === 'A'){
			totalValue += 11;
			numA ++;
		}
		else{
			totalValue += parseInt(Array[x].faceType);
		}
	}
	for (;numA !== 0 && totalValue > 21; numA--){
		totalValue -= 10;
	}
	return totalValue;

};

//determineWinner(Number, Number)
var determineWinner = function(Num1, Num2){
	var winner;
	if (Num1 > 21 && Num2 >21 || Num1 === Num2){
		winner = "Tie";
	}
	else if (Num1 > 21){
		winner = "Computer";
	}
	else if (Num2 > 21){
		winner = "Player";
	}
	else{
		if (Num1 > Num2){
			winner = "Player";
		}
		else{
			winner = "Computer";
		}
	}
	return winner;
};

//Part 2
var loop = false;
var validRespLoop = false;
var comp = [];
var player = [];
var deck = [];
var playerTotal;
var compTotal;
while (loop === false){ //Want to play?
	loop = false;
	validRespLoop = false;
	deck = shuffle(generateCards()); //shuffle generated cards
	if (player.length === 0 && comp.length === 0){//first started game, deal out 2 cards each
		player[0] = deck[0];
		deck.splice(0,1);
		player[1] = deck[0];
		deck.splice(0,1);		
		comp[0] = deck[0];
		deck.splice(0,1);
		comp[1] = deck[0];
		deck.splice(0,1);

		playerTotal = calculateHand(player);
		compTotal = calculateHand(comp);
		console.log("Player has : " + player[0].suitType  + " "+ player[0].faceType + ", " + player[1].suitType + " " + player[1].faceType + ". Total: " + playerTotal);
		console.log("Computer has : " + comp[0].suitType  + " " + comp[0].faceType + ", " + comp[1].suitType + " " + comp[1].faceType + ". Total: " + compTotal + "\n");
	}
	console.log("~Player Turn~");
	var y = false; //player turn
	for (var x = 2; deck.length >= 26 && y === false; x++){//player
		var resp = prompt("enter (h)it or (s)tand\n");
		if (resp === "h"){
			player[x] = deck[0];
			deck.splice(0,1);
			playerTotal = calculateHand(player);
			console.log("Hit! Card is : " + player[x].suitType + " " + player[x].faceType + ". Player total : " + playerTotal);
			if (playerTotal > 21){//you lost the game
				y = true;
			}
		}
		else if (resp === "s"){
			console.log("Stay! Player total : " + playerTotal + ".");
			y = true; //end player turn
		}
		else{
			console.log("Invalid input. Try again! (h or s)");
		}
	}
	console.log("\n~Computer Turn~");
	var z = false; //comp turn
	for (var x = 2; deck.length >= 26 && z === false; x++){
		if (compTotal < 17){
			comp[x] = deck[0];
			deck.splice(0,1);
			compTotal = calculateHand(comp);
			console.log("Hit! Card is : "+ comp[x].suitType + " " + comp[x].faceType +  " Computer total : " + compTotal + ".");
		}
		else if (compTotal > 17 && compTotal < 21){
			z = true; 
			console.log("Stay! Computer total : " + compTotal + ".");
		}
		else{//greater than 21
			z = true;
		}
	}
	console.log();

	//make print function for cards in deck ******idea
	if (determineWinner(playerTotal, compTotal) === "Tie" ){
		console.log ("It's a Tie!!!");
	}
	else{
		console.log("Winner is " + determineWinner(playerTotal, compTotal));
	}
	
	while (validRespLoop === false){
		var finalResp = prompt("Do you want to continue? y or n\n");
		if (finalResp === "y"){
			validRespLoop = true;
			player = [];
			comp = [];
			//keep loop false;
			console.log("\n\n ~~~~~~~~~New Game~~~~~~~~~\n\n");
		}
		else if (finalResp === "n"){
			validRespLoop = true;
			loop = true; //you want to quit
		}
		else{
			console.log ("Invalid response. y or n");
		}
	}
}




