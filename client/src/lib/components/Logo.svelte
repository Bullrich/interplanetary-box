<script lang="ts">
    import logo from "../../assets/logo.svg";
</script>

<img alt="logo" class="animate flip" src={logo} style="width: 60%; height:60%"/>

<style>
    .animate {
        animation-duration: 0.5s;
        animation-name: animate-fade;
        animation-delay: 0.5s;
        animation-fill-mode: backwards;
    }

    @keyframes animate-fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
