export default async function (accessToken: string, email: any, provider: string) {

    const response = await fetch(useRuntimeConfig().apiBase + '/auth/oauth/'+ provider, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            provider: 'google',
            accessToken: accessToken,
            email: String(email)
        })
    });

    if (response.status == 200) {
        return response.json()
    }

    return false

}