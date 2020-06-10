var bbc = document.getElementsByClassName("bbc");
var dtimer = document.getElementsByClassName("dtimer");
setTimeout(function()
{
for (var i=0; i<bbc.length; i++) {
bbc[i].style = "pointer-events:auto; opacity: 1";/*['pointer-events'] = "auto";*/
}
dtimer[0].style.animation = ["blinker 0s linear infinite"];
},11000);
//js
var downloadButton = document.getElementById("dtimer");
var counter = 10;
downloadButton.innerHTML = "please wait a second.";
var id;
id = setInterval(function() {
counter--;
if(counter < 0) {
downloadButton.innerHTML = "<span class='rtimer'>... Ready ...<\span>";
clearInterval(id);
} else {
downloadButton.innerHTML = "links active in " + counter.toString() + "s.";
}}, 1000);
