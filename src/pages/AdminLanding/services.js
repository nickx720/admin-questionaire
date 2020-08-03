
const postQuestion = (submitQuestion) => {
    const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitQuestion)
    }
    //https://run.mocky.io/v3/30bb7028-09ea-411b-8c52-4294deffcba4
    return fetch('/api/v1/question-answer-metadata', requestOptions)
        .then(response => response.json())
}


export { postQuestion }