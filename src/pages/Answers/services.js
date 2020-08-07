
const getQuestion = () => {
    // https://run.mocky.io/v3/30bb7028-09ea-411b-8c52-4294deffcba4
    return fetch("/api/v1/question-answer-metadata").then(response => response.json())
}
const postAnswer = answer => {
    const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer)
    }
    //https://run.mocky.io/v3/da6c7b86-75cb-4515-b0b2-9e46b895585e
    return fetch('/api/v1/answer', requestOptions)
        .then(response => response.json())
}

export { getQuestion, postAnswer }