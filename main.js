$(document).ready(function() {

  var counterNum = 0;

  var strictMode = {
    isOn: false,

    toggle: function() {
      this.isOn = this.isOn ? false : true
      this.isOn ? $('#strict-status').css('fill', '#ff0f0f') : $('#strict-status').css('fill', '#070100')
    }

  }



  var sequence = ["#red", "#blue", "#yellow"];

goThroughArray(sequence);


  function goThroughArray(arr) {
  var i = 0;
    new Promise(function(resolve){
      resolve(turnOnLight(sequence[i]));
    })
    .then(function(){
      console.log("finish")
    })
  }





  function turnOnLight(light) {

    return new Promise(function(resolve) {
        $(light).css('fill', '#ff0f0f');
        setTimeout(resolve, 1000);
      })
      .then(function() {
        $(light).css('fill', '#af1313');
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
