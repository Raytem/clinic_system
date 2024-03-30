import Image from "next/image";
import styles from "./page.module.css";
import { Button, Stack } from "react-bootstrap";

export default function Home() {
  return (
    <main className={styles.main}>
      <Stack direction="horizontal" gap={2}>
        <Button variant="flat" color="primary">Hello</Button>
        <Button variant="success">Bye</Button>
      </Stack>
    </main>
  );
}
