import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ConnectedRelays } from "../connected-relays";
import {
  HomeIcon,
  LiveStreamIcon,
  LogoutIcon,
  MapIcon,
  ProfileIcon,
  RelayIcon,
  SearchIcon,
  SettingsIcon,
} from "../icons";
import { UserAvatar } from "../user-avatar";
import { UserLink } from "../user-link";
import AccountSwitcher from "./account-switcher";
import { useCurrentAccount } from "../../hooks/use-current-account";
import accountService from "../../services/account";

export default function MobileSideDrawer({ ...props }: Omit<DrawerProps, "children">) {
  const navigate = useNavigate();
  const account = useCurrentAccount();

  return (
    <Drawer placement="left" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader px="4" py="4">
          {account ? (
            <Flex gap="2">
              <UserAvatar pubkey={account.pubkey} size="sm" noProxy />
              <UserLink pubkey={account.pubkey} />
            </Flex>
          ) : (
            <Flex gap="2">
              <Avatar src="/apple-touch-icon.png" size="sm" />
              <Text m={0}>Nostrudel</Text>
            </Flex>
          )}
        </DrawerHeader>
        <DrawerBody padding={0} overflowY="auto" overflowX="hidden">
          <AccountSwitcher />
          <Flex direction="column" gap="2" padding="2">
            <Button onClick={() => navigate(`/`)} leftIcon={<HomeIcon />}>
              Home
            </Button>
            <Button onClick={() => navigate(`/search`)} leftIcon={<SearchIcon />}>
              Search
            </Button>
            <Button onClick={() => navigate("/streams")} leftIcon={<LiveStreamIcon />}>
              Streams
            </Button>
            <Button onClick={() => navigate("/map")} leftIcon={<MapIcon />}>
              Map
            </Button>
            <Button onClick={() => navigate("/relays")} leftIcon={<RelayIcon />}>
              Relays
            </Button>
            <Button onClick={() => navigate(`/profile`)} leftIcon={<ProfileIcon />}>
              Profile
            </Button>
            <Button onClick={() => navigate("/settings")} leftIcon={<SettingsIcon />}>
              Settings
            </Button>
            {account ? (
              <Button onClick={() => accountService.logout()} leftIcon={<LogoutIcon />}>
                Logout
              </Button>
            ) : (
              <Button as={RouterLink} to="/login" colorScheme="brand">
                Login
              </Button>
            )}
            <ConnectedRelays />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
