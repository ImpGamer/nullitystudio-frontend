<template>
    <div v-if="pagesBtns > 0" class="pager">
        <button @click="$emit('page-change', page - 1)"><</button>
        <button v-if="previousButtons">...</button>
        <button
        v-for="i in pagesBtns"
        :key="i"
        :class="{ active: page === btnDisplay(i) }"
        @click="$emit('page-change', btnDisplay(i))">
            {{ btnDisplay(i) }}
        </button>
        <button v-if="nextButtons">...</button>
        <button @click="$emit('page-change', page + 1)">></button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    page: number
    pagesBtns: number
    previousButtons: boolean
    nextButtons: boolean
    btnDisplay: (index: number) => number
}>()

defineEmits<{
    'page-change': [page: number]
}>()
</script>
