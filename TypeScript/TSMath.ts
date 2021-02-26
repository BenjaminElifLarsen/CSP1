

class Calculator {
    private static _oldEquations: Array<OldEquation> = Array<OldEquation>();

    private static ValidateEquation(equation: Array<string>): boolean {//should operate on an array instead of a string
        //check if the equation is valid
        //let chars = equation.trim().split('');
        let lastCharWasOperator: boolean;
        let operators = ["+", "-", "*", "/", "%", "."];
        let lastThreeChars: Array<string> = Array<string>();
        lastThreeChars.push("");
        lastThreeChars.push("");
        lastThreeChars.push("");
        let validChars = ["+", "-", "*", "/", "%", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let lastEntityWasOperator: boolean = false;
        //so it should have a for-loop around the most of the old code so the chars are those in each string in the array
        //while the nested level and those variable declarations are outside the loop        
        //the loop should remember if the string before the current one that is checked is an operator string or not.
        let parenthesesFound: Array<number> = Array<number>();
        let nestedLevel: number = 0;
        for (let i = 0; i < equation.length; i++) {
            if (lastEntityWasOperator && this.IsOperator(equation[i])) {
                if (equation[i] == ")" && nestedLevel == 0)
                    return false
                else if (equation[i] == "-" && lastEntityWasOperator[i] == "-" || lastEntityWasOperator[i] || "(" && lastEntityWasOperator[i] == ")")
                    return false;
                else if (equation[i] != "-" && equation[i] != "(" && equation[i] != ")")
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
                    if (!lastEntityWasOperator)
                        return false;
                    else if (lastEntityWasOperator && (i > 0 && equation[i - 1] == "("))
                        return false;
                    else if (i < equation.length - 1 && !isNaN(+equation[i + 1])) 
                        return false;
                }


                lastEntityWasOperator == true;
            }
            else {
                if (this.IsOperator(equation[i]))
                    lastEntityWasOperator = true;
                else {
                    lastEntityWasOperator = false;
                    if (isNaN(+equation[i]))
                        return false;
                }
            }

        }


        return true;
    }

    private static Splitter(equation: string) : Array<string> { 
        let position = 0;
        let lastChar: string = "";
        let newStringList: Array<string> = Array<string>();
        for (let i = 0; i < equation.length; i++)
            newStringList.push(equation[i]);
        //let operators = ["+", "-", "*", "/", "%", "(", ")", "^"];

        //for (let i = 0; i < equation.length; i++) {
        //    let isOpeartor: boolean = false;
        //    for (let n = 0; n < operators.length; n++) { //missing the "n <" is allowed, allowing for out of memory 
        //        if (equation[i] == operators[n]) {
        //            if (position != 0)
        //                if (lastChar != " ")
        //                    newStringList.push(" ");
        //            newStringList.push(equation[i]);
        //            if (position != equation.length - 1)
        //                newStringList.push(" ");
        //            isOpeartor = true;
        //            lastChar = " ";
        //            break;
        //        }
        //    }
        //    if (!isOpeartor) {
        //        if (equation[i] != lastChar) {
        //            newStringList.push(equation[i])
        //            lastChar = "";
        //            if (equation[i] == " ")
        //                lastChar = " ";
        //        }
        //    }

        //} 
        return newStringList;
    }

    private static IsOperator(value: string): boolean {
        let operators = ["+", "-", "*", "/", "%", "(", ")", "^"];
        return this.Contains(value, operators);
    }

    private static Contains(valueToCheck : string, checkAgainst: Array<string>) {
        for (let i = 0; i < checkAgainst.length; i++) {
            if (checkAgainst[i] == valueToCheck)
                return true;
        }
        return false;
    }

    private static MoveValuesInArrayAndAddNewValue(workArray: Array<string>, newestValue : string): Array<string> {
        workArray[2] = workArray[1];
        workArray[1] = workArray[0];
        workArray[0] = newestValue;

        return workArray;
    } 

    private static PrepareString(equation: string): Array<string> {
        return equation.trim().split(" ");
    }

