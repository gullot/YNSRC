// Get the objects we need to modify
let addSpaceshipForm = document.getElementById('add-spaceship-form-ajax');

// Modify the objects we need
addSpaceshipForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOwner = document.getElementById("input-owner");
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");

    // Get the values from the form fields
    let ownerValue = inputOwner.value;
    let makeValue = inputMake.value;
    let modelValue = inputModel.value;

    // Put our data we want to send in a javascript object
    let data = {
        owner: ownerValue,
        spaceshipMake: makeValue,
        spaceshipModel: modelValue
    };

    //console.log(data.owner);
    //console.log(data.spaceshipMake);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-spaceship-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOwner.value = '';
            inputMake.value = '';
            inputModel.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {
    location.reload();
    // Get a reference to the current table on the page and clear it out.
    //let currentTable = document.getElementById("spaceship-table");

    // Get the location where we should insert the new row (end of table)
    //let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    //console.log(newRow);

    // Create a row and cells
    let row = document.createElement("TR");
    //let idCell = document.createElement("TD");
    //let makeCell = document.createElement("TD");
    //let modelCell = document.createElement("TD");
    //let ownerCell = document.createElement("TD");
    //let ownerNameCell = document.createElement("TD");

    // Fill the cells with correct data
    //idCell.innerText = newRow.spaceshipID;
    //makeCell.innerText = newRow.spaceshipMake;
    //modelCell.innerText = newRow.spaceshipModel;
    //ownerCell.innerText = newRow.customerID;
    //ownerNameCell.innerText = newRow.

    // Add the cells to the row 
    //row.appendChild(idCell);
    //row.appendChild(makeCell);
    //row.appendChild(modelCell);
    //row.appendChild(ownerCell);
    
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    //currentTable.appendChild(row);

    //let selectMenu = document.getElementById("input-spaceship-add");
    //let option = document.createElement("option");
    //option.text = newRow.spaceshipID;
    //option.value = newRow.id;
    //selectMenu.add(option);
}