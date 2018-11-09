$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);var url = "comment";
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
    })
  })
  $("#deleteAll").click(function() {
    
  })
});

