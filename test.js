
const data = async () => {
    const response = await fetch('http://localhost:3089/question/summit', {
        method: 'GET',
        headers: {
        'Content-Type': 'text/event-stream'
        }
    })
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    console.log('Received', value);
    }
}

data()