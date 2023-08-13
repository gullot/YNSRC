// event listener to pre-populate the make and model based on the selection of the spaceshipID
let newMake = document.getElementById("input-make-update");
let newModel = document.getElementById("input-model-update");
let inputSpaceshipID = document.getElementById("input-spaceship-update");

inputSpaceshipID.addEventListener("input", function(){
    let selectedSpaceship = inputSpaceshipID.options[inputSpaceshipID.selectedIndex];

    newMake.value = selectedSpaceship.textContent.split(" ")[0];
    newModel.value = selectedSpaceship.textContent.split(" ")[1];
})