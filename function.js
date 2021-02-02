$(document).ready(function () {
  console.log("document loaded");
  let g = new Game();
  g.startGame();
  // e.showElement()

  // let container = $(".container")
  // container.append('<div class="new-div">hello</div>');
  // $('.new-div').css({
  //   position: "absolute",
  //   top: 111,
  //   left: 100,
  // });
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

  let go = false;
  // this is going to be the best code ever
  $(".moving-item").mousedown(function (e) {
    e.preventDefault();
    go = true;
  });
  $(document).mousemove(function (e) {
    // console.log(e.pageX,e.pageY)
    if (go) {
      let item = $(".moving-item");
      let pos = item.position();
      console.log(item.height());
      item.css({
        position: "absolute",
        top: e.pageY - item.height() / 2,
        left: e.pageX - item.width() / 2,
      });
    }
  });

  $(document).mouseup(function () {
    go = false;
    $(".moving-item").off("mousemove");
  });
});
