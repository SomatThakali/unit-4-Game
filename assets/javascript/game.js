
$(document).ready (function(){


// Objects that holds the properties of each characters
var characters = {
    somat:{
        name: 'somat',
        healthPoints : 120,
        attackPower: 25,
        CounterAttackPower: 2,
        imageUrl: "assets/images/1.jpg"
    },

    michael:{
        name: 'michael',
        healthPoints : 100,
        attackPower: 10,
        CounterAttackPower: 15,
        imageUrl: "assets/images/2.jpg"
    },

   jamal:{
        name: 'jamal',
        healthPoints : 110,
        attackPower: 20,
        CounterAttackPower: 5,
        imageUrl: "assets/images/3.jpg"
    },


    peter:{
        name: 'peter',
        healthPoints : 150,
        attackPower: 5,
        CounterAttackPower: 25,
        imageUrl: "assets/images/4.jpg"
    }
      
}; // end of the object

// console.log(characters.somat.attackPower);

var yourCharacter; // This var is the player
var enemies = []; // an array that store enemies 
var enemy;


// This functions will create the contents of each characters
// We need a div and give a class name. and give each "character" a 
// data-attribute called "data-name and set to the, name of each character. 
// Inside this there will be abother div which will  contains the name, 
// image and the health
function createContent(character, contentArea){
    var characterDiv = $("<div class ='character' data-name='" + character.name + "'>");
    var characterName = $("<div class ='character-name'>").text(character.name)
    var characterImage = $("<img class = 'character-image'>").attr("src", character.imageUrl);
    var characterHealth = $("<div class = 'character-health'>").text(character.healthPoints);

    $(characterDiv).append(characterName).append(characterImage).append(characterHealth);
    $(contentArea).append(characterDiv);
}

// will display all the images
function startGame(){
    for (var key in characters) {
        createContent(characters[key], "#characters");
      }
    };
  
startGame();

  // this function will move all the non-slected characters inside a a div woth an if "enemies-available"
  function enemiesContent(enemyArray) {
    for (var i = 0; i < enemyArray.length; i++) {
      createContent(enemyArray[i], "#enemies-availabe");
    }
  };


// Now we have to choose our character by clickling any image
// The selected image should stored only in #character div  not on the #enemy-section div, that means,
// the click event will be appllied to #character div and the .character class
$("#characters").on("click", ".character", function(){
    // This var will save the character's name
    var name = $(this).attr("data-name");

   // If the player didn't choose the character
    if (!yourCharacter) { 
      
     yourCharacter = characters[name];
      
      for (var key in characters) {
        if (key !== name) {
          enemies.push(characters[key]); // Push all the non-selected characters to eenies array
        }
      }

      // Hide the character select div.
    //   $("#characters").style.cssText= "display: none";
    $("#characters").hide();
    
    // update the your-Character div
    $("#your-Character").empty(); // Empty the area to re-store the new object
      createContent(yourCharacter, "#your-character"); // This div will hold your character
      enemiesContent(enemies); // hold all the non-selected characters
    }

   

 });

 // click event for the enemies
 $("#enemies-availabe").on("click", ".character", function(){
    var name = $(this).attr("data-name");
    //if the #defender div is empty then insert one enemy character. we cannot enter two charater 
    // because, onvce we selected one character then the #defender div will no more be empty
    if($("#defender").contents().length === 0){ 
    enemy = characters[name];
    createContent(enemy, "#defender");
    $(this).remove(); // this will clear the defeted enemy
    }
 });

function clearMessage() {
    $('#attackText').text("");
    $('#gotAttack').text("");
}

// This will restart the game when the user click reset
 function reset(resultMessage) {
     var restart = $("<button>Restart</button>").click(function() {
      location.reload();
    });
    $('#restart').append(restart);
    $('#win-loss-message').text(resultMessage)
 }


var turn = 1; // This will track the turns during the attack
var kill = 0; // This will track the nubmer of defeted enemies
  // click event for the attack button
 $("#attack-button").on("click", function() {

 if($("#defender").children().length != 0){
    var attackText = "You attacked " + enemy.name + " for " + yourCharacter.attackPower * turn + " damage.";
    console.log('DEBUG '+ attackText);
    var gotAttack =  enemy.name + " attacked you back for  " + enemy.attackPower * turn + " damage.";
    console.log('DEBUG '+ gotAttack);
    clearMessage();

    calculateWinLoss();
    turn++;
    }

    else{
        clearMessage();
    }

 

 function calculateWinLoss(){

     enemy.healthPoints -= yourCharacter.attackPower * turn;
     if (enemy.healthPoints > 0) {
        $("#defender").empty(); // Empty the area to re-store the new object
        createContent(enemy, "#defender"); // This div will hold enemy 

        $('#attackedText').text(attackText);
        $('#gotAttack').text(gotAttack);
        yourCharacter.healthPoints -= enemy.CounterAttackPower*turn;

        $("#your-character").empty(); // Empty the area to re-store the new object
        createContent(yourCharacter, "#your-character"); // This div will hold enemy 
        
        if (yourCharacter.healthPoints <= 0) {
            clearMessage();
        //     var restart = $("<button>Restart</button>").click(function() {
        //     location.reload();
        // });
        reset('You Loose')
        $("#attack-button").off("click");
        }
    }
    else{
        $("#defender").empty();
        clearMessage();
        var message = "You have defeated " + enemy.name + ", you can choose to fight another enemy.";
        // replace the #attckedText with this message
        $('#attackedText').text(message);
       

        // Increment your kill count.
        kill++;

        if (kill >= enemies.length) {
        clearMessage();
        $("#attack-button").off("click");
        reset("You Won!!!! GAME OVER!!!");
        // var gameOvermessage = "You Won!!!! GAME OVER!!!";
        // $('#gameMessage').text(gameOvermessage);
        }   
    }
 }

     
 });

});
