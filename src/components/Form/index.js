import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const ReportInput = styled.textarea`
  margin-top: 2em;
  padding: 1em;
  width: 80%;
  border-style: none;
`;

const Button = styled.button`
  color: ${theme.colors.background};
  background: ${theme.colors.textYellow};
  display: inline - block;
  font-weight: bold;
  margin: ${theme.spaces.medium} 0;
  padding: ${theme.spaces.medium};
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  user-select: none;
  border: 1px solid transparent;
  &: hover {
    outline: 1px solid ${theme.colors.background};
  }
`;

class Form extends React.Component {
  state = {
    report: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const body = {
      report: this.state.report
    };
    event.preventDefault();
    fetch("https://us-central1-jsconf-hi.cloudfunctions.net/website-receive", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.text();
      })
      .then(text => {
        // TODO this is where we likely want to update the component
        // The text from the response can be used to let folks
        // Know if was successful
        // console.log(text);
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ReportInput
          type="text"
          name="report"
          placeholder="Enter details here..."
          value={this.state.report}
          onChange={this.handleInputChange}
        />
        <p>
          We’ll review and act on it. If you let us know who you are, we’ll
          follow up with you.
        </p>
        <Button isPrimary type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default Form;