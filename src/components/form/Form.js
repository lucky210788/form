import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import FileInput from '../fileInput/FileInput';
import Select from "../select/Select";
import {ToastContainer, toast} from "react-toastify";

import {makeStyles} from '@material-ui/core/styles';
import "react-toastify/dist/ReactToastify.css";
import './Form.css';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}/>}
            icon={<span className={classes.icon}/>}
            {...props}
        />
    );
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmationPassword: '',
            gender: '',
            promotionalEmails: false,
            additionalInfo: '',
            files: [],
            region: '',
            formErrors: {
                lastName: '',
                firstName: '',
                userName: '',
                email: '',
                password: '',
                confirmationPassword: ''
            },
            firstNameValid: false,
            lastNameValid: false,
            userNameValid: false,
            emailValid: false,
            passwordValid: false,
            regionValid: false,
            confirmationPasswordValid: false,
            filesValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let userNameValid = this.state.userNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let regionValid = this.state.regionValid;
        let filesValid = this.state.filesValid;
        let confirmationPasswordValid = this.state.confirmationPasswordValid;
        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^([a-zа-яё]+|\d+)$/i);
                fieldValidationErrors.firstName = firstNameValid ? '' : 'Only numbers and alphabetical symbols';
                break;
            case 'lastName':
                lastNameValid = value.match(/^([a-zа-яё]+|\d+)$/i);
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Only numbers and alphabetical symbols';
                break;
            case 'userName':
                userNameValid = value.match(/^([a-zа-яё]+|\d+)$/i);
                fieldValidationErrors.userName = userNameValid ? '' : 'Only numbers and alphabetical symbols';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 10;
                fieldValidationErrors.password = passwordValid ? '' : 'Is too short';
                break;
            case 'confirmationPassword':
                confirmationPasswordValid = value === this.state.password;
                fieldValidationErrors.confirmationPassword = confirmationPasswordValid ? '' : 'Should be equal with password field';
                break;
            case 'region':
                regionValid = true;
                break;
            case 'files':
                filesValid = value.length > 0;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid,
            lastNameValid,
            userNameValid,
            emailValid,
            passwordValid,
            confirmationPasswordValid,
            regionValid,
            filesValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid &&
            this.state.passwordValid &&
            this.state.firstNameValid &&
            this.state.lastNameValid &&
            this.state.userNameValid &&
            this.state.confirmationPasswordValid &&
            this.state.regionValid &&
            this.state.filesValid
        });
    }

    handleChangeGender = (event) => {
        this.setState({gender: event.target.value});
    };

    handleCheckbox = () => {
        this.setState({promotionalEmails: !this.state.promotionalEmails});
    };

    handleAdditionalInfo = (event) => {
        this.setState({additionalInfo: event.target.value});
    };

    handleSetFile = (files) => {
        this.setState({
            files
        });
        this.validateField('files', files);
    };

    handleChangeRegion = (value) => {
        this.setState({region: value});
        this.validateField('region', value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.getData(this.state);
    };

    getData = (data) => {
        console.log(`
        firstName: ${data.firstName} 
        lastName: ${data.lastName}
        userName: ${data.userName}
        email: ${data.email}
        password: ${data.password}
        confirmationPassword: ${data.confirmationPassword}
        region: ${data.region}
        gender: ${data.gender}
        promotionalEmails: ${data.promotionalEmails}
        files: ${data.files}`
        );
        this.notify();
    };

    notify = () => {
        toast("Form submitted successfully");
    };

    render() {
        const {formErrors} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <ToastContainer/>

                <form className="demoForm"
                      onSubmit={this.handleSubmit}>
                    <h2>Sign up</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="firstName"
                        label="First Name *"
                        type="text"
                        onChange={this.handleUserInput}
                        value={this.state.firstName}
                        fullWidth/>
                    <p className="helper-text">{formErrors.firstName}</p>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="lastName"
                        label="Last Name *"
                        type="text"
                        onChange={this.handleUserInput}
                        value={this.state.lastName}
                        fullWidth/>
                    <p className="helper-text">{formErrors.lastName}</p>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="userName"
                        label="User Name *"
                        type="text"
                        onChange={this.handleUserInput}
                        value={this.state.userName}
                        fullWidth/>
                    <p className="helper-text">{formErrors.userName}</p>


                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="email"
                        label="Email *"
                        type="email"
                        onChange={this.handleUserInput}
                        value={this.state.email}
                        fullWidth/>
                    <p className="helper-text">{formErrors.email}</p>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Password *"
                        type="password"
                        onChange={this.handleUserInput}
                        value={this.state.password}
                        fullWidth/>
                    <p className="helper-text">{formErrors.password}</p>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="confirmationPassword"
                        label="Confirmation Password *"
                        type="password"
                        onChange={this.handleUserInput}
                        value={this.state.confirmationPassword}
                        fullWidth/>
                    <p className="helper-text">{formErrors.confirmationPassword}</p>

                    <Select handleChangeRegion={this.handleChangeRegion}/>

                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="customized-radios"
                                        onChange={this.handleChangeGender}>
                                <FormControlLabel value="female" control={<StyledRadio/>} label="Female"/>
                                <FormControlLabel value="male" control={<StyledRadio/>} label="Male"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.promotionalEmails}
                                    onChange={this.handleCheckbox}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="Send me promotional emails checkbox"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextareaAutosize
                            rows={7}
                            placeholder="Additional info"
                            className='textarea-style'
                            onChange={this.handleAdditionalInfo}
                        />
                    </Grid>

                    <FileInput handleSetFile={this.handleSetFile}/>

                    <Button variant="contained"
                            color="primary"
                            className="btn btn-primary"
                            disabled={!this.state.formValid}
                            type="submit">
                        Sign up
                    </Button>
                </form>
            </Container>
        )
    }
}

export default Form;