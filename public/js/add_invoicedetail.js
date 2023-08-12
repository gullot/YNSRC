// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-invoicedetail-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceID = document.getElementById("input-invoiceID");
    let invoiceIDValue = inputInvoiceID.value;
    let inputRepairServices = document.getElementsByClassName('service-radio');
    for (var i=0; inputRepairServices[i]; i++){
        if(inputRepairServices[i].checked){
            repairID = inputRepairServices[i].id;
            cost = inputRepairServices[i].value;
            break;
        }
    }

    // Put our data we want to send in a javascript object
    let data = {
        invoiceID: invoiceIDValue,
        cost: cost,
        repairID: repairID
    }
    

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoicedetail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInvoiceID = '';
            for (var i=0; inputRepairServices[i]; i++){
                if(inputRepairServices[i].checked){
                    inputRepairServices.checked = false;
                }
            }
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


// Creates a single row from an Object representing a single record from Invoices
addRowToTable = (data) => {
    location.reload()
}