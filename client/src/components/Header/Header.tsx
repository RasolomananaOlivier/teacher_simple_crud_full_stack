import { Menu, Group, Center, Burger, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const links = [{ link: "/about", label: "About" }];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Text fw={700}>Gestion d'enseignants</Text>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
