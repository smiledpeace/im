import React from 'react';

class Basket extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    deleteProduct(_item, index) {
        this.props.onChange(_item);
        this.props.type.splice(index, 1)
    }
    render() {
        return (
           <ul className="basket">
               {
                   this.props.type.map((_item, index) =>
                       <li key={index} className="indexLi">
                           <p>{_item}</p>
                           <i className="indexBtn deleted" onClick={() => {this.deleteProduct(_item, index)}} >

                           </i>
                       </li>
                   )
               }
           </ul>
        )
    }
}

export { Basket };