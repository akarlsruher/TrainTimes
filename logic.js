
// ========================================== START CODING BELOW!!
// Firebase link
var url ='https://sweltering-torch-9468.firebaseio.com'
var dataRef = new Firebase(url);
// Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";
// Capture Button Click
$("#addTrain").on("click", function() {
	// YOUR TASK!!!
	// Code in the logic for storing and retrieving the most recent user. 
	// Dont forget to provide initial data to your Firebase database. 
	trainName = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	firstTime = $('#firstTime').val().trim();
	frequency = $('#frequency').val().trim();
	// Code for the push


			// Assumptions
		
		

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency; 
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

	

	dataRef.push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
		minutesAway: tMinutesTillTrain,
		nextTrain:moment(nextTrain).format("hh:mm"),
		dateAdded: Firebase.ServerValue.TIMESTAMP
	})

		// Don't refresh the page!
	return false;
});
//Firebase watcher + initial loader HINT: .on("value")
dataRef.on("child_added", function(childSnapshot) {
	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTime);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().dateAdded)
	

	var tName = childSnapshot.val().trainName;
	var dest = childSnapshot.val().destination;
	var fTime = childSnapshot.val().firstTime;
	var fquency = childSnapshot.val().frequency;
	var timeStamp = childSnapshot.val().dateAdded;
	var minutesLeft = childSnapshot.val().minutesAway;
	var nTrain = childSnapshot.val().nextTrain;
	// full list of items to the well
   				
	$('#trainTable > tbody').append("<tr><td>"+tName+"</td><td>"+dest+"</td><td>"+fquency+"</td><td>"+nTrain+"</td><td>"+minutesLeft+"</td></tr>");
  
// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});
dataRef.orderByChild("dateAdded").limitToLast(2).on("child_added", function(snapshot){
	// Change the HTML to reflect
	$("#trainName").html(snapshot.val().trainName);
	$("#destination").html(snapshot.val().destination);
	$("#firstTime").html(snapshot.val().firstTime);
	$("#frequency").html(snapshot.val().frequency);
});



