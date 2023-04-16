$( document ).ready(function() {
 
   let characterBuffer = "";

   function showCharacters(buffer="none") {
    var input = document.getElementById("characters")
    input.value = buffer;
   }

   function completeCharacters(buffer) {  
      var payload = buffer;

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
    var list = document.getElementById('word-list');
    list.innerHTML = '';

    for (var i = 0; i < words.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = words[i];
      list.appendChild(listItem);
    }
  }
 
   $( "#clearButton" ).click(function(){
     characterBuffer = "";
     showCharacters(characterBuffer);
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
    
    if (characterBuffer.length == 0) {
        populateList([]);
        return;
    }

    completeCharacters(characterBuffer).then(function(words){
        console.log(words);
        populateList(words);
    });
  });
 });