    static Calculation(equation: string) {
        //calculates the equation and returns the results
        if (equation == null || equation.trim() == "")
            return equation;
        let result : string = null;
        let stringParts: Array<string> = null; 
        let equationWithSpaces: string;
        let equationParts: Array<string>;
        equationParts = this.Splitter(equation.trim());
        equationParts = this.Assembly(equationParts);
        equationParts = this.SomeChecks(equationParts);
        if (!this.ValidateEquation(equationParts))
            return equation;
        //stringParts = this.PrepareString(equationWithSpaces);
        result = this.MathCalculations(equationParts);
        this.AddToOldEquations(equation, result);
        return result;
    }

    private static Assembly(equationParts: Array<string>): Array<string> {
        let newArray: Array<string> = new Array<string>();
        let str: string = "";
        for (let i = 0; i < equationParts.length; i++) {
            if (this.IsOperator(equationParts[i])) {
                if(str != "")
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
    }

    private static SomeChecks(equationParts: Array<string>): Array<string> {
        //check if there are places with an operator and the next index is a "-".
        //If there is, the "-" should be added to the index coming after it to allow negative values.
        //If the equationParts starts with a "-", it should be added to the index after.
        let newArray: Array<string> = Array<string>();
        let lastPart: string = "";
        for (let i = 0; i < equationParts.length; i++) {
            if (i == 0 && equationParts[i] == "-") {
                newArray.push(equationParts[i] + equationParts[i + 1]);
                i++;
            }
            else if (this.IsOperator(lastPart) && equationParts[i] == "-") {
                //newArray.push(equationParts[i]);
                newArray.push(equationParts[i] + equationParts[i + 1]);
                i += 2;
            }
            else {
                if(equationParts[i] != "")
                    newArray.push(equationParts[i]);
            }
            lastPart = equationParts[i];
        }
        return newArray;
    }

    private static MathCalculations(equation: Array<string>): string {
        let result: string;
        let toDoMathOn: Array<string>;
        let paranthesesStringsList: Array<Array<string>> = Array<Array<string>>();
        paranthesesStringsList.push(Array<string>());
        let currentString: number = 0;
        for (let n = 0; n < equation.length; n++) {
            if (equation[n] == "(") {
                paranthesesStringsList.push(Array<string>());
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
    }

    private static Math(parts: Array<string>): string {
        let  result: Number = 0;
        let  mostImportant: Array<string> = ["*", "/", "%"];
        let leastImportant: Array<string> = ["-", "+"];
        //*, /, and %
        var goneThrough0 = [];
        for (let m = 0; m < parts.length; m++) {
            let str = parts[m];
            if (str == mostImportant[0]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = leftValue * rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            } else if (str == mostImportant[1]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
                result = leftValue / rightValue;
                goneThrough0.length = goneThrough0.length - 1;
                goneThrough0.push(result.toString());
                m++;
            } else if (str == mostImportant[2]) {
                var leftValue = parseFloat(goneThrough0[goneThrough0.length - 1]);
                var rightValue = parseFloat(parts[m + 1]);
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
        for (let  m = 0; m < goneThrough0.length; m++) {
            let str = goneThrough0[m];
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

        return goneThrough1[0];
    }

    private static AddToOldEquations(equation: string, result: string) {
        this._oldEquations.push(new OldEquation(result,equation));
    }
    public static get OldEquations(): Array<OldEquation> {
        return this._oldEquations;
    }

}

class OldEquation {
    private _result;
    private _equation;

    constructor(result: string, equation: string) { this._result = result, this._equation = equation }

    get Result(): string {
        return this._result;
    } 

    get Equation(): string {
        return this._equation;
    }

    public toString() {
        return (this._equation + "=" + this._result).toString();
    }

}

function Calculate(equation: string): string {
    return Calculator.Calculation(equation);
}

function GetOldEquations(): Array<OldEquation> {
    return Calculator.OldEquations;
}

function GetLastOldEquation(): OldEquation {
    return Calculator.OldEquations[Calculator.OldEquations.length - 1];
}

