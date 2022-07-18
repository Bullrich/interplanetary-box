<script lang="ts">
    import { Container, Row, Col } from "sveltestrap";
    import Logo from "../components/Logo.svelte";
    import contract from "../../assets/landing/contract.svg";
    import encrypt from "../../assets/landing/encrypt.svg";
    import store from "../../assets/landing/store.svg";
    import ConnectWallet from "../components/ConnectWallet.svelte";
</script>

<Container>
    <Row
        class="d-flex flex-wrap align-items-center justify-content-center"
        style="height: 85vh;"
    >
        <Col sm={5}>
            <h2>Interplanetary Box</h2>
            <p>Store your files safely in the Distributed Web</p>
            <ConnectWallet />
        </Col>

        <Col sm={6}>
            <Logo />
        </Col>
    </Row>
    <section>
        <h3>How it works</h3>
        <Row>
            <Col>
                <img src={contract} alt="contract" height="256px" />
                <p class="work-detail">
                    Deploy your <u><b>smart contract</b></u> with your custom encryption
                    key.
                </p>
            </Col>
            <Col>
                <img src={encrypt} alt="encrypt" height="256px" />
                <p class="work-detail">
                    Encrypt your files and upload them to <b
                        ><u>the Interplanetary File System</u></b
                    >
                </p>
            </Col>
            <Col>
                <img src={store} alt="store" height="256px" />
                <p class="work-detail">
                    Fetch your files and <u><b>decrypt them</b></u> with your
                    wallet's key.
                    <br />
                    Only <u><b>you</b></u> have the ability to use this key.
                </p>
            </Col>
        </Row>
    </section>
</Container>

<style>
    h2 {
        animation: 1s slidein-left;
        font-style: normal;
        font-size: 52px;
        line-height: 76px;
        font-weight: bold;
        text-transform: capitalize;
        color: #2f2e34;
        text-align: left;
    }

    p {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 184%;
        color: #2f2e34;
        text-align: left;
    }

    @keyframes left_to_right {
        from {
            margin-left: -100%;
        }
        to {
            margin-left: 0;
        }
    }

    @keyframes slidein-left {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    .work-detail {
        font-size: 20px;
        margin-top: 20px;
    }

    h3 {
        padding-bottom: 50px;
    }
</style>
