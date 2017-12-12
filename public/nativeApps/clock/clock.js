import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.timeId = null;
    }

    componentDidMount() {
        this.timeId = setInterval(() => {
            this.tick();
        })
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <p>{this.state.date.toLocaleTimeString()}</p>
        )
    }
}

export { Clock };