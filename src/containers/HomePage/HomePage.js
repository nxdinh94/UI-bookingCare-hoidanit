import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility.js';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './HomePage.scss';

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

};
class HomePage extends Component {
        
    render() {
        return (
            <div>
                <HomeHeader />
                <div style={{height: '80vh', width: '100%', background: 'transparent'}}></div>
                <Specialty settings = {settings} />
                <MedicalFacility settings = {settings}/>
                <OutstandingDoctor settings = {settings}/>
                <Handbook settings = {settings}/>
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
