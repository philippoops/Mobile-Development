import React from 'react';

console.log(React);
class ContactDetails extends React.Component {
  // In this render you can see that we are using this.props
  // These props would be passed in when you create the component
  // for example <ContactDetails name="Some Name" number="123-123-1234">
  render() {
    return (
      <div>
        <h1>You entered the following contact data</h1>
        <div>
          <div>Contact Name: {this.props.name}</div>
          <div>Contact Telephone Number: {this.props.number}</div>
        </div>
      </div>
    );
  }
}

export default ContactDetails;
