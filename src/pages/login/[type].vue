<template>
    <div class="h-dvh w-dvw">

    </div>
</template>

<script setup lang="ts">
const { signIn, status } = useNativeAuth()
const route = useRoute()

onMounted(async() => {
    if (status.value === 'authenticated') {
        //send message close to parent
        await window.opener.postMessage('close', '*')
        window.close()
    }else{
        if (typeof route.params.type === 'string') {
            switch (route.params.type) {
                case 'github':
                    await signIn('github')
                    break;
                case 'facebook':
                    await signIn('facebook')
                    break;
                case 'google':
                    await signIn('google')
                    break;
                case 'azure-ad':
                    await signIn('azure-ad')
                    break;
                default:
                    break;
            }
            await window.opener.postMessage('close', '*')
        }
    }
})

</script>