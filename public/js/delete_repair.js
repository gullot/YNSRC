// the below form is adapted from the CS340 node js starter app

function deleteRepair(repairID) {
    let data = {
        id: repairID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-repair-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log("Trying to delete repair row");
            deleteRow(repairID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }
    xhttp.send(JSON.stringify(data));
};

function deleteRow(repairID) {
    let table = document.getElementById("services-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log("Current row ID = " + table.rows[i].getAttribute("data-value") + " looking for " + repairID);
        if (table.rows[i].getAttribute("data-value") == repairID) {
            table.deleteRow(i);
            break;
        }
    }
};