import axios from 'axios';
import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Notification, useNotify } from '../../components/NotificationWrapper';
import { ErrorCode } from '../../types/ErrorCode';
import { getAxiosErrCode } from '../../utils';

const axiosInstance = axios.create({
  withCredentials: true,
})

export const SignIn = (): ReactElement => {
  const { notify } = useNotify()
  const history = useHistory<any>()

  const { register, handleSubmit } = useForm()
  const [validated, setValidated] = useState(false)


  function login(event: any) {
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)

    handleSubmit(data => {
      axiosInstance
        .post('/auth/login', data)
        .then(() => {
          notify(
            new Notification({
              type: 'success',
              title: 'Success',
              message: 'Successfully signed in',
            })
          )

          history.replace('/dashboard')
        })
        .catch(
          getAxiosErrCode(code => {
            if (code === ErrorCode.Unauthorized) {
              notify(
                new Notification({
                  type: 'danger',
                  title: 'Error',
                  message: 'Unauthorized',
                })
              )
            }
          })
        )
    })()
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <Form validated={validated} onSubmit={login}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register('email', { required: true })}
              type='email'
              required
              placeholder='Enter email'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register('password', { required: true })}
              type='password'
              required
              placeholder='Password'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
