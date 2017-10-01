//object to tie ids to classes
var lightColors = {
  "#blue": "blue-pressed",
  "#red": "red-pressed",
  "#yellow": "yellow-pressed",
  "#green": "green-pressed"
}



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
  new Promise(function(resolve){
    resolve(goThroughArray(aiSequence))
  })
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





//iterates through array and lights up everything in aiSequence array

function goThroughArray(arr) {
  var i = 0;
  return iterate();

  function iterate(){
    return new Promise(function(resolve){
      resolve(turnOnLight(arr[i]));
    })
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
    addHuLight(this.id);
  })

  $("#start-button").click(function(){
    mainSequence();
  })

  $("#strict-button").click(function() {
    strictMode.toggle();
  });



});
