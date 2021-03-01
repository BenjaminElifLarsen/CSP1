var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.ValidateEquation = function (equation) {
        //check if the equation is valid
        var lastEntityWasOperator = false;
        var parenthesesFound = Array();
        var nestedLevel = 0;
        for (var i = 0; i < equation.length; i++) {
            if (lastEntityWasOperator && this.IsOperator(equation[i])) {
                if (equation[i] == ")" && nestedLevel == 0)
                    return false;
                else if (equation[i] == "-" && lastEntityWasOperator[i] == "-" || lastEntityWasOperator[i] || "(" && lastEntityWasOperator[i] == ")")
                    return false;
                else if (i > 0 && equation[i] != "(" && equation[i - 1] != ")")
                    return false;
                if (equation[i] == "(") {
                    parenthesesFound.push(nestedLevel);
                    nestedLevel++;
                    if (!lastEntityWasOperator) {
                        return false;
                    }
                }
                else if (equation[i] == ")") {
                    parenthesesFound.pop();
                    nestedLevel--;
                    if (lastEntityWasOperator && i > 0 && equation[i - 1] != ")")
                        return false;
                    else if (lastEntityWasOperator && (i > 0 && equation[i - 1] == "("))
                        return false;
                    else if (i < equation.length - 1 && !isNaN(+equation[i + 1]))
                        return false;
                }
                lastEntityWasOperator == true;
            }
            else {
                if (this.IsOperator(equation[i])) {
                    lastEntityWasOperator = true;
                    if (i > 0 && equation[i] == "(")
                        if (!isNaN(+equation[i - 1]))
                            return false;
                }
                else {
                    lastEntityWasOperator = false;
                    if (isNaN(+equation[i]))
                        return false;
                }
            }
        }
        return true;
    };
    Calculator.Splitter = function (equation) {
        var newStringList = Array();
        for (var i = 0; i < equation.length; i++)
            newStringList.push(equation[i]);
        return newStringList;
    };
    Calculator.IsOperator = function (value) {
        var operators = ["+", "-", "*", "/", "%", "(", ")", "^"];
        return this.Contains(value, operators);
    };
    Calculator.Contains = function (valueToCheck, checkAgainst) {
        for (var i = 0; i < checkAgainst.length; i++) {
            if (checkAgainst[i] == valueToCheck)
                return true;
        }
        return false;
    };
    Calculator.MoveValuesInArrayAndAddNewValue = function (workArray, newestValue) {
        workArray[2] = workArray[1];
        workArray[1] = workArray[0];
        workArray[0] = newestValue;
        return workArray;
    };
    Calculator.PrepareString = function (equation) {
        return equation.trim().split(" ");
    };
    Calculator.Calculation = function (equation) {
        //calculates the equation and returns the results
        if (equation == null || equation.trim() == "")
            return equation;
        var result = null;
        var equationParts;
        equationParts = this.Splitter(equation.trim());
        equationParts = this.Assembly(equationParts);
        equationParts = this.SomeChecks(equationParts);
        if (!this.ValidateEquation(equationParts))
            return equation;
        result = this.MathCalculations(equationParts);
        this.AddToOldEquations(equation, result);
        return result;
    };
    Calculator.Assembly = function (equationParts) {
        var newArray = new Array();
        var str = "";
        for (var i = 0; i < equationParts.length; i++) {
            if (this.IsOperator(equationParts[i])) {
                if (str != "")
                    newArray.push(str);
                newArray.push(equationParts[i]);
                str = "";
            }
            else if (i == equationParts.length - 1) {
                str += equationParts[i];
                newArray.push(str);
            }
            else {
                str += equationParts[i];
            }
        }
        return newArray;
    };
    Calculator.SomeChecks = function (equationParts) {
        //check if there are places with an operator and the next index is a "-".
        //If there is, the "-" should be added to the index coming after it to allow negative values.
        //If the equationParts starts with a "-", it should be added to the index after.
        var newArray = Array();
        var lastPart = "";
        for (var i = 0; i < equationParts.length; i++) {
            if (this.IsOperator(lastPart) && equationParts[i - 1] != ")" && equationParts[i] == "-") {
                newArray.push(equationParts[i] + equationParts[i + 1]);
                i += 1;
            }
            else {
                if (equationParts[i] != "")
                    newArray.push(equationParts[i]);
            }
            lastPart = equationParts[i];
        }
        return newArray;
    };
    Calculator.MathCalculations = function (equation) {
        var result;
        var toDoMathOn;
        var paranthesesStringsList = Array();
        paranthesesStringsList.push(Array());
        var currentString = 0;
        for (var n = 0; n < equation.length; n++) {
            if (equation[n] == "(") {
                paranthesesStringsList.push(Array());
                currentString++;
            }
            else if (equation[n] == ")") {
                toDoMathOn = paranthesesStringsList[currentString];
                currentString--;
                if (toDoMathOn.length != 0) {
                    result = this.Math(toDoMathOn);
                    paranthesesStringsList.pop();
                    paranthesesStringsList[currentString].push(result);
                }
            }
            else {
                if (equation[n] != " ") {
                    paranthesesStringsList[currentString].push(equation[n]);
                }
            }
        }
        toDoMathOn = paranthesesStringsList[0];
        result = this.Math(toDoMathOn);
        return result;
    };
    Calculator.Math = function (parts) {
        var result = 0;
        var mostImportant = ["*", "/", "%", "^"];
        var leastImportant = ["-", "+"];
        //*, /, and %
        var goneThrough0 = [];
        for (var m = 0; m < parts.length; m++) {
            var str = parts[m];
            if (str == mostImportant[0]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = leftValue * rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            }
            else if (str == mostImportant[1]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = leftValue / rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            }
            else if (str == mostImportant[2]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = leftValue % rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            }
            else if (str == mostImportant[3]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = Math.pow(leftValue, rightValue);
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            }
            else {
                goneThrough0.push(str);
            }
        }
        //+ and -
        var goneThrough1 = [];
        for (var m = 0; m < goneThrough0.length; m++) {
            var str = goneThrough0[m];
            if (str == leastImportant[0]) {
                var leftValue = parseFloat(goneThrough1[goneThrough1.length - 1]);
                var rightValue = parseFloat(goneThrough0[m + 1]);
                result = leftValue - rightValue;
                goneThrough1.length = goneThrough1.length - 1;
                goneThrough1.push(result.toString());
                m++;
            }
            else if (str == leastImportant[1]) {
                var leftValue = parseFloat(goneThrough1[goneThrough1.length - 1]);
                var rightValue = parseFloat(goneThrough0[m + 1]);
                result = leftValue + rightValue;
                goneThrough1.length = goneThrough1.length - 1;
                goneThrough1.push(result.toString());
                m++;
            }
            else {
                goneThrough1.push(str);
            }
        }
        return goneThrough1[0];
    };
    Calculator.AddToOldEquations = function (equation, result) {
        this._oldEquations.push(new OldEquation(result, equation));
    };
    Object.defineProperty(Calculator, "OldEquations", {
        get: function () {
            return this._oldEquations;
        },
        enumerable: false,
        configurable: true
    });
    Calculator._oldEquations = Array();
    return Calculator;
}());
var OldEquation = /** @class */ (function () {
    function OldEquation(result, equation) {
        this._result = result, this._equation = equation;
    }
    Object.defineProperty(OldEquation.prototype, "Result", {
        get: function () {
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OldEquation.prototype, "Equation", {
        get: function () {
            return this._equation;
        },
        enumerable: false,
        configurable: true
    });
    OldEquation.prototype.toString = function () {
        return (this._equation + "=" + this._result).toString();
    };
    return OldEquation;
}());
function Calculate(equation) {
    return Calculator.Calculation(equation);
}
function GetOldEquations() {
    return Calculator.OldEquations;
}
function GetLastOldEquation() {
    return Calculator.OldEquations[Calculator.OldEquations.length - 1];
}
//# sourceMappingURL=TSMath.js.map