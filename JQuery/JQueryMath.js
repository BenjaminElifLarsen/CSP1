
var equations = [];

function calculating() { //math calculation
    var fullString = document.getElementById("result").value.toString();
    var chars = [];
    for (i = 0; i < fullString.length; i++) {
        chars.push(fullString[i].toString());
    }
    var math = [];
    var numberString = "";
    //convert the string into its math parts and puts numbers together.
    //to do: return an error if a letter is present, right now any letters will be ignored
    for (i = 0; i < chars.length; i++) {
        if (chars[i] == "+" || chars[i] == "-" || chars[i] == "*" || chars[i] == "/" || chars[i] == "%") {
            if (numberString != "")
                math.push(numberString);
            math.push(chars[i]);
            numberString = "";
        }
        else if (chars[i] == "." || chars[i] == "," || parseFloat(chars[i]) >= 0 && parseFloat(chars[i]) <= 9) {
            numberString += chars[i];
            if (chars.length - 1 == i) {
                if (chars[i] == ",")
                    math.push(".");
                else
                    math.push(numberString);
            }
        }

    }
    var length = math.length;
    if (math[0] == "+" || math[0] == "-" || math[0] == "*" || math[0] == "%" || math[0] == "/" || math[length - 1] == "+" || math[length - 1] == "-" || math[length - 1] == "*" || math[length - 1] == "%" || math[length - 1] == "/")
        document.getElementById("result").innerHTML = "Incomplete Equation";
    else {
        var result = 0;
        var mostImportant = ["*", "/", "%"];
        var leastImportant = ["-", "+"];
        //will need to check for multiple operators in a row. 
        //should really get around to optimise this and write functions to call instead of repeating code...
        //*, /, and %
        var goneThrough0 = [];
        for (m = 0; m < math.length; m++) {
            var str = math[m];
            if (str == mostImportant[0]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(math[m + 1]);
                result = leftValue * rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            } else if (str == mostImportant[1]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(math[m + 1]);
                result = leftValue / rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            } else if (str == mostImportant[2]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(math[m + 1]);
                result = leftValue % rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;

            } else {
                goneThrough0.push(str);
            }
        }
        //+ and -
        var goneThrough1 = [];
        for (m = 0; m < goneThrough0.length; m++) {
            var str = goneThrough0[m];
            if (str == leastImportant[0]) {
                var leftValue = parseFloat(goneThrough1[goneThrough1.length - 1]);
                var rightValue = parseFloat(goneThrough0[m + 1]);
                result = leftValue - rightValue;
                goneThrough1.length = goneThrough1.length - 1;
                goneThrough1.push(result.toString());
                m++;
            } else if (str == leastImportant[1]) {
                var leftValue = parseFloat(goneThrough1[goneThrough1.length - 1]);
                var rightValue = parseFloat(goneThrough0[m + 1]);
                result = leftValue + rightValue;
                goneThrough1.length = goneThrough1.length - 1;
                goneThrough1.push(result.toString());
                m++;

            } else {
                goneThrough1.push(str);
            }
        }
        equations.push(fullString);
        DisplayEquations(goneThrough1);
        document.getElementById("result").innerHTML = goneThrough1;
    }
}


function Calculator() {
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
    var operatorArray = ['+', '-', '*', '/', '%', '.'];
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

        $('<button />').text('=').addClass(calculateClass).click(function () { calculating(); }).appendTo(placement); //adds and display a button that calculates the equatio and displays the result

        $(placement).append('<div class="NumberLocation"></div>');

        numberArray.forEach(function (value) { //adds and displays the number buttons
            $('<button />').text(value).addClass(numberClass).click(function () { document.getElementById('result').innerHTML += value; }).appendTo(numberPlacement)
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

function DisplayEquations(value) { //display the old equations and results
    $('.OldEquations').append('' + equations[equations.length-1] + ' = ' + value+'</br>')

}