import React from 'react';
import {connect}  from  'react-redux';
import {login} from "./Auth.redux";
import {Redirect} from 'react-router-dom';

//处理两个reducer,每个reducer都有一个state
//合并reducer
@connect(
    state=>state.auth,
    {login}
)

class Auth extends  React.Component{
    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
                <div>您暂时没有权限，需要登录才能看到</div>
                <form   action=""  method="post"  target="nm_iframe"  onSubmit={this.onSubmit.bind(this)}>
                    <div className='input_box'>
                         <label htmlFor='name' >用户名：</label>
                        <input type="text"  id='name'    required/>
                    </div>

                    <div className='input_box'>
                        <label htmlFor='password'>密码：</label>
                        <input type="password"    id='password' pattern="[A-z]{3}" required/>
                    </div>

                    <div className='input_box'>
                        <input type="submit"  />
                    </div>
                </form>
                <iframe  name="nm_iframe"  title='iframe' style={{display:'none'}}></iframe>
            </div>
        )
    }
    onSubmit(){
        this.props.login();
    }
}

export default Auth;