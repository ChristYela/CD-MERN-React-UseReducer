import React, { useReducer } from "react";
import styles from "./Form.module.css";

const initialState = {
    firstName: {
    value: "",
    noError: true,
},
    lastName: {
    value: "",
    noError: true,
},
    email: {
    value: "",
    noError: true,
    },
    
};

const validateInput = (type, value) => {
    let validName = /^[A-Za-z]+$/;
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.length === 0) {
    return true;
    } else if (type === "firstName" || type === "lastName") {
    return validName.test(value);
    } else if (type === "email") {
    return validEmail.test(value);
    }
};

const reducer = (state, action) => {
    return { ...state, [action.type]: action.payload };
};

const Form = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
    const { name, value } = e.target;
    const noError = validateInput(name, value);
    const action = {
        type: name,
        payload: {
        value: value,
        noError: noError,
        },
    };
    
    dispatch(action);
};

    return (
    <div className={styles.emailForm}>
        <label htmlFor="firstName">First Name</label>
        <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => handleInput(e)}
        />

    {

        state.firstName.noError === false && (
            <p className={styles.error}>
            First name must be letters with no spaces
            </p>
        )
    }

    <label htmlFor="lastName">Last Name</label>
        <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => handleInput(e)}
        />

    {state.lastName.noError === false && (
        <p className={styles.error}>Last name must be letters with no spaces</p>
    )}

    <label htmlFor="email">Email</label>
        <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => handleInput(e)}
    />

    {state.email.noError === false && (
        <p className={styles.error}>Email must be valid</p>
    )}

    <button  mt={4} className="btn btn-info" type="submit" value="Create User">Submit</button>
    </div>
);
};

export default Form;

