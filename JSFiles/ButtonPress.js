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
    document.getElementById("number1").innerHTML = 0;
    document.getElementById("number2").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
}

function Clear() {
    document.getElementById("complex").innerHTML = "";
}

function ComplexMath() {
    var fullString = document.getElementById("complex").value.toString();
    var test = [];
    for (i = 0; i < fullString.length; i++) {
        test.push(fullString[i].toString());
    }
    var testing = test.toString();
    var math = [];
    var numberString = "";
    for (i = 0; i < test.length; i++) {
        if (test[i] == "+" || test[i] == "-" || test[i] == "*" || test[i] == "/" || test[i] == "%") {
            math.push(numberString);
            math.push(test[i]);
            numberString = "";
        }
        else if (parseFloat(test[i]) >= 0 && parseFloat(test[i]) <= 9) {
            numberString += test[i];
            if (test.length - 1 == i) {
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
        //2.1/5+5*2/3-1 gives 6.533333333333333 and not 2.753333, seems like it is the dot that is causing the problem
        //e.g. 2.1 is in the code 21.
        var results = [];
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