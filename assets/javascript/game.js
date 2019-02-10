
$(document).ready (function(){


// Objects that holds the properties of each characters
var characters = {
    somat:{
        name: 'somat',
        healthPoints : 120,
        attackPower: 6,
        CounterAttackPower: 20,
        imageUrl: "/assets/images/1.jpg"
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
        imageUrl: "assets/images/3.jpg"
    }
      
}; // end of the object

// console.log(characters.somat.attackPower);

var yourCharacter;
var enemy;


// This functions will create the contents of each characters
// We need a div and give a class name. and give each "character" a 
// data-attribute called "data-name and set to the, name of each character. 
// Inside this there will be abother div which will  contains the name, 
// image and the health
function createContent(character, contentArea){
    var characterDiv = $("<div class ='character' data-name='" + character.name + "'>");
    var characterName = $("<div class ='character-name>").html(character.name)
    var characterImage = $("<img class = 'character-image'").attr("src", character.imageUrl);
    var characterHealth = $("<div class = 'character-health>").html(character.health);

    characterDiv.append(characterName).append(characterImage).append(characterHealth);
    $(contentArea).append(characterDiv);
}


function startGame(){
    for (var key in characters) {
        createContent(characters[key], "#characters");
      }
    };
  






startGame();
});
