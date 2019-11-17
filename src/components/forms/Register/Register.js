import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { register, cleanError } from "../../../store/actions/authActions";
import { clearModal } from '../../../store/actions/modalActions';

import RegisterUI from './RegisterUI'


function Register() {

    const uid = useSelector(state => state.firebase.auth.uid);
    const error = useSelector(state => state.authError);

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [span, setSpan] = useState(null);

    const onSubmitRegister = event => {
        event.preventDefault();
        dispatch(cleanError());
        if (firstName.length < 1) {
            return setSpan('First name is required for registeration')
        }
        setSpan(<img alt="loading" src={require('../../../assets/loading.svg')} />);
        dispatch(register({ email, password, firstName, lastName }));

    };

    if (uid) {
        dispatch(clearModal())
    }

    if (error) {
        if (span !== error) setSpan(error);
    }

    return <RegisterUI setEmail={setEmail} setPassword={setPassword} setFirstName={setFirstName} setLastName={setLastName} span={span} onSubmitRegister={onSubmitRegister} />;
}

export default Register;