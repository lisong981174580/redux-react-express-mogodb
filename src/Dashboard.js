import React from 'react';
import {Link,Route,Redirect} from  'react-router-dom'
import App from "./app";
import {connect} from 'react-redux'
import {logout} from "./Auth.redux";

function List() {
    return <div>list page</div>
}

function Show() {
    return <div>show page</div>
}

@connect(
  state=>state.auth,
  {logout}
)

class Dashboard extends  React.Component{
    render(){
        let match=this.props.match;
        const  app=(
            <div>
                <h1>独立团</h1>
                {this.props.isAuth? <button onClick={this.props.logout}>退出登录</button>:null}
                <ul>
                    <li><Link to={`${match.url}/`}>首页</Link></li>
                    <li><Link to={`${match.url}/list`}>列表</Link></li>
                    <li><Link to={`${match.url}/show`}>展示</Link></li>
                </ul>

                <Route path={`${match.url}/`} exact component={App}></Route>
                <Route path={`${match.url}/list`} component={List}></Route>
                <Route path={`${match.url}/show`} component={Show}></Route>
            </div>
        )

        const  redirectToLogin=<Redirect  to='/login'></Redirect>
        return  this.props.isAuth?app:redirectToLogin
    }
}

export default Dashboard;