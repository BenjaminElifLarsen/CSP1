

class Calculator {
    private static _oldEquations: Array<OldEquation> = Array<OldEquation>();

    private static ValidateEquation(equation: string): boolean {
        //check if the equation is valid
        let chars = equation.split('');
        let lastCharWasOperator: boolean;
        let operators = ["+", "-", "*", "/", "%", "."];
        let lastThreeChars: Array<string> = Array<string>();
        lastThreeChars.push("");
        lastThreeChars.push("");
        lastThreeChars.push("");
        let validChars = ["+", "-", "*", "/", "%", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        //- should be allowed to be after any operator and an equation should be allowed to start with it
        //- should not be appear three times or more in a row
        //any other sign should be a number
        for (let i = 0; i < chars.length; i++) {
            if (this.IsOperator(lastThreeChars[0], operators) && (//only true if lastThreeChar[0] is an opeator
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
    }

    private static IsOperator(value: string, operators: Array<string>) : boolean {
        return this.Contains(value,operators);
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
        //splits the equation into its chars and assemble them into their parts, each string being a number or a operator
        return null;
    }

    static Calculation(equation: string): string {
        //calculates the equation and returns the results
        let result : string = null; //LowerCalculations()
        let stringParts: Array<string> = null; //PrepareString()
        let restsParts: Array<string> = null; //HigherCalculations()
        if (!this.ValidateEquation(equation))
            return equation;
        stringParts = this.PrepareString(equation);
        restsParts = this.HigherCalculations(stringParts);
        result = this.LowerCalculations(restsParts);

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