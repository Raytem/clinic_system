'use client'
import React from 'react'
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/contexts/root-store-context';

const DoctorHeaderLinks = observer(() => {
    const {userStore} = useStore();

    return (
      <>
          <Nav.Link as="span" disabled>
              {`Droctor: ${userStore.user.lastName} ${userStore.user.firstName}`}
          </Nav.Link>
          <Nav.Link as="span">
              <Link className="text-link" href='/appointments'>Appointments</Link>
          </Nav.Link>
      </>
    )
  })

export default DoctorHeaderLinks