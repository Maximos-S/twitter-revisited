import React from 'react';


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
        };
    }

    updateUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    updatePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    registerUser = async  (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/users", {method:"POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
            })
            if(!res.ok) {
                throw res;
            }
            const user = await res.json();
            console.log("user res.json", user)
            localStorage.setItem("userId", user.user.id)
            localStorage.setItem("userToken", user.token)
        } catch (e) {
            console.error(e);
        }
    }


    render() {
        const {username, email, password} = this.state
        return (
            <form onSubmit={this.registerUser}>
                <h2>Register</h2>
                <input type="text" placeholder="enter username" value={username} onChange={this.updateUsername} />
                <input type="email" placeholder="enter email" value={email} onChange={this.updateEmail} />
                <input type="password" placeholder="enter password" value={password} onChange={this.updatePassword} />
                <button type="submit">Submit</button>
                
            </form>
        );
    }
}


export default RegistrationForm;
