
var lightColors = {
  "#blue": {dim: "#134faf", lit: "#0f4fff"},
  "#red": {dim: "#af1313", lit: "#ff0f0f"},
  "#yellow": {dim: "#afaf13", lit: "#fff319"},
  "#green": {dim: "#0f910f", lit: "#18dd18"}
}




$(document).ready(function() {

  var counterNum = 0;

  var strictMode = {
    isOn: false,

    toggle: function() {
      this.isOn = this.isOn ? false : true
      this.isOn ? $('#strict-status').css('fill', '#ff0f0f') : $('#strict-status').css('fill', '#070100')
    }

  }





var sequence = ["#red", "#blue", "#yellow", "#yellow", "#green"];

goThroughArray(sequence);


function goThroughArray(arr) {
  var i = 0;
  iterate();

  function iterate(){
    new Promise(function(resolve){
      resolve(turnOnLight(arr[i]));
    })
    .then(function(){
      i++;
      return new Promise(function(resolve){
      setTimeout(resolve, 500);
    })
  })
    .then(function(){
        if (i < arr.length) iterate();
      });
    }
  }






  function turnOnLight(light) {
    return new Promise(function(resolve) {
        $(light).css('fill', lightColors[light].lit);
        setTimeout(resolve, 1000);
      })
      .then(function() {
         $(light).css('fill', lightColors[light].dim);
      })


  }


  $("#count-text").text(counterNum);


  $("#red").click(function() {
    console.log("red clicked");
  })

  $("#yellow").click(function() {
    console.log("yellow clicked")
  });

  $("#green").click(function() {
    console.log("green clicked")
  });

  $("#blue").click(function() {
    console.log("blue clicked")
  });

  $("#start-button").click(function() {
    console.log("start clicked")
  });

  $("#strict-button").click(function() {
    strictMode.toggle();
  });



});
