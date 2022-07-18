<script lang="ts">
    import {
    Button,Collapse,Nav,Navbar,NavbarBrand,NavbarToggler,NavItem
    } from "sveltestrap";
    import { wallet } from "../stores/wallet";

    let isOpen = false;

    function handleUpdate(event:any) {
        isOpen = event.detail.isOpen;
    }
</script>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">
        <img alt="logo" />
    </NavbarBrand>

    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            {#if $wallet}
                <NavItem>
                    <Button color="light" >
                        Create {$wallet}
                    </Button>
                </NavItem>
            {:else}
                <NavItem>
                    <Button color="light" on:click={() => wallet.signIn()}>
                        Connect Wallet
                    </Button>
                </NavItem>
            {/if}
        </Nav>
    </Collapse>
</Navbar>
