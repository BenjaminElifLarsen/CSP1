var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.ValidateEquation = function (equation) {
        //check if the equation is valid
        var chars = equation.split('');
        var lastCharWasOperator;
        var operators = ["+", "-", "*", "/", "%", "."];
        var lastThreeChars = Array();
        lastThreeChars.push("");
        lastThreeChars.push("");
        lastThreeChars.push("");
        var validChars = ["+", "-", "*", "/", "%", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        //- should be allowed to be after any operator and an equation should be allowed to start with it
        //- should not be appear three times or more in a row
        //any other sign should be a number
        for (var i = 0; i < chars.length; i++) {
            if (this.IsOperator(lastThreeChars[0], operators) && ( //only true if lastThreeChar[0] is an opeator
            ((lastThreeChars[0] != "-") && (lastThreeChars[0] && lastThreeChars[1]) //not minus operator, but any operator
                || (lastThreeChars[0] == "-" && (lastThreeChars[0] == lastThreeChars[1] && lastThreeChars[0] == lastThreeChars[2]))) //minus operator
            )) {
                return false;
            }
            if (!this.Contains(chars[i], validChars)) {
                return false;
            }
            lastThreeChars = this.MoveValuesInArrayAndAddNewValue(lastThreeChars, chars[i]);
        }
        return true;
    };
    Calculator.IsOperator = function (value, operators) {
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
        //splits the equation into its chars and assemble them into their parts, each string being a number or a operator
        return null;
    };
    Calculator.Calculation = function (equation) {
        //calculates the equation and returns the results
        var result = null; //LowerCalculations()
        var stringParts = null; //PrepareString()
        var restsParts = null; //HigherCalculations()
        if (!this.ValidateEquation(equation))
            return equation;
        stringParts = this.PrepareString(equation);
        restsParts = this.HigherCalculations(stringParts);
        result = this.LowerCalculations(restsParts);
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