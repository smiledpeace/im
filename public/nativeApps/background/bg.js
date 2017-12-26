import React from 'react';
import background from '../../style/background/background.less';
class BackGround extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: ''
        };
        this.date = new Date('2017-12-12').getTime() + 24 * 60 * 60 * 1000;
    }
    componentWillMount() {
        this.setState({
            imgUrl: `url('/images/img_${parseInt(Math.random() * 13) + 1}.jpg')`
        });
    }

    render() {
        return (
            <ul className="background">
                <li style={{backgroundImage: this.state.imgUrl}}>

                </li>
            </ul>
        )
    }
}

export { BackGround }