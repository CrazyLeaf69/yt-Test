$(document).ready(async function(){
    $("#fcf-button").click(function(){
        const Name = $("#Name").val()
        const Email = $("#Email").val()
        const Message = $("#Message").val()
        sendEmail(Name, Email, Message)
    });
  });
function sendEmail(name, mail, msg) {
    window.open(`mailto:lowe.lowing@gmail.com?subject=from ${name}&body=${msg}`);
}