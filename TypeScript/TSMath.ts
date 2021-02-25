

class Calculator {
    private static _oldEquations: Array<OldEquation> = Array<OldEquation>();

    private static ValidateEquation(equation: string): boolean {//should operate on an array instead of a string
        //check if the equation is valid
        let chars = equation.trim().split('');
        let lastCharWasOperator: boolean;
        let operators = ["+", "-", "*", "/", "%", "."];
        let lastThreeChars: Array<string> = Array<string>();
        lastThreeChars.push("");
        lastThreeChars.push("");
        lastThreeChars.push("");
        let validChars = ["+", "-", "*", "/", "%", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        //so it should have a for-loop around the most of the old code so the chars are those in each string in the array
        //while the nested level and those variable declarations are outside the loop        
        //the loop should remember if the string before the current one that is checked is an operator string or not.
        return true;
    }

    private static AddSpaceToOperators(equation: string) : Array<string> { 
        let position = 0;
        let lastChar: string = "";
        let newStringList: Array<string> = Array<string>();
        let operators = ["+", "-", "*", "/", "%", "(", ")", "^"];

        for (let i = 0; i < equation.length; i++) {
            let isOpeartor: boolean = false;
            for (let n = 0; operators.length; n++) {
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
                    newStringList.push(equation[i])
                    lastChar = ""
                    if (equation[i] == " ")
                        lastChar = " ";
                }
            }

        } //return instead of a string, the array.
        //return newStringList.toString().replace(",", "");
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

    static Calculation(equation: string): string {
        //calculates the equation and returns the results
        let result : string = null; //LowerCalculations()
        let stringParts: Array<string> = null; //PrepareString()
        let restsParts: Array<string> = null; //HigherCalculations()
        let equationWithSpaces: string;
        let equationParts: Array<string>;
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

    private static Math(parts : Array<string>) : string {
        return null;
    }

    private static HigherCalculations(equationParts: Array<string>) {
        return null;
    }

    private static LowerCalculations(equationParts: Array<string>) {
        return null;
    }

    private static AddToOldEquations(equation: string, result: string) {
        this._oldEquations.push(new OldEquation(result,equation));
    }
    private static get OldEquations(): Array<OldEquation> {
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