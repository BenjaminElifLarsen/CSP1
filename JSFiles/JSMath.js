var numberOfButtonPresses = 0;
//Number number = 5;
//String string = "Text";

//var x = 4;
//var y = 5;
//function ButtonPress() {
//    numberOfButtonPresses++;
//    alert("Jaaaaaaa " + numberOfButtonPresses);
//}

//function ButtonPress(parameter) {
//    parameter++;
//    alert("Naaaaaaa " + parameter);
//    return parameter;
//}

function ButtonPress(parameter) {
    alert("Naaaaaaa " + ++parameter);
    return parameter;
}

function WriteOut() {
    if (document.getElementById("test").innerHTML != "<h3>Test</h3>")
        document.getElementById("test").innerHTML = "<h3>Test</h3>";
    else
        document.getElementById("test").innerHTML = "<h3>tseT</h3>";
    //document.Write("") from reading seems like it is bad to use
}

function Txt() {
    if (document.getElementById("txt").value != "")
        alert(document.getElementById("txt").value)
}

function ButtonCreations() {
    var operators = ["+", "-", "*", "/"];
    var placementStart = document.getElementById("pratice");
    //for (i = 0; i < operators.length; i++) {
    // // does not work, all buttons end up as the last index in operator, but with their correct symbol on the button.
    //    var button = document.createElement("button");
    //    button.value = operators[i];
    //    button.textContent = operators[i];
    //    button.onclick = function (){
    //        var result;
    //        var x = parseFloat(document.getElementById("number1Pratice").value);
    //        var y = parseFloat(document.getElementById("number2Pratice").value); 
    //        switch (button.textContent) {
    //            case '+':
    //                result = x + y;
    //                break;
    //            case '-':
    //                result = x - y;
    //                break;
    //            case '*':
    //                result = x * y;
    //                break;
    //            case '/':
    //                result = x / y;
    //                break;
    //        }
    //        document.getElementById("resultPratice").innerHTML = result;
    //    };
    var plus = document.createElement("button");
    var buttons = [];
    plus.value = '+';
    plus.textContent = plus.value;
    plus.onclick = function () { document.getElementById("resultPratice").innerHTML = parseFloat(document.getElementById("number1Pratice").value) + parseFloat(document.getElementById("number2Pratice").value); };
    buttons.push(plus);
    var minus = document.createElement("button");
    minus.value = '-';
    minus.textContent = minus.value;
    minus.onclick = function () { document.getElementById("resultPratice").innerHTML = parseFloat(document.getElementById("number1Pratice").value) - parseFloat(document.getElementById("number2Pratice").value); };
    buttons.push(minus);
    var multiply = document.createElement("button");
    multiply.value = '*';
    multiply.textContent = multiply.value;
    multiply.onclick = function () { document.getElementById("resultPratice").innerHTML = parseFloat(document.getElementById("number1Pratice").value) * parseFloat(document.getElementById("number2Pratice").value); };
    buttons.push(multiply);
    var divide = document.createElement("button");
    divide.value = '/';
    divide.textContent = divide.value;
    divide.onclick = function () { document.getElementById("resultPratice").innerHTML = parseFloat(document.getElementById("number1Pratice").value) / parseFloat(document.getElementById("number2Pratice").value); };
    buttons.push(divide);
    for (i = 0; i < buttons.length; i++)
        placementStart.appendChild(buttons[i])
    //}
}

function SimpleMath(sign) {
    //alert(sign);
    var z;
    var x = parseFloat(document.getElementById("number1").value);
    var y = parseFloat(document.getElementById("number2").value); 
    //could have used a switch case
    if (sign == "*")
        z = x * y;
    else if (sign == "+")
        z = x + y;
    else if (sign == "-")
        z = x - y;
    else if (sign == "/")
        z = x / y;
    else if (sign == "%")
        z = x % y;
    document.getElementById("result").innerHTML = z;
}

function ClearSimpel() {
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("result").innerHTML = "";
}

function Clear() {
    document.getElementById("complex").innerHTML = "";
}

function ComplexMath() {
    var fullString = document.getElementById("complex").value.toString();
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
        else if (chars[i] == "." || chars[i] == ","|| parseFloat(chars[i]) >= 0 && parseFloat(chars[i]) <= 9  ) {
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
        document.getElementById("resultComplex").innerHTML = "Incomplete Equation";
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

        document.getElementById("resultComplex").innerHTML = goneThrough1;

    }
    
}