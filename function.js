$(document).ready(function () {
  console.log("document loaded");
  $("#target").click(function () {
    alert("Handler for .click() called.");
    console.log("object");
  });

  $("#other").click(function () {
    $("#target").toggleClass("color-style");
    $(".show").remove(); // this is removing the element from the dom
  });

  $(".show").mousedown(function () {
    $(this).css("color", "green");
  });
  $(".show").mouseup(function () {
    $(this).css("color", "red");
    $("#target").addClass("mark-line  red");
  });

  //   $(".big").mousemove(function(e){
  //       console.log(e.pageX,e.pageY)
  //   })

  $(".big").mousedown(function (e) {
    e.preventDefault();
    console.log(e.pageX, e.pageY);
    $(".big").mousemove(function (e) {
      // console.log(e.pageX,e.pageY)
      let pos = $(".moving-item").position();
      $(".moving-item").css({
        position: "absolute",
        top: e.pageY,
        left: e.pageX,
      });
    });
  });

  $(document).mouseup(function () {
    //   alert("I try to cancle the event ")
    $(".big").off("mousemove");
  });

  //   $(".big").mouseup(function (e) {
  //     console.log("I am in mouseup");
  //     go = false;
  //   });
});
