<script lang="ts">
    import {
        Button,
        Collapse,
        Nav,
        Navbar,
        NavbarBrand,
        NavbarToggler,
        NavItem,
    } from "sveltestrap";
    import { wallet } from "../stores/wallet";
    import logo from "../../assets/logo.svg";
    import ConnectWallet from "./ConnectWallet.svelte";

    let isOpen = false;

    function handleUpdate(event: any) {
        isOpen = event.detail.isOpen;
    }
</script>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">
        <img alt="logo" src={logo} height="32px" />
        Interplanetary Box
    </NavbarBrand>

    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            <NavItem>
                {#if $wallet}
                    <Button disabled>
                        Wallet connected
                    </Button>
                {:else}
                    <ConnectWallet />
                {/if}
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>
