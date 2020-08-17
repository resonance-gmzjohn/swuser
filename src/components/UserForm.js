import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'


export default function UserForm({ addUser }) {

  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [age, setAge] = useState(0)
  let [email, setEmail] = useState('')

  let [submitMessage, setSubmitMessage] = useState('')

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value)
  }

  const handleChangeLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangeAge = (event) => {
    setAge(event.target.value)
  }

  const submit = () => {
    addUser({
      name: {
        first: firstName,
        last: lastName
      },
      dob: {
        age: age
      },
      email: email
    })
    setSubmitMessage(`New User Was created: ${firstName} ${lastName} - ${age}`)
  }

  return (
    <React.Fragment>
      <form noValidate autoComplete="off">
        <Typography variant="h4" gutterBottom>
          Create new User
      </Typography>
        <FormControl required style={{
          width: '100%',
          paddingTop: 10,
          paddingBottom: 10
        }}>
          <TextField value={firstName} onChange={handleChangeFirstName} label="First Name" />
        </FormControl>
        <FormControl required style={{
          width: '100%',
          paddingTop: 10,
          paddingBottom: 10
        }}>
          <TextField value={lastName} onChange={handleChangeLastName} label="Last Name" />
        </FormControl>
        <FormControl required style={{
          width: '100%',
          paddingTop: 10,
          paddingBottom: 10
        }}>
          <TextField value={age} onChange={handleChangeAge} label="Age" />
        </FormControl>
        <FormControl required style={{
          width: '100%',
          paddingTop: 10,
          paddingBottom: 10
        }}>
          <TextField value={email} onChange={handleChangeEmail} label="Email" />
        </FormControl>
        <FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={submit}>
            Submit
          </Button>
        </FormControl>
        {submitMessage}
      </form>
    </React.Fragment>
  );
}
