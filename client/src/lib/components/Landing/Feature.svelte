<script lang="ts">
    export let text: string;
    export let imgSrc: string;
  </script>

<div class="col-sm-4 cardStyle auto-margin">
    <div class="card-container">
    <p class="inside-text">{text}</p>
    <div class="center-align auto-margin">
      <img src={imgSrc} alt={"feature-show"} class="feature-image" />
    </div>
    </div>
  </div>

  <style>
    .cardStyle {
      font: Roboto, sans-serif;
      background-color: #c4c4c4;
      max-width: 250px !important;
      height: 200px;
      margin: 20px 50px;
      border-radius: 5px;
      color: black;
    }
  
    .auto-margin {
      margin:  30px auto;
    }
  
    .inside-text {
      padding: 30px 10px;
      height: 40%;
    }
  
    .feature-image {
      width: 90%;
      vertical-align: middle;
    }
  
    .center-align {
      align-items: center;
    }
  
    .card-container{
      padding: 15px calc(var(--bs-gutter-x) * .5) 25px;
      height: 100%;
      width: 100%;
    }
  </style>
