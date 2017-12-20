import React from 'react';
import '../../style/chat/chat.less';


function Repeatul(props) {
	console.log(props);
	var items = [];
	for (var i = 0 , len = props.users.length; i < len; i++) {
		const item = props.users[i];
		items.push(props.children(i, item));
	}
	console.log(items);
	return <ul>items</ul>;
}
function test() {
	return <div></div>
}
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.handleEnter = this.handleEnter.bind(this);
		this.checkTitle = this.checkTitle.bind(this);
		this.state = {
			users: [],
			contents: [],
		};
	}
	componentWillMount() {
		this.init();
	}
	init() {
		const _this = this;
		this.props.socket.on('msg', function(data) {
			_this.setState({
				contents: _this.state.contents.concat(data)
			});
			console.log(_this.li);
			_this.li && _this.li.scrollIntoView(false);
	        console.log(data); // data will be 'woot'
	    });

	    this.props.socket.on('system', (user, roomInfo) => {
			console.log(user.nickname + '加入房间');
			console.log(roomInfo);
			this.setState({
				users: [].concat(roomInfo)
			});
		});
		
	}
	addMessage() {
		
	}
	handleEnter(e) {
		if (e.keyCode == 13 && (e.ctrlKey || e.shiftKey || e.altKey)) {
            return true;
        }
		var content = e.target.innerHTML;
		content = content.replace(/<br\/>/ig, "<br>").replace(/\n/ig, '').replace(/\r/ig, '');
	    content = content.replace(/<div><br><\/div>/ig, "\n");
	    content = content.replace(/<br>/ig, "\n").replace(/<div>/ig, "\n").replace(/<p>/ig, "\n").replace(/<\/div>/ig, '').replace(/<\/p>/ig, '');
	    content = invertStaticHTML(content);
	    content = content.replace(/<[^>]*>/ig, '').replace(/&nbsp;/g, " ");
	    content = content.trim();
	    if (e.keyCode === 13) {
	    	if (!content) {
	    		return;
	    	}
			this.props.socket.send({content, from: this.props.g35user.user_id, target: 'all' ,avatar: this.props.g35user.avatar});
			e.persist(
				setTimeout(function() {
					e.target.innerHTML= " ";
					e.target.focus();
				})
			)
	    }
		

		function invertStaticHTML(html) {
	        html = html.toString();
	        return html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x60;/g, "`");
	    }

	    function replaceChatFaceToText (html) {
	        var tempNode = $('<div></div>');
	        tempNode.html(html);
	        tempNode.find('.tsbmoji').each(function () {
	            var text = $(this).attr('text');
	            $(this).before(text);
	            $(this).remove();
	        });
	        return tempNode.html();
	    }
	}
	editChange() {
		console.log(e);
	}
	checkTitle() {
		if (this.state.users.length) {
			return this.state.users[0].excited_room ? 'excited_room' : this.state.users[0].nickname
		}else {
			return false;
		}
		
	}
	render() {
		return (
			<div className={`message-box ${this.props.animation}`}>
				<div className="message-users">
					<ul>
						{
							this.state.users.map((_item, index) => 
								_item.excited_room ? 
								<li key={index}>
									<img src="" alt=""/>
									<p>excited_room</p>
								</li>
								: 
								<li key={index}>
									<img src={_item.avatar} className='avatar'/>
									<p>{_item.nickname}</p>
								</li>
							)
						}
					</ul>
				</div>
				<div className="message-contents">
					{	
						!!this.checkTitle() ? 
						<div className='message-title'><span>{this.checkTitle()}</span><span className="check-member">查看成员</span></div>
						: ''
					}
					<div className="message-over">
						<ul ref={(ul) => {this.ul = ul}}>
						{
							this.state.contents.map((_item, index) => 
								<li key={index} ref={(li) => {this.li = li}}>
									<img src={_item.avatar} className={ 'avatar ' + (_item.from === this.props.g35user.user_id ? 'self' : '')}/>
									<p className={'content ' + (_item.from === this.props.g35user.user_id ? 'self' : '')}>{ _item.content }</p>
								</li>
							)	
						}
					</ul>
					</div>
				</div>
				<div className="message-input" onChange={e => this.editChange(e)} contentEditable="true" onKeyDown={(e) => {this.handleEnter(e)}}>
					
				</div>
			</div>
		)
	}
}

export { Chat }