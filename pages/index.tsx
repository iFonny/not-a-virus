/*
 MIGRATION NOTE: The following Chakra UI hooks have been removed.
 Please replace them with the suggested alternatives:

//   - useBoolean: Use react-use: useToggle or useState
//   - useClipboard: Use react-use: useCopyToClipboard

 See: https://chakra-ui.com/docs/get-started/migration#hooks
*/

import {
	Box,
	Button,
	Field,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Stat,
	Steps,
	useCopyToClipboard,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const UserInfo = () => {
	const [show, setShow] = useBoolean();
	const { data: session, status } = useSession();
	const { hasCopied, onCopy, value } = useCopyToClipboard(
		session?.user?.apiKey,
	);

	if (status === "loading") return <Spinner />;

	if (session?.user) {
		return (
			<>
				<Stat.Root>
					<Stat.Root marginX={1}>
						<Stat.Label>User id</Stat.Label>
						<Stat.ValueText>{session.user.id}</Stat.ValueText>
					</Stat.Root>

					<Stat.Root marginX={1}>
						<Stat.Label>User role</Stat.Label>
						<Stat.ValueText>{session.user.role}</Stat.ValueText>
					</Stat.Root>
				</Stat.Root>
				<br />
				<Box textAlign="center">
					<Field.Root>
						<Field.Label>Api key</Field.Label>
						<InputGroup size="lg">
							<Input
								pr="4.5rem"
								type={show ? "text" : "password"}
								disabled
								value={String(value)}
							/>
							<InputRightElement mr="2" width="auto">
								<Button onClick={onCopy} size="md" h="2rem" ml="2">
									{hasCopied ? "Copied" : "Copy"}
								</Button>
								<Button
									onClick={setShow.toggle}
									size="md"
									colorPalette="green"
									h="2rem"
									ml="2"
								>
									{show ? <LuEyeOff /> : <LuEye />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</Field.Root>
				</Box>
			</>
		);
	}
};

const Home = () => {
	return (
		<Box padding={5}>
			<UserInfo />
		</Box>
	);
};

// Auth
Home.auth = true;
export const getServerSideProps = async (ctx) => ({
	props: { session: await getSession(ctx) },
});

export default Home;
