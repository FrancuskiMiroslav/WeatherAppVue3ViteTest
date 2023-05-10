<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.card {
    box-shadow: 0 4px 8px rgba($color: $lightBlue, $alpha: 0.7);
    max-width: 100%;
    border-radius: 3px;
}
</style>