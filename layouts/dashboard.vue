<template>
    <div class="flex h-dvh max-w-full bg-[#FBFBFB] dark:bg-[#0F0F0F]">
        <div class="w-[72px]">
            <Sidebar :page_name="page_name"/>
        </div>
        <div class="flex-auto max-h-full px-16 pt-12" :class="show_modal ? 'overflow-hidden' : 'overflow-y-auto'">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    page_name: string
}>()

const {statusModal} = useModalControl()
const show_modal = statusModal()
</script>