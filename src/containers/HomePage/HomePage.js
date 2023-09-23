import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <div style={{height: '80vh', width: '100%', background: 'transparent'}}></div>
                <Specialty />
                <div style={{height: '900px', width: '100%', background: 'red'}}></div>
            </div>
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

//redux
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
