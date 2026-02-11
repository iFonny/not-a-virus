import { useColorModeValue } from "../ui/color-mode";
import {
    Steps,
    Avatar,
    Box,
    Button,
    Collapsible,
    Flex,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Popover,
    Spinner,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import ThemeToggler from "src/components-ui /theme-toggler";
import { Logo } from "../../components-ui /logo";
import { RoleEnum } from "../../generated/roles";
import { LuChevronDown, LuChevronRight, LuMenu, LuX } from 'react-icons/lu';

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
	authRoles?: RoleEnum[];
}

const NAV_ITEMS: Array<NavItem> = [
	{ label: "Home", href: "/" },
	{
		label: "Url Shortener",
		href: "/url-shortener",
		authRoles: [RoleEnum.USER, RoleEnum.ADMIN],
	},
	{
		label: "My Urls",
		href: "/urls",
		authRoles: [RoleEnum.USER, RoleEnum.ADMIN],
	},
];

const LogoutButton = ({ sessionUser, status }) => {
	if (status === "loading") return <Spinner />;

	if (status === "authenticated" && sessionUser)
		return (
            <Menu>
                <MenuButton
					rounded={"full"}
					variant={"link"}
					cursor={"pointer"}
					minW={0}
					asChild
				><Button>
                        <Avatar.Root size={"sm"}><Avatar.Fallback /><Avatar.Image src={sessionUser.image} /></Avatar.Root>
                    </Button></MenuButton>
                <MenuList>
					<MenuGroup title={sessionUser.name}>
						<MenuDivider />
						<MenuItem onClick={async () => await signOut()}>Logout</MenuItem>
					</MenuGroup>
				</MenuList>
            </Menu>
        );

	return <Button onClick={async () => await signIn("discord")}>Sign In</Button>;
};

export const NavBar = () => {
	const { open, onToggle } = useDisclosure();
	const { data: session, status } = useSession();

	const navigationItems = NAV_ITEMS.filter(
		({ authRoles }) => !authRoles || authRoles.includes(session?.user?.role),
	);

	return (
        <Box>
            <Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton onClick={onToggle} variant={"ghost"} aria-label={"Toggle Navigation"}>{isOpen ? <Icon w={3} h={3} asChild><LuX /></Icon> : <Icon w={5} h={5} asChild><LuMenu /></Icon>}</IconButton>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "start" }}
					align="center"
				>
					<Logo />

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav navigationItems={navigationItems} />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					gap={6}
					align="center"
				>
					<ThemeToggler />

					<LogoutButton sessionUser={session?.user} status={status} />
				</Stack>
			</Flex>
            <Collapsible.Root open={isOpen}>
                <Collapsible.Content>
                    <MobileNav navigationItems={navigationItems} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Box>
    );
};

const DesktopNav = ({ navigationItems }) => {
	return (
        <Stack direction={"row"} align="center" gap={4}>
            {navigationItems.map((navItem) => (
				<Box key={navItem.label}>
					<Popover.Root
                        positioning={{
                            placement: "bottom-start"
                        }}>
						{/* <PopoverTrigger> */}
						<Link
                            px={2}
                            py={1}
                            rounded={"md"}
                            _hover={{
								textDecoration: "none",
								bg: useColorModeValue("gray.200", "gray.700"),
							}}
                            asChild><NextLink href={navItem.href}>
                                {navItem.label}
                            </NextLink></Link>
						{/* </PopoverTrigger> */}

						{navItem.children && (
							<Popover.Positioner>
                                <Popover.Content
                                    border={0}
                                    boxShadow={"xl"}
                                    bg={useColorModeValue("white", "gray.800")}
                                    p={4}
                                    rounded={"xl"}
                                    minW={"sm"}>
                                    <Stack>
                                        {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.label} {...child} />
                                        ))}
                                    </Stack>
                                </Popover.Content>
                            </Popover.Positioner>
						)}
					</Popover.Root>
				</Box>
			))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
        <Link
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
            asChild><NextLink href={href}>
                <Stack direction={"row"} align={"center"}>
                    <Box>
                        <Text
                            transition={"all .3s ease"}
                            _groupHover={{ color: "pink.400" }}
                            fontWeight={500}
                        >
                            {label}
                        </Text>
                        <Text fontSize={"sm"}>{subLabel}</Text>
                    </Box>
                    <Flex
                        transition={"all .3s ease"}
                        transform={"translateX(-10px)"}
                        opacity={0}
                        _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                        justify={"flex-end"}
                        align={"center"}
                        flex={1}
                    >
                        <Icon color={"pink.400"} w={5} h={5} asChild><ChevronRightIcon /></Icon>
                    </Flex>
                </Stack>
            </NextLink></Link>
    );
};

const MobileNav = ({ navigationItems }) => {
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}
		>
			{navigationItems.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { open, onToggle } = useDisclosure();

	return (
        <Stack gap={4} onClick={children && onToggle}>
            <Flex
                py={2}
                justify={"space-between"}
                align={"center"}
                _hover={{
					textDecoration: "none",
				}}
                asChild><Link href={href ?? "#"}>
                    <Text
                        fontWeight={600}
                        color={useColorModeValue("gray.600", "gray.200")}
                    >
                        {label}
                    </Text>
                    {children && (
                        <Icon
                            transition={"all .25s ease-in-out"}
                            transform={isOpen ? "rotate(180deg)" : ""}
                            w={6}
                            h={6}
                            asChild><ChevronDownIcon /></Icon>
                    )}
                </Link></Flex>
            <Collapsible.Root open={isOpen} style={{ marginTop: "0!important" }}>
                <Collapsible.Content>
                    <Stack
                        mt={2}
                        pl={4}
                        borderLeft={1}
                        borderStyle={"solid"}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                        align={"start"}
                    >
                        {children &&
                            children.map((child) => (
                                <Link py={2} asChild><NextLink key={child.label} href={child.href}>
                                        {child.label}
                                    </NextLink></Link>
                            ))}
                    </Stack>
                </Collapsible.Content>
            </Collapsible.Root>
        </Stack>
    );
};

export default NavBar;
