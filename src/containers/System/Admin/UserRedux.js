import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';

import * as actions from '../../../store/actions';
import './UserRedux.scss';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";





class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            isPreviewImage: false,
            previewImageURL:[],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
    }

    handleOnchangeImage = (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL:[
                    ...this.state.previewImageURL,
                    {
                    original:objectURL,
                    thumbnail:objectURL,
                    }
                ],
                isPreviewImage:true,
            });
            
        }

    }
    
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender
        console.log('check props redux', this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div >{isGetGenders===true?'Loading genders': ''}</div>
                <div className="text-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12 my-3'>{isGetGenders === true? 'Loading': ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className='form-control' type='email'/>
                            </div> 
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className='form-control' type='password'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control'> 
                                    {genders && genders.length>0 
                                        && genders.map((item, index) =>(
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                            </option>
                                            
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className='form-control'>
                                        {positions && positions.length> 0 &&  positions.map((item, index)=>(
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                                </option>

                                        ))}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleId"/></label>
                                <select className='form-control'>
                                    {roles && roles.length> 0 &&  roles.map((item, index)=>(
                                        <option key={index}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                            </option>

                                    ))}
                                </select>
                            </div>
                            <div className='col-3'>
                                
                                <label><FormattedMessage id="manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input 
                                        id='previewImg' 
                                        type='file' 
                                        onChange={(event) =>this.handleOnchangeImage(event)}
                                        hidden/>
                                    <label className='label-upload' htmlFor='previewImg'>
                                        Up image
                                        <i className='fas fa-upload'></i>
                                    </label>
                                    <div className='preview-image'                                    >
                                        {this.state.isPreviewImage && 
                                            <ImageGallery 
                                                        items={this.state.previewImageURL} 
                                                        useBrowserFullscreen 
                                                        showPlayButton={false}
                                                        showThumbnails={false}
                                            />}
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <div className='col-12 mt-2'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"/></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log('state',state);
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
