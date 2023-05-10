<template>
  <div>
    <section class="not-found bg-light">
      <base-card>
        <div class="not-found__content">
          <h2 class="not-found__title">Page not NotFound</h2>
          <p class="not-found__text">This page cannot be found try clicking on a button below to go back to home page</p>
          <base-button to="/" class="button-secondary">Home page</base-button>.
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped lang="scss">
.not-found {
  height: 100vh;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    padding: 30px;
    border-radius: 0 0 3px 3px;

    h2 {
      color: $lightBlue;
    }

    p {
      color: $lightBlue;
    }
  }
}
</style>