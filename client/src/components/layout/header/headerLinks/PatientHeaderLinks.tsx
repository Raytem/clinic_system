import React from 'react'
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/contexts/root-store-context';

const PatientHeaderLinks = observer(() => {
    const {userStore} = useStore();

    return (
      <>
         <Nav.Link as="span" disabled>
              {`Patient: ${userStore.user.lastName} ${userStore.user.firstName}`}
          </Nav.Link>
          <Nav.Link as="span">
              <Link className="text-link" href='/appointments'>Appointments</Link>
          </Nav.Link>
          <Nav.Link as="span">
              <Link className="text-link" href='/recipes'>Recipes</Link>
          </Nav.Link>
      </>
    )
  })

export default PatientHeaderLinks