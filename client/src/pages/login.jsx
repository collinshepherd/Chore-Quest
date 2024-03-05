import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        emailOrUsername: "",
        password: "",
      };
  
    this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      event.preventDefault();
      const target = event.target;
      this.setState({
        [target.name]: target.value,
      });
    }