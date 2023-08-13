// the below form is adapted from the CS340 node js starter app

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-customerName");
    let inputTelephone = document.getElementById("input-telephone");

    // Get the values from the form fields
    let customerNameValue = inputCustomerName.value;
    let telephoneValue = inputTelephone.value;

    // Put our data we want to send in a javascript object
    let data = {
        customerName: customerNameValue,
        telephone: telephoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputTelephone.value = '';
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

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerNameCell = document.createElement("TD");
    let telephoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    customerNameCell.innerText = newRow.customerName;
    telephoneCell.innerText = newRow.telephone;

    //// adds delete button for this cell based on customerID
    //let deleteButton = document.createElement("input");
    //deleteButton.type = "button";
    //deleteButton.innerHTML = "Delete";
    //deleteButton.onClick = function(){
    //    deleteCustomer(newRow.customerID);
    //};

    
    // https://stackoverflow.com/questions/15315315/how-do-i-add-a-button-to-a-td-using-js
    let btn = document.createElement('input');
    btn.type = "button";
    btn.id = newRow.customerID
    btn.className = "btn";
    btn.value = "Delete";
    btn.onclick = function(){
        deleteCustomer(newRow.customerID);
    };

    //deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerNameCell);
    row.appendChild(telephoneCell);
    row.appendChild(btn);
    
    row.setAttribute('data-value', newRow.customerID);

    // Add the row to the table
    currentTable.appendChild(row);

    //adds the newly added row to the dynamic drop down on page for update
    let selectMenu = document.getElementById("input-customerName-update");
    let option = document.createElement("option");
    option.text = newRow.customerName;
    option.value = newRow.customerID;
    selectMenu.add(option);
}