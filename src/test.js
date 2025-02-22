
const data = async () => {
    const response = await fetch('http://localhost:3089/question/summit/10', {
        method: 'POST',
        headers: {
        'Content-Type': 'text/event-stream;charset=UTF-8',
        'Accept': 'text/event-stream',
        'Authorization': 'Bearer'
        },
        body: JSON.stringify({
            code:"print('AAA')",
            question_id: 11,
            language_id: 1
        })
    })
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        console.log('Received', value);
    }
}

data()