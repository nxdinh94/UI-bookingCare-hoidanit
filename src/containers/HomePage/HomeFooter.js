import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 dinny.com</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
