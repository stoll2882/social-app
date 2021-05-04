import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import NotifyService from '../../services/NotifyService';

export default function ContactMe() {

  const [subject, setSubject] = useState();
  const [text, setText] = useState();
  const [contactMeWorked, setContactMeWorked] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    await NotifyService.contactMe(subject, text);
    setContactMeWorked(true);
    setSending(false);
  }

  if(contactMeWorked) {
    return <Redirect to="/dashboard"/>
  } 
  
  if(sending) {
    return <h2>Sending...</h2>
  }

  return(
    <Fragment>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Subject</p>
          <input type="text" onChange={e => setSubject(e.target.value)}/>
        </label>
        <label>
          <p>Content</p>
          <input type="text" onChange={e => setText(e.target.value)}/>
        </label>        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
  </Fragment>

  );
}
