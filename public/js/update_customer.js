let updateCustomerForm = document.getElementById('update-customer-form-ajax');

updateCustomerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputCustomerID = document.getElementById("input-customerName-update");
    let inputTelephone = document.getElementById("input-telephone-update");

    let customerIDValue = inputCustomerID.value
    let telephoneValue = inputTelephone.value;

    console.log("customer ID: " + customerIDValue);
    console.log("telephone: " + telephoneValue);

    if (isNaN(telephoneValue))
    {
        return;
    }

    let data = {
        customerIDValue: customerIDValue,
        telephone: telephoneValue,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            updateRow(telephoneValue, customerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.staus != 200) {
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

function updateRow(telephoneValue, customerID){

    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[2];

            td.innerHTML = telephoneValue;
        }
    }
};