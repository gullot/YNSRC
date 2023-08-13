function deleteCustomer(customerID) {
    let data = {
        id: customerID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log("Trying to delete row");
            deleteRow(customerID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }
    xhttp.send(JSON.stringify(data));
};

function deleteRow(customerID) {
    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log("Current row ID = " + table.rows[i].getAttribute("data-value") + " looking for " + customerID);
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            break;
        }
    }
};