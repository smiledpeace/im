import React from 'react';
import button from '../../style/button/button.less';
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onClick();
    }
    render() {
        return (
            <button type="button" onClick={ this.handleClick } className={this.props.type ? this.props.type : 'default'}>
                { this.props.children }
            </button>
        )
    }

}

export { Button };