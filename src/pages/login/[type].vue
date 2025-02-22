<template>
    <div class="h-dvh w-dvw">

    </div>
</template>

<script setup lang="ts">
const { signIn, status } = useAuth()
const route = useRoute()

onMounted(async() => {
    if (status.value === 'authenticated') {
        //send message close to parent
        await window.opener.postMessage('close', '*')
        window.close()
    }else{
        if (typeof route.params.type === 'string') {
            await signIn(route.params.type)
            await window.opener.postMessage('close', '*')
        }
    }
})

</script>