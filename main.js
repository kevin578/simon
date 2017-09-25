$(document).ready(function() {

  var counterNum = 0;

  var strictMode = {
    isOn: false,

    toggle: function() {
      this.isOn = this.isOn ? false : true
      this.isOn ? $('#strict-status').css('fill', '#ff0f0f') : $('#strict-status').css('fill', '#070100')
    }

  }


turnOnLight("#red")

function turnOnLight(light) {

  new Promise(function(resolve){
    $(light).css('fill','#ff0f0f');
    setTimeout(resolve, 1000);
  })
  .then(function(){
    $(light).css('fill','#af1313');
  })


}



  function goThroughArray(stopTime) {
    var i = 0;

    iterate();

    function iterate() {
      new Promise(function(resolve) {
          setTimeout(resolve, 1000);
        })
        .then(function() {
          console.log(i)
          i++
          if (i <  stopTime) iterate();
        })

    }

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
