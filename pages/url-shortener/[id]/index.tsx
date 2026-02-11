import { Steps, Alert, Box, Heading, Spinner } from "@chakra-ui/react";
import { useGetUrl } from "api/urls/hooks";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import React from "react";
import { RoleEnum } from "../../../src/generated/roles";
import UrlDetails from "./components/url-details";

export function PageUrl() {
	const router = useRouter();
	const urlId = parseInt(router.query.id as string, 10);

	const { isLoading, isSuccess, isError, data, error } = useGetUrl(urlId, {
		retry: false,
	});

	return (
        <Box textAlign="center" mt={3}>
            <Heading mb={4}>URL Details</Heading>
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
            {isLoading && <Spinner />}
            {isSuccess && <UrlDetails url={data} />}
        </Box>
    );
}

// Auth
PageUrl.auth = true;
PageUrl.authRoles = [RoleEnum.USER, RoleEnum.ADMIN];
export const getServerSideProps = async (ctx) => ({
	props: { session: await getSession(ctx) },
});

export default PageUrl;
