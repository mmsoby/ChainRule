import EmbarkJS from "Embark/EmbarkJS";
import SimpleStorage from "../../embarkArtifacts/contracts/SimpleStorage";
import React from "react";
import {
	Form,
	FormGroup,
	Input,
	HelpBlock,
	Button,
	FormText,
} from "reactstrap";

class ChainRule extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			operandOne: 0,
			operandTwo: 0,
			operation: "add",
			valueGet: "",
			logs: [],
		};
	}

	handleChangeOne(e) {
		this.setState({ operandOne: e.target.value });
	}

	handleChangeTwo(e) {
		this.setState({ operandTwo: e.target.value });
	}

	handleChangeOperation(e) {
		this.setState({ operation: e.target.value });
	}

	checkEnter(e, func) {
		if (e.key !== "Enter") {
			return;
		}
		e.preventDefault();
		func.apply(this, [e]);
	}

	async setOperandOne(e) {
		e.preventDefault();
		var value = parseInt(this.state.operandOne);
		console.log(value);

		SimpleStorage.methods.setOperandOne(value).send();
		this._addToLog(`SimpleStorage.methods.setOperandOne(${value}).send()`);
	}

	async setOperandTwo(e) {
		e.preventDefault();
		var value = parseInt(this.state.operandTwo);
		console.log(value);

		SimpleStorage.methods.setOperandTwo(value).send();
		this._addToLog(`SimpleStorage.methods.setOperandTwo(${value}).send()`);
	}

	async setOperation(e) {
		e.preventDefault();
		var value = this.state.operation;

		SimpleStorage.methods.setOperation(value).send();
		this._addToLog(`SimpleStorage.methods.setOperation(${value}).send()`);
	}

	getValue(e) {
		e.preventDefault();

		SimpleStorage.methods
			.calculate()
			.call()
			.then((_value) => this.setState({ valueGet: _value }));
		this._addToLog("SimpleStorage.methods.get(console.log)");
	}

	_addToLog(txt) {
		this.state.logs.push(txt);
		this.setState({ logs: this.state.logs });
	}

	render() {
		return (
			<React.Fragment>
				<h3> 1. Set the first operand in the blockchain</h3>
				<Form onKeyDown={(e) => this.checkEnter(e, this.setOperandOne)}>
					<FormGroup className="inline-input-btn">
						<Input
							type="text"
							defaultValue={this.state.operandOne}
							onChange={(e) => this.handleChangeOne(e)}
						/>
						<Button color="primary" onClick={(e) => this.setOperandOne(e)}>
							Set Operand One
						</Button>
						<FormText color="muted">
							This represents the first operand in the blockchain.
						</FormText>

						<Input
							type="text"
							defaultValue={this.state.operandTwo}
							onChange={(e) => this.handleChangeTwo(e)}
						/>
						<Button color="primary" onClick={(e) => this.setOperandTwo(e)}>
							Set Operand Two
						</Button>
						<FormText color="muted">
							This represents the second operand in the blockchain.
						</FormText>

						<Input
							type="text"
							defaultValue={this.state.operation}
							onChange={(e) => this.handleChangeOperation(e)}
						/>
						<Button color="primary" onClick={(e) => this.setOperation(e)}>
							Set Operation
						</Button>
						<FormText color="muted">
							Once you set the values for each, the transaction will need to be
							mined and then the value will be updated on the blockchain.
						</FormText>
					</FormGroup>
				</Form>

				<h3> 2. Get the current value</h3>
				<Form>
					<FormGroup>
						<Button color="primary" onClick={(e) => this.getValue(e)}>
							Get Solution
						</Button>
						<FormText color="muted">
							Click the button to get the current value of the solution.
						</FormText>
						{this.state.valueGet && this.state.valueGet !== 0 && (
							<p>
								Current value is{" "}
								<span className="value font-weight-bold">
									{this.state.valueGet}
								</span>
							</p>
						)}
					</FormGroup>
				</Form>

				<h3> 3. Contract Calls </h3>
				<p>Javascript calls being made: </p>
				<div className="logs">
					{this.state.logs.map((item, i) => (
						<p key={i}>{item}</p>
					))}
				</div>
			</React.Fragment>
		);
	}
}

export default ChainRule;
