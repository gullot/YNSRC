// the below form is adapted from the CS340 node js starter app

let updateSpaceshipForm = document.getElementById('update-spaceship-form-ajax');

updateSpaceshipForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputSpaceshipID = document.getElementById("input-spaceship-update");
    let inputNewOwnerID = document.getElementById("input-owner-update");
    let inputNewMake = document.getElementById("input-make-update");
    let inputNewModel = document.getElementById("input-model-update");

    let spaceshipIDValue = inputSpaceshipID.value;
    let ownerIDValue = inputNewOwnerID.value;
    let inputNewMakeValue = inputNewMake.value;
    let inputNewModelValue = inputNewModel.value;
    //let ownerNameValue = inputNewOwnerID.text;
    //console.log(ownerNameValue);

    let data = {
        spaceshipID: spaceshipIDValue,
        newOwner: ownerIDValue,
        newMake: inputNewMakeValue,
        newModel: inputNewModelValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-spaceship-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(spaceshipIDValue, ownerIDValue, inputNewMakeValue, inputNewModelValue);
            //reset fields
            inputSpaceshipID.value = '';
            inputNewOwnerID.value = '';
            inputNewMake.value = '';
            inputNewModel.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.staus != 200) {
            console.log("There was an error with the input.");
        }
    }
    xhttp.send(JSON.stringify(data));

});

function updateRow(spaceshipID, newOwner, newMake, newModel) {

    let table = document.getElementById("spaceship-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == spaceshipID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdMake = updateRowIndex.getElementsByTagName("td")[1];
            tdMake.innerHTML = newMake;

            let tdModel = updateRowIndex.getElementsByTagName("td")[2];
            tdModel.innerHTML = newModel;

            let tdOwner = updateRowIndex.getElementsByTagName("td")[3];
            console.log(newOwner);
            if (newOwner === 'NULL'){
                tdOwner.innerHTML = '';
            }
            else{
                tdOwner.innerHTML = newOwner;
            }

            //let tdName = updateRowIndex.getElementsByTagName("td")[4];
            //tdName.innerHTML = "uhhh";
            location.reload();
        }
    }
};