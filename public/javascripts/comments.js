$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "Comments Matrix <br>";
      for(var comment in data) {
        com = data[comment];
        everything += "Name: " + com.Name + " -- Comment: " + com.Comment + "<br>";
      }
      $("#comments").html(everything);
    });
  });
  $("#deleteComments").click(function() {
    console.log("you clicked delete");
    var delName = "";
    var URL = "comment?q=" + delName;
    console.log(URL);
    $.getJSON(URL, function(data) {
      console.log(data);
      for(var comment in data) {
       delete data[comment]; 
      }
    })

  });
  $("#searchComments").click(function(event) {
    event.preventDefault();
    var name = $("#query").val();
    var URL = "comment?q=" + name;
    console.log(URL);
    $.getJSON(URL, function (data) {
      console.log(data);
      var userCom = "Comments Matrix <br>";
      for(var comment in data) {
        com = data[comment];
        userCom += "Name: " + com.Name + " -- Comment: " + com.Comment + "<br>";
      }
      $("#comments").html(userCom);
    })
  })
});

