import React from 'react';

class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showComfirm: false
		}
	}
	componentWillMount() {
		document.body.appendChild(this.div);
		this.setState({
			showComfirm:  !this.props.showComfirm
		});
	}
	render() {
		return (
			<div ref={div => {this.div = div}} className={ 'box ' + (this.state.showComfirm ? 'show' : '')}>
				1231
			</div>
		)
	}
}