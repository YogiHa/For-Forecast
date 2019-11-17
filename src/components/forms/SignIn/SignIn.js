import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signIn, cleanError } from "../../../store/actions/authActions";
import { clearModal } from '../../../store/actions/modalActions';

import SignInUI from './SignInUI';

function SignIn() {

    const uid = useSelector(state => state.firebase.auth.uid);
    const error = useSelector(state => state.authError);

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [span, setSpan] = useState(null);

    const onSubmitSignIn = event => {
        event.preventDefault();
        dispatch(cleanError());
        setSpan(<img alt = "loading" src={require('../../../assets/loading.svg')} />);
        dispatch(signIn({ email, password }));
    };

    if (uid) dispatch(clearModal());

    if (error && span !== error) setSpan(error);

    return <SignInUI setEmail={setEmail} setPassword={setPassword} span={span} onSubmitSignIn={onSubmitSignIn} />;
}

export default SignIn;