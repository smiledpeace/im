import React from 'react';
import { BoilingVerdict } from "./BoilingVerdict";

import { TemperatureInput } from "./TemperatureInput";

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsius = this.handleCelsius.bind(this);
        this.handleFahrenheit = this.handleFahrenheit.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    handleCelsius (temperature) {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheit(temperature) {
        this.setState({scale: 'f', temperature});
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale={scale} temperature={celsius} onTemperatureChange={this.handleCelsius}/>
                <TemperatureInput scale={scale} temperature={fahrenheit} onTemperatureChange={this.handleFahrenheit}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    }
}

export { Calculator }
