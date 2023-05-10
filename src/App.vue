<template>
  <div class="app-container">
    <main class="main-content">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
/* add your styles here */
#app {
  position: relative;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(73, 9, 121, 1) 30%, rgba(0, 212, 255, 1) 100%);
  color: #ffffff;
}

.main-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
