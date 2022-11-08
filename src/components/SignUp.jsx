import React, {useState} from 'react';
import facade from "../apiFacade.js";

function SignUp(props) {
    const init = {username: "", password: "", rPassword: ""};
    const [signUpInfo, setSignUpInfo] = useState(init);


    const createUser = (evt) => {
        evt.preventDefault();
        if (signUpInfo.password === signUpInfo.rPassword) {
            facade.createUser(signUpInfo.username, signUpInfo.password, signUpInfo.rPassword);
        } else {
            console.log("noget gik galt")
        }
    }

    const onChange = (evt) => {
        setSignUpInfo({...signUpInfo, [evt.target.id]: evt.target.value})
    }

    return (
        <div>
            <h2>Sign up</h2>
            <form>
                <input onChange={onChange} type="text" placeholder="User Name" id="username"/>
                <input onChange={onChange} type="text" placeholder="Password" id="password"/>
                <input onChange={onChange} type="text" placeholder="Repeat password" id="rPassword"/>
                <button onClick={createUser} type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;