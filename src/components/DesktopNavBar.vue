<template>
    <div class="vertical-container mid-aligner">
        <Logo/>
        <div class="horizontal-container m-separator">
            <router-link v-for="opt in options" :key="opt.to" :to="opt.to"
                class="s-padding title-font animation-hover" active-class="selected" exact-active-class="selected">
                {{ opt.label }}
            </router-link>
        </div>
    </div>
</template>

<script setup>
import Logo from './Logo.vue';

defineProps({
    options: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(
                item =>
                    typeof item.label === 'string' &&
                    typeof item.to === 'string'
            )
        }
    }
})

</script>