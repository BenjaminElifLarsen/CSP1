/// <reference path="tsmath.ts" />


function CalculatorAnimation() {
    var animated = '.PrimaryAnimation';
    var placement = '.Location'; //don't have a variable called Location, the browser will try to load the value instead of the page sometimes
    var numberPlacement = '.NumberLocation'
    var operatorClass = 'Operator';
    var clearClass = 'Clear';
    var numberClass = 'Number'
    var calculateClass = 'Calculate'
    var displayed = 0; //if clicking the button multiple times, the new buttons and text area will appear multiple times
    //write the entire equation out in the display and when the user clicks '=' it will display the result 
    //maybe animate the text displayment in the textarea
    var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var operatorArray = ['+', '-', '*', '/', '%', '.', '(',')','^'];
    $(animated).fadeOut(0);
    $('.Display').on('click', function () {
        $('<textarea />').text("").attr('id', 'result').appendTo(placement).wrap('<div></div>');

        operatorArray.forEach(function (value) { //create and add operator buttons to the page
            $('<button />').text(value).addClass(operatorClass).click(function () { document.getElementById('result').innerHTML += value; }).appendTo(placement) //could make functions out of these
        });

        $('<button />').text('c').addClass(clearClass).click(function () { //adds a button and display it, the button can remove a char
            if (document.getElementById('result').innerHTML.length != 0) {
                var array = document.getElementById('result').innerHTML.split('');
                array.length = array.length - 1;
                var stringArray = array.toString();
                var string = stringArray.replaceAll(',', '');
                document.getElementById('result').innerHTML = string;
            }
        }).appendTo(placement);

        $('<button />').text('=').addClass(calculateClass).click(function ()
        {
            document.getElementById('result').innerHTML = Calculator.Calculation(document.getElementById('result').innerHTML);
            //for (var i = 0; i < GetOldEquations().length; i++) {
            //    $('.OldEquations').append('' + GetOldEquations()[i].Equation + ' = ' + GetOldEquations()[i].Result + '</br>')
            $('.OldEquations').append('' + GetLastOldEquation().toString() + '</br>'); 
            //}
        }).appendTo(placement); //adds and display a button that calculates the equatio and displays the result

        $(placement).append('<div class="NumberLocation"></div>');

        numberArray.forEach(function (value) { //adds and displays the number buttons
            $('<button />').text(value).addClass(numberClass).click(function () { document.getElementById('result').innerHTML += value; }).appendTo(numberPlacement);
        });
        $('<button />').text('Clear').addClass(operatorClass).click(function () { document.getElementById('result').innerHTML = ''; }).appendTo(numberPlacement).wrap('<div></div>'); //adds and displays the full clear button

        $('.' + numberClass).fadeOut(0).fadeIn(6000);
        $('.' + operatorClass).fadeOut(0).fadeIn(4000);
        $('#result').fadeOut(0).fadeIn(2000);
    });
    $('.Display').click(function () { //function that displays the calculator
        $(animated).animate({
            width: 'show',
            height: 'show',
            marginLeft: 100,
            marginTop: 100
        }, 2000);
        $(this).fadeOut(500);
    });
}

