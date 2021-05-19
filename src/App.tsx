import { useEffect } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { About, Dashboard, SignIn } from './pages';

function App() {
  const history = useHistory()

  async function getProfile() {

  }

  useEffect(() => {}, [])

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/sign-in'>
            Sign In
          </Nav.Link>
          <Nav.Link as={Link} to='/dashboard'>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to='/about'>
            About
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-info'>Search</Button>
        </Form>
      </Navbar>

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/sign-in'>
          <SignIn />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </div>
  )
}

export default App
