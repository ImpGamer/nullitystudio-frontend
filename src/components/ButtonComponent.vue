<template>
    <component :is="tag" v-bind="componentProps" :style="bkColor" class="btn" @click="handleClick">
        <div v-if="busy" class="loader-container horizontal-container mid-aligner">
            <div class="loader"></div>
        </div>
        <div v-else class="btn-content horizontal-container mid-aligner">
            <img v-if="icon" :src="icon" class="icon" :class="color !== 'white' ? 'invert' : ''" />
            <p class="text" :style="textColor">{{ content }}</p>
        </div>
    </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: { type: String, default: 'black' },
    content: { type: String, default: 'Button' },
    icon: String,

    to: String,
    href: String,
    type: {
        type: String,
        default: 'button'
    },
    busy: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click'])
function handleClick(event) {
    if (props.busy) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    emit('click');
}

const bkColor = computed(() => {
    if (!props.busy) return { backgroundColor: props.color };
    const constantColor = {
        red: { r: 255, g: 0, b: 0 },
        blue: { r: 0, g: 0, b: 255 },
        green: { r: 0, g: 255, b: 0 },
        black: { r: 0, g: 0, b: 0 },
        grey: { r: 128, g: 128, b: 128 },
        white: { r: 255, g: 255, b: 255 }
    }

    let busyColor = constantColor[props.color];
    if (!busyColor && props.color.startsWith('#')) {
        const hexToRGB = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b, };
        }

        busyColor = hexToRGB(props.color);
    }

    const color = busyColor ? `rgba(${busyColor.r},${busyColor.g},${busyColor.b},0.6)` : props.color;
    return { backgroundColor: color }
})

const tag = computed(() => {
    if (props.to) return 'router-link'
    if (props.href) return 'a'

    return 'button'
})

const componentProps = computed(() => {
    if (props.to) return { to: props.to }
    if (props.href) return { href: props.href, target: '_blank' }
    return { type: props.type }
})

const textColor = computed(() => {
    const txtColor = props.color === 'white' ? 'black' : 'white'

    return {
        color: txtColor
    }
})
</script>

<style scoped>
.btn {
    display: inline-block;
    border: 2px solid black;
    border-radius: 10px;

    max-width: 300px;
    max-height: 60px;
    min-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;

    text-decoration: none;
    color: inherit;

    cursor: pointer;
    transition: transform 0.1s ease-in-out;
}

.loader {
    width: 50px;
    display: block;
    max-width: 70px;
    max-height: 50px;
    aspect-ratio: 1;
    border-radius: 90%;
    background: black;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}

.loader-container {
    width: 100%;
    height: 100%;
    min-height: 30px;
    padding: 5px 30px;
    box-sizing: border-box;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}


button.btn {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.btn-content {
    gap: 7px;
    padding: 5px 15px;
}

.btn:hover {
    cursor: pointer;
    transform: scale(0.98);
}
</style>