<template>
    <button v-if="!link && !to && !href" :class="mode">
        <slot></slot>
    </button>

    <router-link v-else-if="to" :to="to" :class="mode">
        <slot></slot>
    </router-link>

    <a v-else-if="href && link" :href="href" :class="mode">
        <slot></slot>
    </a>

    <a v-else :href="href" :class="mode" target="_blank">
        <slot></slot>
    </a>
</template>
  
<script >
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null,
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: [String, Object],
            required: false,
            default: null,
        },
        href: {
            type: String,
            required: false,
            default: null,
        },
        downloadFileName: {
            type: String,
            required: false,
            default: null,
        },
    },
}
</script>

<style lang="scss" scoped>
.button {
    display: inline-block;
    border: none;
    border-bottom: 2px solid transparent;
    color: #fff;
    text-decoration: none;
    background-color: $secondaryClr;
    padding: 10px 45px !important;
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: 3px;
    text-align: center;
    position: relative;
    outline: none;
    transition: background-color 0.1s ease;
    cursor: pointer;
    overflow: hidden;

    &::after {
        transition: background-color 0.2s ease;
        position: absolute;
        content: '';
        height: 4px;
        bottom: 0;
        width: 100%;
        background-color: darken($secondaryClr, 50%);
        opacity: 0.18;
        left: 0;
    }

    &:hover {
        color: $secondaryClr !important;
    }

    &:focus,
    &:focus-visible {
        text-decoration: none;
        color: $primaryClr !important;
    }

    &:hover {
        background-color: lighten($primaryClr, 5%);

        &::after {
            opacity: 0.22;
        }
    }

    &:active {
        background-color: darken($primaryClr, 5%);

        &::after {
            opacity: 0.32;
        }
    }
}

.button-secondary {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: 2px solid transparent;
    color: $secondaryClr;
    text-decoration: none;
    background-color: $buttonClr;
    padding: 10px 25px !important;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    text-align: center;
    position: relative;
    outline: none;
    transition: background-color 0.1s ease;
    cursor: pointer;
    overflow: hidden;
    border-radius: 0 0 10px 10px;

    &::after {
        transition: background-color 0.2s ease;
        position: absolute;
        content: '';
        height: 4px;
        bottom: 0;
        width: 100%;
        background-color: darken($secondaryClr, 50%);
        opacity: 0.18;
        left: 0;
    }

    &:focus,
    &:hover {
        text-decoration: none;
        color: #fff;
    }

    &:hover {
        background-color: lighten($secondaryClr, 5%);
        color: #fff !important;
        border: 1px solid #ffffff;

        &::after {
            opacity: 0.22;
        }
    }

    &:active {
        background-color: darken($secondaryClr, 5%);

        &::after {
            opacity: 0.32;
        }
    }
}
</style>