// the below form is adapted from the CS340 node js starter app

let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

updateInvoiceForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputInvoiceID = document.getElementById("input-invoiceID-update");

    let inputRepairServices = document.getElementsByClassName('service-checkbox-update');
    let cost = 0
    let repairServices = []
    for (var i = 0; inputRepairServices[i]; i++) {
        if (inputRepairServices[i].checked) {
            cost += parseInt(inputRepairServices[i].value);
            //repairServices.push(inputRepairServices[i].id);
            repairServices.push(inputRepairServices[i].name);
        }
    }

    let invoiceIDValue = inputInvoiceID.value
    //console.log(inputInvoiceID.value);

    let data = {
        invoiceIDValue: invoiceIDValue,
        repairServices: repairServices,
        cost: cost
    };

    console.log(repairServices);
    console.log(inputRepairServices[0].checked);
    //console.log(inputRepairServices[4].checked);

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(cost, invoiceIDValue);
            //reset fields
            inputInvoiceID.value = '';
            for (var i = 0; inputRepairServices[i]; i++) {
                if (inputRepairServices[i].checked) {
                    inputRepairServices.checked = false;
                }
            }
        }
        else if (xhttp.readyState == 4 && xhttp.staus != 200) {
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

function updateRow(cost, invoiceID) {

    let table = document.getElementById("invoice-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == invoiceID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[1];

            td.innerHTML = cost;
        }
    }
};