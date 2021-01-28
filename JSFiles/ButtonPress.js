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
    var multiStrings = fullString.split("*");
    //document.getElementById("result").innerHTML = typeof(fullString[1]);
    var test = [];
    for (i = 0; i < fullString.length; i++) {
        test.push(fullString[i].toString());
    }
    var testing = test.toString();
    var testing2 = testing.replaceAll(",", "");
    var math = [];
    var pos = 0;
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
        //need more work as it currently will not give the correct results, e.g. 2+2*5/2-2*4 gives 20 rather than -1
        //the reason for this is that the code will always run the equations on the last part even if the last element in results is not the one it should use. E.g. 5*2+2+2*4 = 5*2 = 10*4 = 40 + 2 = 42 + 2 = 44 instead of 2
        //at some point take a look at the old c sharp calculator
        //will also need to check for multiple operators in a row. 
        var results = [];
        var goneThrough0 = [];
        for (m = 0; m < math.length; m++) { 
                switch (math[m]) {
                    case '*':
                        if (results.length == 0)
                            results.push(math[m - 1] * math[m + 1]);
                        else {
                            results.push(results[results.length-1] * math[m + 1]);
                        }
                        //result += math[m - 1] * math[m + 1];
                        break;
                    case '/':
                        //result += math[m - 1] / math[m + 1];
                        if (results.length == 0)
                            results.push(math[m - 1] / math[m + 1]);
                        else {
                            results.push(results[results.length - 1] / math[m + 1]);
                        }
                        break;
                    case '%':
                        if (results.length == 0)
                            results.push(math[m - 1] % math[m + 1]);
                        else {
                            results.push(results[results.length - 1] % math[m + 1]);
                        }
                        //result += math[m - 1] % math[m + 1];
                        break;
                    //default:
                    //    results.push(math[m]);
                    //    break;
                
            }
        }

        var goneThrough1 = [];
        for (m = 0; m < math.length; m++) {
            switch (math[m]) {
                case '+':
                    if (results.length == 0)
                        results.push(parseFloat(math[m - 1]) + parseFloat(math[m + 1]));
                    else {
                        results.push(parseFloat(results[results.length - 1]) + parseFloat(math[m + 1]));
                    }
                    //result += math[m - 1] * math[m + 1];
                    break;
                case '-':
                    //result += math[m - 1] / math[m + 1];
                    if (results.length == 0)
                        results.push(math[m - 1] - math[m + 1]);
                    else {
                        results.push(results[results.length - 1] - math[m + 1]);
                    }
                    break;

            }
        }

        document.getElementById("resultComplex").innerHTML = results;

    }
    
}