import React from  'react';

class BoilingVerdict extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let p = null;
        if (this.props.celsius >= 100) {
            p = 'The water would boil.'
        }else {
            p = 'The water would not boil.'
        }
        return (
            <p style={{background: '#f8f8f9'}}>{p}</p>
        )
    }
}

export { BoilingVerdict }