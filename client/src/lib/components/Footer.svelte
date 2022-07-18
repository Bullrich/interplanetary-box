<script lang="ts">
    import footer from "../../assets/logo.svg";
    import { Container } from "sveltestrap";
</script>

<section class="footer">
    <Container style="min-width: 90%;">
        <div class="footer-container">
            <img src={footer} height="64px" alt="footer logo" />
            <p>
                2022 Made with ♥ by
                <a href="https://twitter.com/JavierBullrich" target="_blank">
                    @JavierBullrich
                </a>
                at
                <a target="_blank" href="https://hackfs.com/"> #HackFS </a>
            </p>
        </div>
    </Container>
</section>

<style>
    .footer {
        background-color: rgb(71, 145, 209);
        
    }

    .footer-container {
        padding: 30px 0;
        color: white;
    }

    a:link {
        color: white;
    }

    a:visited {
        color: rgb(213, 213, 213);
    }
</style>
