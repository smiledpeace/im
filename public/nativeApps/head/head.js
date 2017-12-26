import React from 'react';
import '../../style/head/head.less';
import { Clock } from '../clock/clock.js';
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.handleMenu = this.handleMenu.bind(this);
		this.handleMenuLi = this.handleMenuLi.bind(this);
		this.state = {
			rightBar: [
				{value: '————', type: 'line'}, 
				{value: 'game', type: 'other'},
				{value: 'action', type: 'other'},
				{value: 'reservation', type: 'other'},
				{value: 'calculator', type: 'other'},
				{value: 'chat', type: 'other'},
				{value: 'learn', type: 'other'},
				{value: 'editor', type: 'other'},

			]
		}
	}
	handleMenu() {
		const MenuOverlay = document.querySelector('.MenuOverlay');
		if ( this.nav.classList.contains('active') 
			|| this.menu.classList.contains('active')
			|| MenuOverlay.classList.contains('active')) {
			this.nav.classList.remove('active');
			this.menu.classList.remove('active');
			MenuOverlay.classList.remove('active');
		}else {
			this.nav.classList.add('active');
			this.menu.classList.add('active');
			MenuOverlay.classList.add('active');
		}
	}
	handleMenuLi(value) {
		this.handleMenu();
		this.props.onHandleMenuLi(value);
	}
	render() {
		return (
			<div className="header">
				<div className="logo"></div>
				<Clock />
				<div className="wrapper">
					<a href="javascript:void(0);" ref={(a) => {this.menu = a}} onClick={this.handleMenu} className="menu">
						<span>
							<s className="bar"></s>
							<s className="bar"></s>
							<s className="bar"></s>
						</span>
					</a>
					<nav ref={(nav) => {this.nav = nav}} className="menuList">
						<ul>
							{
								this.state.rightBar.map((item, index) => 
									<li key={index} className={`menu-li-${index + 1}`}>
										{item.type === 'line' ? <span>{item.value}</span> : <a href="javascript:void(0);" onClick={() => this.handleMenuLi(item.value)}>{item.value}</a>}
									</li>
								)	
							}
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}

export { Header }