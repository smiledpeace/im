import React from 'react';
import { Button } from '../button/index.js'
class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirm: false
		}
	}
	componentDidMount() {
		document.body.appendChild(this.div);
		
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			showConfirm: this.props.showConfirm
		});
	}
	onCancel(e) {
		this.props.onCancel(e);
	}
	onOk(e) {
		this.props.onOk(e);
	}
	render() {
		return (
			<div ref={div => {this.div = div}} className={ 'box ' + (this.props.showConfirm ? 'show' : '')}>
				<section>
					<div className="content">
						{ this.props.children }
					</div>
					<div className="footer">
						<Button onClick={e => this.onCancel(e)}>取消</Button>	
						<Button onClick={e => this.onOk(e)} type='primary'>确认</Button>	
					</div>
				</section>
			</div>
		)
	}
}

export { Confirm }