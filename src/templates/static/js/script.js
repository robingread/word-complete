$( document ).ready(function() {

    function createCanvas(parent, width, height) {
     var canvas = document.getElementById("inputCanvas");
     canvas.context = canvas.getContext('2d');
     return canvas;
   }
 
   function init(container, width, height, fillColor) {
     var canvas = createCanvas(container, width, height);
     var ctx = canvas.context;
     ctx.fillCircle = function(x, y, radius, fillColor) {
       this.fillStyle = fillColor;
       this.beginPath();
       this.moveTo(x, y);
       this.arc(x, y, radius, 0, Math.PI * 2, false);
       this.fill();
     };
     ctx.clearTo = function(fillColor) {
       ctx.fillStyle = fillColor;
       ctx.fillRect(0, 0, width, height);
     };
     ctx.clearTo("#fff");
 
     canvas.onmousemove = function(e) {
       if (!canvas.isDrawing) {
         return;
       }
       var x = e.pageX - this.offsetLeft;
       var y = e.pageY - this.offsetTop;
       var radius = 10;
       var fillColor = 'rgb(102,153,255)';
       ctx.fillCircle(x, y, radius, fillColor);
     };
     canvas.onmousedown = function(e) {
       canvas.isDrawing = true;
     };
     canvas.onmouseup = function(e) {
       canvas.isDrawing = false;
     };
   }
 
   var container = document.getElementById('canvas');
   let characterBuffer = "";
   init(container, 200, 200, '#ddd');

   function showCharacters(buffer="none") {
    var input = document.getElementById("characters")
    input.value = buffer;
   }
 
   $( "#clearButton" ).click(function(){
     characterBuffer = "";
     showCharacters(characterBuffer);
   });
 
   $( "#sendButton" ).click(function(){
     showCharacters();
   });

   $(document).keyup(function(e) {
    var keynum = e.keyCode;
    characterBuffer += String.fromCharCode(keynum)
    showCharacters(characterBuffer);
  });
 });