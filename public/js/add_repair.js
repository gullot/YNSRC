// Get the objects we need to modify
let addRepairForm = document.getElementById('add-repair-form-ajax');

// Modify the objects we need
addRepairForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRepairName = document.getElementById("input-repairName");
    let inputCost = document.getElementById("input-cost");
    console.log(inputCost);

    // Get the values from the form fields
    let repairNameValue = inputRepairName.value;
    let costValue = inputCost.value;
    console.log(costValue);

    // Put our data we want to send in a javascript object
    let data = {
        repairName: repairNameValue,
        cost: costValue
    }
    
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-repair-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputRepairName.value = '';
            inputCost.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    //location.reload();
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("services-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(newRow);

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let repairNameCell = document.createElement("TD");
    let costCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.repairID;
    repairNameCell.innerText = newRow.repairName;
    costCell.innerText = newRow.cost;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onClick = function(){
        deleteRepair(newRow.repairID);
    };

    //deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(repairNameCell);
    row.appendChild(costCell);
    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.repairID);
    console.log(row);

    // Add the row to the table
    currentTable.appendChild(row);

    //let selectMenu = document.getElementById("input-repairName-update");
    //let option = document.createElement("option");
    //option.text = newRow.customerName;
    //option.value = newRow.id;
    //selectMenu.add(option);
}