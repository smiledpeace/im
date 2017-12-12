import React from 'react';

class Reservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleClick(event) {
        event.preventDefault();
        alert(JSON.stringify(this.state))
    }
    render() {
        return (
            <form>
                <label>
                    Is Going:
                    <input name="isGoing" type="checkbox" onChange={this.handleInputChange} checked={this.state.isGoing}/>
                </label>
                <label>
                    Number Of guests:
                    <input name="numberOfGuests" type="number" onChange={this.handleInputChange} value={this.state.numberOfGuests}/>
                </label>

                <button type="submit" onClick={this.handleClick}>submit</button>
            </form>
        )
    }
}

export { Reservation }