var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.ValidateEquation = function (equation) {
        //check if the equation is valid
        var chars = equation.trim().split('');
        var lastCharWasOperator;
        var operators = ["+", "-", "*", "/", "%", "."];
        var lastThreeChars = Array();
        lastThreeChars.push("");
        lastThreeChars.push("");
        lastThreeChars.push("");
        var validChars = ["+", "-", "*", "/", "%", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        //so it should have a for-loop around the most of the old code so the chars are those in each string in the array
        //while the nested level and those variable declarations are outside the loop        
        //the loop should remember if the string before the current one that is checked is an operator string or not.
        return true;
    };
    Calculator.AddSpaceToOperators = function (equation) {
        var position = 0;
        var lastChar = "";
        var newStringList = Array();
        var operators = ["+", "-", "*", "/", "%", "(", ")", "^"];
        for (var i = 0; i < equation.length; i++) {
            var isOpeartor = false;
            for (var n = 0; operators.length; n++) {
                if (position != 0) {
                    if (lastChar != " ") {
                        newStringList.push(" ");
                    }
                }
                newStringList.push(equation[i]);
                if (position != equation.length - 1) {
                    newStringList.push(" ");
                }
                isOpeartor = true;
                lastChar = " ";
            }
            if (!isOpeartor) {
                if (equation[i] != lastChar) {
                    newStringList.push(equation[i]);
                    lastChar = "";
                    if (equation[i] == " ")
                        lastChar = " ";
                }
            }
        } //return instead of a string, the array.
        //return newStringList.toString().replace(",", "");
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
        var result = null; //LowerCalculations()
        var stringParts = null; //PrepareString()
        var restsParts = null; //HigherCalculations()
        var equationWithSpaces;
        var equationParts;
        equationParts = this.AddSpaceToOperators(equation.trim());
        equationParts = this.SomeChecks(equationParts);
        if (!this.ValidateEquation(equationWithSpaces))
            return equation;
        stringParts = this.PrepareString(equationWithSpaces);
        result = this.MathCalculations(stringParts);
        //restsParts = this.HigherCalculations(stringParts);
        //result = this.LowerCalculations(restsParts);
        this.AddToOldEquations(equation, result);
        return result;
    };
    Calculator.SomeChecks = function (equationParts) {
        //check if there are places with an operator and the next index is a "-".
        //If there is, the "-" should be added to the index coming after it to allow negative values.
        //If the equationParts starts with a "-", it should be added to the index after.
        var newArray = Array();
        var lastPart = "";
        for (var i = 0; i < equationParts.length; i++) {
            if (i == 0 && equationParts[i] == "-") {
                newArray.push(equationParts[i] + equationParts[i + 1]);
                i++;
            }
            else if (this.IsOperator(lastPart) && equationParts[i] == "-") {
                newArray.push(equationParts[i]);
                newArray.push(equationParts[i + 1] + equationParts[i + 2]);
                i += 2;
            }
            else {
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
        return null;
    };
    Calculator.HigherCalculations = function (equationParts) {
        return null;
    };
    Calculator.LowerCalculations = function (equationParts) {
        return null;
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
//# sourceMappingURL=TSMath.js.map