'use client'
import { useStore } from '@/stores/contexts/root-store-context';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Role} from '@/enums/Role'
import DoctorHeaderLinks from '@/components/layout/header/headerLinks/DoctorHeaderLinks'
import PatientHeaderLinks from '@/components/layout/header/headerLinks/PatientHeaderLinks'
import { accessTokenUtil } from '@/utils/access-token.util';

const Header = observer(() => {
  const {userStore} = useStore();

  const handleLogout = () => {
    userStore.clearUser();
    accessTokenUtil.clear();
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand>
            <Link className="text-link" href='/'>Clinic</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <Link className="text-link" href='/'>Clinic</Link>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto">

                {
                  (userStore.user && userStore.user.roles[0] === Role.DOCTOR)
                  &&
                  (<DoctorHeaderLinks />)
                }
               

                {
                  (userStore.user && userStore.user.roles[0] === Role.PATIENT)
                  &&
                  (<PatientHeaderLinks />)
                }

                <Nav.Link as="span">
                    <Link className="text-link" href='/doctors'>Doctors</Link>
                </Nav.Link>
                {
                  !userStore.user &&
                  (
                    <>
                      <Nav.Link as="span">
                        <Link className="text-link" href='/login'>Login</Link>
                      </Nav.Link>
                      <NavDropdown title="Signup" id="basic-nav-dropdown">
                        <NavDropdown.Item as="span">
                            <Link className="text-link" href='/signup/patient'>as Patient</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item as="span">
                            <Link className="text-link" href='/signup/doctor'>as Doctor</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )
                }

                {
                  (userStore.user) 
                  &&
                  (
                    <Nav.Link className="text-danger" as="span">
                        <Link onClick={handleLogout} className="text-link" href='/'>{`Logout`}</Link>
                    </Nav.Link>
                  )
                }
                 
              </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
})

export default Header