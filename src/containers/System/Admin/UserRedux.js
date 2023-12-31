import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTION } from '../../../utils';

import * as actions from '../../../store/actions';
import './UserRedux.scss';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import TableManageUser from './TableManageUser';



class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            isPreviewImage: false,
            previewImageURL:[],
            isOpen: false,

            email: '',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let newData = this.props.genderRedux
            this.setState({
                genderArr: newData,
                gender: newData.length > 0 ? newData[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let newData = this.props.roleRedux;
            this.setState({
                roleArr: newData,
                role: newData.length > 0 ? newData[0].key:'',
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let newData = this.props.positionRedux;
            this.setState({
                positionArr: newData,
                position: newData.length > 0 ? newData[0].key:'',
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                 
                email: '',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender:     arrGenders.length > 0 ? arrGenders[0].key:'',
                position:   arrRoles.length > 0 ? arrRoles[0].key:'',
                role:       arrPositions.length > 0 ? arrPositions[0].key:'',
                avatar:'', 
                action: CRUD_ACTION.CREATE,
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
                avatar: file,
            });
        }
    }
    handleSaveUser = () => {
        let isValid  = this.checkValidateInput();
        if(!isValid) {
            return;
        };

        let {action} = this.state;
        if(action === CRUD_ACTION.CREATE){
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address : this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender : this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            });
        }
        if(action === CRUD_ACTION.EDIT){
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address : this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender : this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                // avatar: this.state.avatar
            })
        }
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrCheck =   ['email', 'password', 'firstName', 'lastName', 
            'phoneNumber', 'address'];
            for(let i = 0 ; i<arrCheck.length; i++){
                if(!this.state[arrCheck[i]]){
                    isValid = false;
                    alert('this input is required '+ arrCheck[i]);
                    break;
                }
            }
            return {
                isValid
            }
    }

    
    onChangeInput =(event, id) =>{
        let copyState = {...this.state}

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) =>{
        this.setState({
            userEditId: user.id,
            email: user.email,
            password: 'HARD CODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            action: CRUD_ACTION.EDIT,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender
        
        let  {email, password, firstName, lastName, 
            phoneNumber, address, gender, position,
            role, avatar} = this.state;


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
                                <input 
                                    className='form-control' 
                                    type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled ={this.state.action === CRUD_ACTION.EDIT? true: false}
                                />
                            </div> 
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input 
                                    className='form-control' 
                                    type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled ={this.state.action === CRUD_ACTION.EDIT? true: false}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input 
                                    className='form-control' 
                                    type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select 
                                    value={gender}
                                    className='form-control' 
                                    onChange={(event)=>this.onChangeInput(event, 'gender')}> 
                                    {genders && genders.length>0 
                                        && genders.map((item, index) =>(
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                            </option>
                                            
                                        ))
                                    }
                                </select>
                            </div>
                            <div 
                                className='col-3'
                                
                            >
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select 
                                    value={position}
                                    className='form-control'
                                    onChange={(event)=>this.onChangeInput(event, 'position')}
                                >
                                    {positions && positions.length> 0 &&  positions.map((item, index)=>(
                                        <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                            </option>

                                    ))}
                                </select>
                            </div>
                            <div 
                                className='col-3'
                            > 
                                <label><FormattedMessage id="manage-user.roleId"/></label>
                                <select 
                                    value={role}
                                    className='form-control'
                                    onChange={(event)=>this.onChangeInput(event, 'role')}
                                >
                                    {roles && roles.length> 0 &&  roles.map((item, index)=>(
                                        <option 
                                            key={index} 
                                            value={item.key}>{language === LANGUAGES.VI ? item.valueVi: item.valueEn}
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
                                <button 
                                    className={
                                        this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' : 'btn btn-primary'
                                    }
                                    onClick={()=>this.handleSaveUser()}
                                >
                                    <FormattedMessage 
                                       id= {this.state.action === CRUD_ACTION.EDIT ?
                                        "manage-user.edit" : "manage-user.save"}/>
                                </button>
                            </div>
                            <div className='mb-5'>
                                <TableManageUser
                                    action = {this.state.action}
                                    handleEditUserFromParentKey={this.handleEditUserFromParent} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    // console.log('state',state);
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersRedux:()=>dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data)=>dispatch(actions.editUser(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
