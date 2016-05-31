// declare global variables
var employeeData = []; // stores each employee object - not actively using for anything
var salaries = []; // stores each employee annual salary
var calculation; // gets assigned to a function within the submitData function. made it a global var so jQuery function can access
var monthlySalary; // made it a global var so submitData and removeData functions can both access/update its value
var cell5; // made it a global var so when set id and data attributes in submitData function, can access them in jQuery function so logic knows which salary to remove

// giant function for when user clicks Submit Employee button to populate data in table and calculate monthly cost of salaries
function submitData () { // gets called each time user clicks on the Submit Employee button, essentially creating/populating each row in the table
    var individual = { // creates employee objects that assigns the corresponding user input as the value for each property
      "First Name": document.getElementById('firstName').value,
      "Last Name": document.getElementById('lastName').value,
      "ID #": document.getElementById('empNum').value,
      "Job Title": document.getElementById('jobTitle').value,
      "Annual Salary": document.getElementById('empSalary').value
    };

    employeeData.push(individual); // pushes each employee object to array - not actively using array for anything
    salaries.push(individual['Annual Salary']); // pushes each employee's annual salary to array

    // adds each employee's data as a row in table so user can see what they entered in form
    var createRow = holdData.insertRow(); // creates new row in table
    var cell1 = createRow.insertCell(0); // creates new cell at that index value in row
    var cell2 = createRow.insertCell(1);
    var cell3 = createRow.insertCell(2);
    var cell4 = createRow.insertCell(3);
    cell5 = createRow.insertCell(4); // no var keyword because cell5 was declared as a global var up top
    cell5.setAttribute('data-remove', document.getElementById('empSalary').value); // set data attribute of each cell5 created - each named 'remove' and value is the employee's (from that row) annual salary from form
    cell5.setAttribute('id', 'cell'); // set ID attribute of each cell5 created to be 'cell' - gets used in jQuery function
    var cell6 = createRow.insertCell(5);
    cell1.innerHTML = individual['First Name']; // places value of employee's First Name property in proper table cell
    cell2.innerHTML = individual['Last Name']; // places value of employee's Last Name property in proper table cell
    cell3.innerHTML = individual['ID #']; // places value of employee's ID # property in proper table cell
    cell4.innerHTML = individual['Job Title']; // places value of employee's Job Title property in proper table cell
    cell5.innerHTML = Number(individual['Annual Salary']).toLocaleString('USD', {style: 'currency', currency: 'USD'}); // // places value of employee's Annual Salary property in proper table cell, and converts to USD currency format
    function createDeleteButton () { // creates clone of original delete button created in html file so each employee has own delete button - gets used in jQuery function
      var deleteButton = document.getElementById('delete');
      var clone = deleteButton.cloneNode();
      return clone;
    }
    cell6.appendChild(createDeleteButton());

    calculation = function() { // adds up annual salaries for all employees entered in table and returns that value
      var amount = 0;
      for (var i = 0; i < salaries.length; i++) {
        amount += Number(salaries[i]);
      }
        return amount;
    };

    monthlySalary = (calculation() / 12);  // calculate monthly cost of salaries
    document.getElementById('monthly').innerHTML = monthlySalary.toLocaleString('USD', {style: 'currency', currency: 'USD'}); // sets html content of Monthly Cost of Salaries and converts it to USD currency format
} // end of submitData function!!


// another giant function for when user clicks any employee's Delete button to both remove that employee from the table, as well as remove their annual salary from the salaries array so the monthly cost of salaries can be recalculated to exclude that employee's salary
$(document).ready(function(){
  $('body').on('click', '#submit', function(){ // function that clears form after each user submission - when user clicks Submit Employee button
    $('#employeeForm').children('input').val('');
  });
  $('#holdData').on('click', '#delete', function(){ // function that dictates what all happens when user clicks any employee's Delete button
    var deletedSalary = $(this).closest('tr').find('#cell').data('remove'); // create var to store annual salary of the employee in this row - finds cell5 which has ID 'cell' and returns the value assigned to the data attribute
    $.each(salaries, function (j, dollars) { // iterate through global salaries array - is similar to a for loop. j is the index counter
      if (dollars == deletedSalary) { // if the value at the index in the salaries array matches the salary of the employee in the row of the clicked Delete button
        salaries.splice(j, 1); // then remove that salary from the salaries array
      }
    });
    monthlySalary = calculation() / 12; // recalculate monthly cost of salaries after salaries array updated
    document.getElementById('monthly').innerHTML = monthlySalary.toLocaleString('USD', {style: 'currency', currency: 'USD'}); // sets html content of Monthly Cost of Salaries and converts it to USD currency format
    $(this).closest('tr').remove(); // removes employee row - same row as clicked Delete button
  });
});
