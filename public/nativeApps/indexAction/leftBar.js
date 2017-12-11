import React from 'react';
import { Button } from "../../components/button";

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick (item, index) {
        this.props.onChange(item);
        this.props.contents.splice(index, 1);
    }
    render() {
        return (
            <ul className="leftBar">
                {
                    this.props.contents.map((item, index) =>
                        <li key={index} className="indexLi">
                            <p>{item}</p>
                            <i className="indexBtn add" onClick={() => {this.handleClick(item, index)}} ></i>
                        </li>
                    )
                }
            </ul>
        )
    }
}

export { LeftBar };