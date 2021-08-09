import React from 'react';
import '../Stylings/LoginStyling.css'


class LogInPage extends React.Component{
  constructor(props){
      super(props)

      this.state = {
        hasAccount: true
      }

      this.handleSubmit = this.props.handleSubmit.bind(this);
      this.setUserName = this.props.setUserName.bind(this);
      this.setPassword = this.props.setPassword.bind(this);
      this.setStaySignedIn = this.props.setStaySignedIn.bind(this);
      this.setAccountStatus = this.props.setAccountStatus.bind(this);
  }

  render(){
    return(
      <div className="logInModal">
        <div className="login-wrapper">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label>
              <label className="fieldLabel">Username:<label className="required">*</label></label>
            </label>
            <input type="text" onChange={e => this.setUserName(e.target.value)} />
          </div>
          <div className="field">
            <label>
              <label className="fieldLabel">Password:<label className="required">*</label></label>
            </label>
            <input type="password" onChange={e => this.setPassword(e.target.value)} />
          </div>
          <div className="checkbox">
            <label>            
              <input type="checkbox" onChange={e => this.setStaySignedIn(e.target.checked)} />
              Keep Me Logged In
            </label>
            </div>
          <section className="actions">
            <div className="submit-button">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
            <div className="links">
              <p>Need an account? <button className="accountButton" onClick={() => { this.setAccountStatus(false) }}> Click Here</button></p>
            </div>
          </section>
        </form>
      </div>
      </div>
    )
  }
}

export default LogInPage; 
