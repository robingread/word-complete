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

   function completeCharacters(buffer) {  
      var payload = buffer;
    //   var words = ["apple", "banana"];
      
    //   $.post('/complete', payload, function(data) {
    //     // var response = JSON.parse(data);
    //     words = data.words;
    //     // Do something with the returned data
    //     console.log(data);
    //   }).fail(function(error) {
    //     // Handle any errors that occur during the request
    //     console.error(error);
    //   });

      return new Promise(function(resolve, reject) {
        $.post("/complete", payload, function(data) {
          // This code will be executed when the request succeeds
          var words = data.words;
          resolve(words);
        }).fail(function() {
          // This code will be executed if the request fails
          reject(new Error("Failed to fetch words"));
        });
      });
   }

   function populateList(words) {
    // Get a reference to the <ul> element
    var list = document.getElementById('word-list');
    list.innerHTML = '';

    // var words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

    // Loop through the array of words
    for (var i = 0; i < words.length; i++) {
      // Create a new <li> element for each word
      var listItem = document.createElement('li');
      listItem.textContent = words[i];

      // Add the <li> element to the <ul> element
      list.appendChild(listItem);
    }
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
    var deleteKey = 46;
    var backspaceKey = 8;

    if(e.keyCode == deleteKey){
        characterBuffer = "";
    }
    else if (e.keyCode == backspaceKey) {
        characterBuffer = characterBuffer.slice(0, -1);
    }
    else if (e.keyCode >= 65 && e.keyCode <= 90) {
        characterBuffer += String.fromCharCode(keynum).toLowerCase();
    }

    showCharacters(characterBuffer);
    completeCharacters(characterBuffer).then(function(words){
        console.log(words);
        populateList(words);
    });
  });
 });