# YNSRC
CS340 Intro to Databases collaborative repo for the term project

The routes in app.js are based on and adapted from the CS340 node.js starter app.

The .hbs files for each of the pages of this site are also adapted from the CS340 starter app.

The AJAX javascript forms in the ./js folder are based on the forms from the CS340 starter app.

There are a few instances is which re-generating a button in the table upon row creation was modeled around the resources found on // https://stackoverflow.com/questions/15315315/how-do-i-add-a-button-to-a-td-using-js , as show in add_customer on line 88 and add_repair on line 80

In add_invoice.js, we cite //  https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox on line 16 in order to help us get elements from a checkbox form type. Additionally, the for loop on line 20 for resetting the total cost of an invoice is our own original work.

In add_invoicedetail.js, our original work includes the for loops to reset the checkboxes on line 44 and the for loop on line 17 to get the cost from all the repairs selected.