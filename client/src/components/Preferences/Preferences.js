import React, { Fragment, useEffect, useState } from 'react';

export default function Preferences() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [alias, setAlias] = useState();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {

  }, []);

  return(
    <Fragment>
      <h2>Preferences</h2>
      <p>
        <b>Email: </b>{email}
      </p>
      <p>
        <b>Password: </b>{password}
      </p>
      <p>
        <b>First Name: </b>{firstName}
      </p>
      <p>
        <b>Last Name: </b>{lastName}
      </p>
      <p>
        <b>Mobile: </b>{mobile}
      </p>
      <p>
        <b>Alias: </b>{alias}
      </p>

    </Fragment>
  );
}
