import React from 'react';
import '../Stylings/AccountCreationStyling.css'


class CreateAccountPage extends React.Component{
  constructor(props){
      super(props)

      this.state = {
        hasAccount: true
      }

      this.handleSubmit = this.props.handleSubmit.bind(this);
      this.setUserName = this.props.setUserName.bind(this);
      this.setPassword = this.props.setPassword.bind(this);
      this.setEmail = this.props.setEmail.bind(this);
  }

  render(){
    return(
      <div className="modal">
        <div className="login-wrapper">
        <h1>Create an Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label>
              <label className="fieldLabel">Email:<label className="required">*</label></label>
            </label>
            <input type="email" onChange={e => this.setEmail(e.target.value)} required/>
          </div>
          <div className="field">
            <label>
              <label className="fieldLabel">Username:<label className="required">*</label></label>
            </label>
            <input type="text" onChange={e => this.setUserName(e.target.value)} required/>
          </div>
          <div className="field">
            <label>
              <label className="fieldLabel">Password:<label className="required">*</label></label>
            </label>
            <input type="password" onChange={e => this.setPassword(e.target.value)} required/>
          </div>
          <section className="actions">
            <div className="submit-button">
              <button type="submit" className="submit-btn">Submit</button>
              <button className="submit-btn" onClick={() => this.props.setAccountStatus(true)}>Cancel</button>
            </div>
          </section>
        </form>
      </div>
      </div>
    )
  }
}

export default CreateAccountPage; 
