//object to tie ids to classes
var lightColors = {
  "#blue": "blue-pressed",
  "#red": "red-pressed",
  "#yellow": "yellow-pressed",
  "#green": "green-pressed"
}

var synth = new Tone.Synth().toMaster();

//declares variables and controls stictMode button
$(document).ready(function() {

  var counter = {
    value: 0,
    show: function(){

      $("#count-text").text(this.value);
    }
  }
  var simonTurn = "aiPlayer";
//Array that holds aiSequence for simon to play
  var aiSequence = [];
  var huSequence = [];
  var huCounter = 0;
  var strictMode = {
    isOn: false,

    toggle: function() {
      this.isOn = this.isOn ? false : true
      this.isOn ? $('#strict-status').css('fill', '#ff0f0f') : $('#strict-status').css('fill', '#070100')
    }

  }

  counter.show();

function mainSequence(){
  addAiLight();
  counter.value++
  counter.show();
  Promise.resolve(goThroughArray(aiSequence))
  .then (function(){
    simonTurn = "human";
  });
}

//gets a random new light and adds it to the aiSequence array
function addAiLight() {
  var colors = ["#blue", "#red", "#yellow", "#green"]
  aiSequence.push(colors[getRandomInt(0,4)]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}

//adds light to human array once button is pressed
function addHuLight(light){
  if (simonTurn == "human") {
  var colorID = "#" + light;
  huSequence.push(colorID)
}
}

//checks if human button is same as what the computer wants
function checkAgainst(){

  if (huSequence[huCounter] == aiSequence[huCounter]){
    console.log("correct")
    huCounter++;
    checkForDone();
  }
  else {
    console.log("incorrect")
    setTimeout(function(){
    if (strictMode.isOn) {
      resestGame();
      mainSequence();
    }
    else {
      huCounter = 0;
      simonTurn = "aiPlayer"
      huSequence = [];
      Promise.resolve(goThroughArray(aiSequence))
      .then (function(){
        simonTurn = "human";
      });
    }
  }, 700);
  }

  function checkForDone(){
    if (huCounter >= aiSequence.length) {
      simonTurn = "aiPlayer";
      huCounter = 0;
      huSequence = [];
      setTimeout(mainSequence, 1000);
    }
  }
}





//iterates through array and lights up everything in aiSequence array

function goThroughArray(arr) {
  var i = 0;
  return iterate();


  function iterate(){
    return Promise.resolve(turnOnLight(arr[i]))
    .then(function(){
      i++;
      return new Promise(function(resolve){
      setTimeout(resolve, 500);
    })
  })
    .then(function(resolve){
        if (i < arr.length) iterate();
        else resolve
      });
    }
  }
  function turnOnLight(light) {
    return new Promise(function(resolve) {
        $(light).toggleClass(lightColors[light]);
        setTimeout(resolve, 1000);
      })
      .then(function() {
        $(light).toggleClass(lightColors[light]);
      })
  }





// functions for when buttons are clicked
  $(".color-button").click(function() {
    if (simonTurn = "human") {
        addHuLight(this.id);
        synth.triggerAttackRelease("C4", "8n");
        checkAgainst();
    }

  })

  $("#start-button").click(function(){
    resestGame();
    mainSequence();
  })

  $("#strict-button").click(function() {
    strictMode.toggle();
  });

function resestGame() {
  simonTurn = "aiPlayer";
  huCounter = 0;
  huSequence = [];
  aiSequence = [];
  counter.value = 0;
  counter.show();
}

});
