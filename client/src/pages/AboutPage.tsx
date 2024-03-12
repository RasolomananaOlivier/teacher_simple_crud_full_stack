import { Center, Flex, Text, Title } from "@mantine/core";

export default function AboutPage() {
  return (
    <Center h="70vh">
      <Flex gap="lg" direction="column" justify="center" align="center">
        <Title>Gestion d'enseignants</Title>
        <Text>Cette application a été créée pour gérer les enseignants.</Text>
        <Text>Version : 1.0.0</Text>
      </Flex>
    </Center>
  );
}
