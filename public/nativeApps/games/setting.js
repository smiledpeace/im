import React from 'react';

import { Button } from '../../components/button/index.js';
class Setting extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            xNum: 5,
            yNum: 5
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleX(e) {
    	this.setState({
    		xNum:  +e.target.value || ''
    	});
    }
    handleY(e) {
    	this.setState({
    		yNum:  +e.target.value || ''
    	});
    }
    handleClick() {
    	this.props.onSetting(this.state.xNum, this.state.yNum);
    }
	render() {
		return (
			<div className="game-setting-box">
				<label htmlFor="xNum" className="game-setting-label">
					<input className="game-setting-input" type="number" onChange={(e) => {this.handleX(e)}} value={this.state.xNum}/>
				</label>
				<label htmlFor="yNum" className="game-setting-label">
					<input className="game-setting-input" type="number" onKeyDown={(e) => { e.keyCode === 13 && this.handleClick()}} onChange={(e) => {this.handleY(e)}} value={this.state.yNum}/>
				</label>
				<Button onClick={this.handleClick}>设置</Button>
			</div>
		)
	}
}

export { Setting }