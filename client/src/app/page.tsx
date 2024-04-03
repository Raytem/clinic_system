import s from "./page.module.css";
import Image from 'next/image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import classNames from "classnames";

export default function Home() {
  return (
    <main>
        <Row className={classNames("d-flex align-items-center"), s.pane}>
          <Col>
            <Image 
              alt="hear_icon"
              layout="responsive" 
              src="/heart_icon.png" 
              width={200} 
              height={200}
            />
          </Col>
          <Col className={s.decription}>
            <div className="text-center">
              <h1>Clinic management system</h1>
              <p>Manage your clinic managemant easily</p>

              <div className={s.buttons}>
                <div className={s.buttonsTop}>
                  <Link href="/login">
                    <Button variant="primary">Login</Button>
                  </Link>
                </div>

                <div className={s.buttonsBottom}>
                  <Link href="/signup/patient">
                    <Button variant="secondary">
                      Signup as Patient
                    </Button>
                  </Link>

                  <Link href="/signup/doctor">
                    <Button variant="secondary">
                      Signup as Doctor
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </Col>
        </Row>
    </main>
  );
}
