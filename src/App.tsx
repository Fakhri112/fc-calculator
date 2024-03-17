import { useState, SyntheticEvent } from "react";

function App() {
	const [output, SetOutput] = useState<string>("0");
	const [formula, SetFormula] = useState<string>("");

	const isFloat = (str: string): boolean => /^-?\d*\.?\d+$/.test(str);
	const isArithmetic = (str: string): boolean => /^[+\-*/]+$/.test(str);
	const findDigit = (str: string): boolean => /[0-9]/.test(str);
	const findDecimal = (str: string): boolean => /\./.test(str);
	const findEqual = (str: string): boolean => /=/.test(str);
	const lastArithmeticZero = (str: string): boolean => /[+\-*/]0$/.test(str);

	const handlePressButton = (e: SyntheticEvent) => {
		let event = e.target as HTMLButtonElement;
		let buttonValue = event.name;
		if (buttonValue == "AC") {
			SetOutput("0");
			return SetFormula("");
		}

		if (
			(buttonValue == "0" && output == "0") ||
			(buttonValue == "." && findDecimal(output))
		)
			return;

		if (findDigit(buttonValue) || buttonValue == ".") {
			if (findEqual(formula) && buttonValue == "0") {
				SetOutput("0");
				return SetFormula("");
			} else if (findEqual(formula) && findDigit(buttonValue)) {
				SetOutput(buttonValue);
				return SetFormula(buttonValue);
			} else if (findEqual(formula) && buttonValue == ".") {
				SetOutput("0.");
				return SetFormula("0.");
			}

			if (
				buttonValue == "." &&
				!lastArithmeticZero(formula) &&
				(output == "0" || isArithmetic(output))
			) {
				buttonValue = "0.";
				SetOutput("0.");
			} else if (
				(output == "0" && !lastArithmeticZero(formula)) ||
				isArithmetic(output)
			)
				SetOutput(buttonValue);
			else SetOutput(output.concat(buttonValue));

			if (isArithmetic(output))
				SetFormula(formula.concat(output + buttonValue));
			else SetFormula(formula.concat(buttonValue));
		}

		if (isArithmetic(buttonValue)) {
			if (findEqual(formula)) {
				SetOutput(buttonValue);
				return SetFormula(output);
			}

			if (!isFloat(output) && !isArithmetic(output))
				SetFormula(formula.slice(0, -1));

			if (
				(output == "+" && buttonValue == "-" && findDigit(formula)) ||
				(output == "-" && buttonValue == "+" && findDigit(formula)) ||
				(output == "*" && buttonValue == "-" && findDigit(formula)) ||
				(output == "-" && buttonValue == "-" && findDigit(formula)) ||
				(output == "/" && buttonValue == "-" && findDigit(formula))
			)
				SetOutput(output.concat(buttonValue));
			else if (!findDigit(formula) && buttonValue != "-") return;
			else SetOutput(buttonValue);
		}

		if (findEqual(buttonValue)) {
			let result: string = eval?.(`"use strict";(${formula})`);
			SetFormula(formula + `=${result}`);
			SetOutput(result.toString());
		}
	};

	console.log(formula);

	return (
		<>
			<div className="h-screen bg-slate-800 grid place-items-center">
				<div className="relative p-3 flex flex-col items-center gap-2 md:w-[23em] w-[19em] rounded-lg h-[27em]  border-l-2 border-r-2 border-b-8 border-cyan-600 bg-cyan-800">
					<p className="text-center text-white font-bold mb-2 text-lg drop-shadow-md">
						calculator
					</p>
					<div
						className={`w-full h-24 text-elipsis overflow-hidden max-h-24 bg-cyan-950 rounded-md drop-shadow-lg flex ${
							formula ? "flex-col" : "flex-col-reverse"
						} items-end p-1`}>
						<p className="text-orange-400">
							{isArithmetic(output)
								? `${formula.replace(/\*/g, "⋅")} ${output.replace(/\*/g, "⋅")}`
								: formula.replace(/\*/g, "⋅")}
						</p>
						<p className="text-2xl text-white" id="display">
							{output.replace(/\*/g, "X")}
						</p>
					</div>
					<div className="rounded-md p-3 gap-2 w-full h-full bg-cyan-950 grid grid-rows-5 grid-cols-4">
						<button
							id="clear"
							onClick={handlePressButton}
							name="AC"
							className="btn-3d col-span-2 bg-slate-500 text-white">
							AC
						</button>
						<button
							id="divide"
							onClick={handlePressButton}
							name="/"
							className="btn-3d">
							/
						</button>
						<button
							id="multiply"
							onClick={handlePressButton}
							name="*"
							className="btn-3d">
							X
						</button>
						<button
							id="seven"
							onClick={handlePressButton}
							name="7"
							className="btn-3d">
							7
						</button>
						<button
							id="eight"
							onClick={handlePressButton}
							name="8"
							className="btn-3d">
							8
						</button>
						<button
							id="nine"
							onClick={handlePressButton}
							name="9"
							className="btn-3d">
							9
						</button>
						<button
							id="subtract"
							onClick={handlePressButton}
							name="-"
							className="btn-3d">
							-
						</button>
						<button
							id="four"
							onClick={handlePressButton}
							name="4"
							className="btn-3d">
							4
						</button>
						<button
							id="five"
							onClick={handlePressButton}
							name="5"
							className="btn-3d">
							5
						</button>
						<button
							id="six"
							onClick={handlePressButton}
							name="6"
							className="btn-3d">
							6
						</button>
						<button
							id="add"
							onClick={handlePressButton}
							name="+"
							className="btn-3d">
							+
						</button>
						<button
							id="one"
							onClick={handlePressButton}
							name="1"
							className="btn-3d">
							1
						</button>
						<button
							id="two"
							onClick={handlePressButton}
							name="2"
							className="btn-3d">
							2
						</button>
						<button
							id="three"
							onClick={handlePressButton}
							name="3"
							className="btn-3d">
							3
						</button>
						<button
							onClick={handlePressButton}
							name="="
							id="equals"
							className="btn-3d row-span-2 bg-orange-600 text-white border-orange-400">
							=
						</button>
						<button
							onClick={handlePressButton}
							name="0"
							id="zero"
							className="btn-3d col-span-2">
							0
						</button>
						<button
							id="decimal"
							onClick={handlePressButton}
							name="."
							className="btn-3d">
							.
						</button>
					</div>
					<p className="text-center font-semibold text-white absolute -bottom-10">
						Designed by Fakhrie
					</p>
				</div>
			</div>
		</>
	);
}

export default App;
