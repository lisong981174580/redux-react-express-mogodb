import React from 'react';
import {connect} from 'react-redux'
import{addGUN,removeGUN,addGunAsync} from "./index.redux";

@connect(
    //你要state什么属性放到props里
    state=> ({num:state.counter}),
    //你要什么方法放到props里,自动dispatch
    {addGUN,removeGUN,addGunAsync}
)

    
class App extends React.Component {
    render() {
        console.log(this.props)

        return(
            <div>
                <div>
                    现在有机枪{this.props.num}把
                </div>
                <button onClick={this.props.addGUN}>
                    申请武器
                </button>
                <br/>
                <button onClick={this.props.removeGUN}>
                    退还武器
                </button>
                <br/>
                <button onClick={this.props.addGunAsync}>
                    拖两天上交
                </button>
                                         
            </div>
        )

        }
}



export default App;