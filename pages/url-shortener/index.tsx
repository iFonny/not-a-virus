import { Steps, Alert, Box, Heading } from "@chakra-ui/react";
import type { CreateUrlDTO } from "api/urls";
import { useCreateUrl } from "api/urls/hooks";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import routes from "src/constants/routes";
import { RoleEnum } from "../../src/generated/roles";
import UrlShortenerForm from "./components/form";

const PageUrlShortener = () => {
	const router = useRouter();
	const { mutateAsync, isError, error } = useCreateUrl();

	const handleSubmit = async (payload: CreateUrlDTO) => {
		await mutateAsync(payload, {
			onSuccess: (res) => router.push(routes.urlShortener.show(res.data.id)),
		});
	};

	return (
        <Box textAlign="center" mt={3} paddingX={5}>
            <Heading mb={3}>URL Shortener</Heading>
            {isError && (
				<Box marginY={4}>
					<Alert.Root status="error" borderRadius={4}>
						<Alert.Indicator />
						<Alert.Description>
							{error?.response?.data?.message || error.message}
						</Alert.Description>
					</Alert.Root>
				</Box>
			)}
            <UrlShortenerForm onSubmit={handleSubmit} />
        </Box>
    );
};

PageUrlShortener.auth = true;
PageUrlShortener.authRoles = [RoleEnum.USER, RoleEnum.ADMIN];
export const getServerSideProps = async (ctx) => ({
	props: { session: await getSession(ctx) },
});

export default PageUrlShortener;
