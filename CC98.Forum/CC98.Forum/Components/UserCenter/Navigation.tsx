﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    NavLink,
    Route
} from 'react-router-dom';
import * as $ from 'jquery';

/**
 * 用户中心侧边栏导航组件
 */
export default class extends React.Component<null, UserCenterNavigationState> {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false,
            buttonClassName: '',
            navigationClassName: 'user-center-navigation'
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        if (window.pageYOffset > 234 && !this.state.isScroll) {
            this.setState({
                isScroll: true,
                buttonClassName: 'btn-show',
                navigationClassName: 'user-center-navigation'
            });
        }

        if (window.pageYOffset < 234 && this.state.isScroll) {
            this.setState((prevState) => {
                if (prevState.buttonClassName === '') {
                    return {
                        isScroll: false
                    }
                } else {
                    return {
                        isScroll: false,
                        buttonClassName: 'btn-disappare',
                        navigationClassName: 'user-center-navigation'
                    }
                }
            });
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    }

    render() {
        return (<div className={this.state.navigationClassName} id="userCenterNavigation" >
            <ul>
                <li><NavLink to="/usercenter" exact activeClassName="user-center-navigation-active" className="fa-home"><p>主页</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/config" activeClassName="user-center-navigation-active" className="fa-cog"><p>修改个人资料</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myposts" activeClassName="user-center-navigation-active" className="fa-pencil-square-o"><p>我的主题</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfavorites" activeClassName="user-center-navigation-active" className="fa-star"><p>我的收藏</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/mycustomboards" activeClassName="user-center-navigation-active" className="fa-rss"><p>关注版面</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfollowings" activeClassName="user-center-navigation-active" className="fa-heart"><p>关注用户</p></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfans" activeClassName="user-center-navigation-active" className="fa-users"><p>我的粉丝</p></NavLink></li>
            </ul>
            <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
        </div>);
    }
}

interface UserCenterNavigationState {
    isScroll: boolean;
    buttonClassName: string;
    navigationClassName: string;
}