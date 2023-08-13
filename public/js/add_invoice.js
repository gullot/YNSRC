// the below form is adapted from the CS340 node js starter app

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSpaceshipOwner = document.getElementById("input-spaceshipOwner");
    let inputSpaceshipModel = document.getElementById("input-spaceshipModel");

    // Get elements from a checkbox form type https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
    let inputRepairServices = document.getElementsByClassName('service-checkbox');
    let cost = 0
    let repairServices = []
    for (var i = 0; inputRepairServices[i]; i++) {
        if (inputRepairServices[i].checked) {
            cost += parseInt(inputRepairServices[i].value);
            repairServices.push(inputRepairServices[i].id);
        }
    }

    // Get the values from the form fields
    let spaceshipOwnerValue = inputSpaceshipOwner.value;
    let spaceshipModelValue = inputSpaceshipModel.value;

    // Put our data we want to send in a javascript object
    let data = {
        owner: spaceshipOwnerValue,
        model: spaceshipModelValue,
        cost: cost,
        repairServices: repairServices
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSpaceshipOwner.value = '';
            inputSpaceshipModel.value = '';
            for (var i = 0; inputRepairServices[i]; i++) {
                if (inputRepairServices[i].checked) {
                    inputRepairServices.checked = false;
                }
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            alert(`No spaceship model of type ${data.model} owned by ${data.owner}. Please double check and try again!`);
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


// Creates a single row from an Object representing a single record from Invoices
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let costCell = document.createElement("TD");
    let spaceshipIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceID;
    costCell.innerText = newRow.cost.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
    spaceshipIDCell.innerText = newRow.spaceshipID;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(costCell);
    row.appendChild(spaceshipIDCell);

    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}