// Doc Ready Function
$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyBag03wJk92BtKLfC14BZDVu_jdjZQOqn8",
        authDomain: "trainscheduler2-6a7af.firebaseapp.com",
        databaseURL: "https://trainscheduler2-6a7af.firebaseio.com",
        projectId: "trainscheduler2-6a7af",
        storageBucket: "",
        messagingSenderId: "799037074008",
        appId: "1:799037074008:web:f9c48485fc25ce9b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

     var database = firebase.database();
//   console.log(database.)
// Create a variable to reference database


// Collect userInput from the submit button and store it in specific variables
$("#submit").on("click", function (event) {
event.preventDefault();
        var formTrainName = $("#formTrainName").val().trim();

        var formDestination = $("#formDestination").val().trim();

        var formFirstTrain = $("#formFirstTrain").val().trim();

        var formFrequency = $("#formFrequency").val().trim();

// To ensure there are no empty fields:
        if(formTrainName.length > 0){
            formTrainName = $("#formTrainName").val().trim();
        } else {
            alert("oh no! form Train Name is empty")
        }
        if(formDestination > 0){
            formDestination = $("#formDestination").val().trim();
        } else {
            alert("oh no! form Destination is empty")
        }
        if(formFirstTrain.length > 0){
            formFirstTrain = $("#formFirstTrain").val().trim();
        } else {
            alert("oh no! form First Train is empty")
        }
        if(formFrequency > 0){
            formFrequency = $("#formFrequency").val().trim();
        } else {
            alert("oh no! form Frequency is empty")
        }

// New object that is created using the newly defined variables 
        var trainInfo = {
            name: formTrainName,
            destination: formDestination,
            firstTrain: formFirstTrain,
            frequency: formFrequency
        }
// Push the info to the database
    database.ref().push(trainInfo)

// Clear the values of the inputs 
        $("#formTrainName").val("");
        $("#formDestination").val("");
        $("#formFirstTrain").val("");
        $("#formFrequency").val("");

        }); 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// This function will display the elements on the page by grabbing them from the database 
database.ref().on(
    "child_added",
    function(snapshot) {
        console.log(snapshot .val());
   
    //   Grab elements from database and store them in brand new variables
      var newTrainName = snapshot.val().name;
      var newDestination = snapshot.val().destination;
      var firstTrain= snapshot.val().firstTrain;
      var newFrequency = snapshot.val().frequency;
  
      // Use the newly created variables in order to get the remainder of our next arrival (in minutes) 
      var firstTrainDeparture = moment(firstTrain, "hh:mm").subtract(1, "days");
      var differentTime = moment().diff(moment(firstTrainDeparture), "minutes");
      var newRemainder = differentTime % newFrequency;
      var minutesUntilNext = newFrequency - newRemainder;
  
      //To get exact time for train to arrive
      var nextTrain = moment().add(minutesUntilNext, 'minutes');
      var nextTrainArrival = moment(nextTrain).format('HH:mm');
  
      // Create table and data elements to store new information
      var firstColumn = $('<td>').text(newTrainName);
      var secondColumn = $('<td>').text(newDestination);
      var thirdColumn = $('<td>').text(newFrequency);
      var fourthColumn = $('<td>').text(nextTrainArrival);
      var fithColumn = $('<td>').text(minutesUntilNext);
      var tr = $('<tr>');
      tr.append(firstColumn, secondColumn, thirdColumn, fourthColumn, fithColumn);
  
      //Append elements to assigned ID element.
      $("#tbody").append(tr);
    },
    // function(errorObject) {
    //   console.log('Errors handled: ' + errorObject.code);
    // }
  );


// Check the code below to see what needs to be deleted or kept...

database.ref("/trains").on('child_added', function(response){
            console.log(response.val())
            console.log(response.val().name)
            console.log(response.val().destination)
            console.log(response.val().time)
            console.log(response.val().frequency)

       
        var tr = $('<tr>');
        var tdName = $('<td>').text(response.val().name);
        var tdDestination = $('<td>').text(response.val().destination)
        var tdTime = $('<td>').text(response.val().time);
        var tdFrequency = $('<td>').text(response.val().frequency)
            var tdMinA = $('<td>').text('')
            tr.append(tdName, tdDestination, tdTime, tdFrequency, tdMinA);
            $('#tbody').append(tr)
        })
        

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        
        //else {
        //     // alert("Please enter valid train data");
        //     // $("input").val("");
        //     // return false;
        // }

        // //console.log(database);

        // $("input").val("");

    });















    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



// database.ref().on("child_added", function (childSnapshot) {
//     // console.log(childSnapshot.val());

//     var name = childSnapshot.val().name;
//     var destination = childSnapshot.val().destination;
//     var time = childSnapshot.val().time;
//     var frequency = childSnapshot.val().frequency;

//     // console.log(name, number, destination, time, frequency);

//     //time formatting
//     //this required a LOT of googling to figure out
//     var frequency = parseInt(frequency);
//     var currentTime = moment();

//     //console.log("Current time: " + moment().format("HHmm"));

//     //originally used mil format of HHMM but that failed with a null value
//     //looked up potential faults and it turns out that moment.js must use
//     //HH:mm for mil/euro time format
//     var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

//     //console.log("DATE CONVERTED: " + dateConvert);

//     var trainTime = moment(dateConvert).format("HHmm");

//     //console.log("Train time : " + trainTime);

//     //difference bw the times
//     var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
//     var timeDifference = moment().diff(moment(timeConvert), "minutes");

//     //console.log("Difference in time: " + timeDifference);

//     //remainder
//     var timeRemaining = timeDifference % frequency;

//     //console.log("Time remaining: " + timeRemaining);

//     //time until next train
//     var timeAway = frequency - timeRemaining;

//     //console.log("Minutes until next train: " + timeAway);

//     //next train arrival
//     var nextArrival = moment().add(timeAway, "minutes");

//     //figured out that adding "A" at the end of HH:mm will add AM or PM
//     //given that this is mil/euro format, the AM/PM is not necessary
//     //console.log("Arrival time: " + moment(nextArrival).format("HHmm"));

//     var arrivalDisplay = moment(nextArrival).format("HHmm");

// //append data to table
// $("#boardText").append(
//     "<tr><td id='nameDisplay'>" + childSnapshot.val().name + 
//     "<td id='destinationDisplay'>" + childSnapshot.val().destination + 
//     "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
//     "<td id='arrivalDisplay'>" + arrivalDisplay + 
//     "<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");

//     // console.log(arrivalDisplay);
//     // console.log(timeAway);
// });

// //reset functionality
// $(".resetInput").on("click", function(event){
//     location.reload();
// });

// //auto refresh per 1 minute passed
// //updates the train data upon refresh
// setInterval("window.location.reload()", 60000);




