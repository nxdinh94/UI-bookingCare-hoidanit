import React, { Component } from 'react';
import { connect } from 'react-redux';
import  './Specialty.scss';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
 
};

class Specialty extends Component {

    render() {
        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                        <div className='specialty-customize'>
                           <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Cơ sương khớp 1</div>
                        </div>
                
                    </Slider>
                    </div>
                    
                </div>
            </div>
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

//redux
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);