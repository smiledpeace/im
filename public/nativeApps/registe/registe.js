import React from 'react';

import '../../style/regist/registe.less'
import { Button } from '../../components/button/index.js';

import { ajaxQuery } from '../../js/util.js';
class Registe extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			nickname: '',
			password: '',
			avatar: ''
		}

	}
	registe() {
		if (!this.state.nickname || !this.state.password ) {
			console.log('请输入账号或者密码');
			return false;
		} 
		if (!this.state.avatar) {
			console.log('请上传头像！');
			return;
		}
		const userObj = {
			nickname: this.state.nickname,
			password: this.state.password,
			time: Date.now(),
			user_id: Date.now() + 12312,
			avatar: this.state.avatar
		}
		$.ajax({
			url: '/users/registe',
			data: userObj,
			type: 'post',
			success: function(res) {
				console.log(res);
				location.href = '/'
			}
		})
		
	}
	changeName(e) {
		this.setState({
			nickname: e.target.value
		});
	}
	changePwd(e) {
		this.setState({
			password: e.target.value
		});
	}
	uploadFile(e) {
		let formData = new FormData();
		formData.append('files', e.target.files[0]);
		formData.append('fileName', e.target.files[0].name);
		ajaxQuery('/users/upload', formData, res => {
			res = res.data;
			if (res.result === 'TRUE') {
				this.setState({
					avatar: res.url
				});
			}
		})
	}
	render() {
		// <div className="img" style={{backgroundImage: `url(${this.state.avatar})`}}></div>
		return(
			<div className="registe">
				<label onChange={e => this.changeName(e)}>
					<input className="_input" type="text" value={this.state.nickname} placeholder="输入昵称"/>
				</label>
				<label onChange={e => this.changePwd(e)}>
					<input className="_input" type="password" value={this.state.password} placeholder="输入密码"/>
				</label>
				{
					this.state.avatar ? 

					<div className="imgBox">
						<img src={this.state.avatar} alt="" />
					</div> 

					: ''
				}
				<label>
					<div className="_input"></div>
					<input type="file" onChange={e => this.uploadFile(e)} className="files" accept="image/png, image/jpg, image/jpeg"/>
				</label>
				<Button onClick={e => this.registe()}>注册</Button>

			</div>
		)
	}
}

export { Registe };