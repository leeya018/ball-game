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


// this is going to be the best code ever
  $(".moving-item").mousedown(function (e) {
    e.preventDefault();
    $(".moving-item").mousemove(function (e) {
      // console.log(e.pageX,e.pageY)
      let pos = $(".moving-item").position();
       console.log($(this).height())
      $(".moving-item").css({
        position: "absolute",
        top: e.pageY - $(this).height()/2,
        left: e.pageX - $(this).width()/2,
      });
    });
  });

  $(document).mouseup(function () {
    $(".moving-item").off("mousemove");
  });
