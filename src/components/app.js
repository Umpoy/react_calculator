import React, { Component } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '0',
            operatorValue: null
        }
    }
    renderDisplay(input) {
        const { displayValue } = this.state
        this.setState({
            displayValue: displayValue === '0' ? String(input) : displayValue + input
        })
    }
    inputDecimal() {
        const { displayValue } = this.state
        if (displayValue.indexOf('.') === -1) {
            this.setState({
                displayValue: displayValue + '.'
            })
        }
    }
    clearDisplay() {
        const { displayValue } = this.state
        this.setState({ displayValue: "0" })
    }
    inputOperator(operator) {
        const { operatorValue } = this.state
        this.setState({
            operatorValue: operator
        })
    }
    render() {
        return (
            <div className="phone">
                <div className="text-center" id="calculator">
                    <div className="output">{this.state.displayValue}</div>
                    <div className="grey btn" id="clear" onClick={() => this.clearDisplay()}>AC</div>
                    <div className="grey btn" id="clearOne">+/-</div>
                    <div className="grey btn" id="b%">%</div>
                    <div className="operator orange btn" id="b/" onClick={() => this.inputOperator('/')}>÷</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(7)}>7</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(8)}>8</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(9)}>9</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('x')}>x</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(4)}>4</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(5)}>5</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(6)}>6</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('-')}>-</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(1)}>1</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(2)}>2</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(3)}>3</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('+')}>+</div>
                    <div className="number white btn" id="double" onClick={() => this.renderDisplay(0)}>0</div>
                    <div className="number white btn" onClick={() => this.inputDecimal()}>.</div>
                    <div className="orange btn equal">=</div>
                </div>
                <div className="circle text-center"></div>
            </div>
        );
    }
}
