import React from 'react';

var AccountComponent = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            success : ""
        }
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , success : "..."});
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        fetch('http://localhost:8080/AccountCreation/createAccount?userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Acccount created'});
            }
            else{
                this.setState({success: 'Name already taken'});
            }
        })
    },

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <input type="submit" value="Create a new Account" />
                </form>
                Success: {this.state.success}
            </div>
        );
    }
});

export class AccountCreation extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                Create a new Account:
                <br/>
                <AccountComponent callback={this.setNameState}/>
                <br/>
            </div>
        );
    }
}
