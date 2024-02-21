let background = document.createElement('div')
let startButton = document.getElementById('start')
let answers = ['It is certain', 'Reply hazy, try again', 'Don’t count on it', 'It is decidedly so', 'Ask again later', 'My reply is no', 'Without a doubt', 'Better not tell you now', 'My sources say no', 'Yes definitely', 'Cannot predict now', 'Outlook not so good', 'You may rely on it', 'Concentrate and ask again', 'Very doubtful', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes']
startButton.addEventListener('click', createGamePage)
let Page2 = document.createElement('div')
let questionsAndAnswers = [];
let returnArray = []
let indexCheck = false;

function createGamePage() {
    Page2 = document.createElement('div')
    document.body.appendChild(Page2)
    Page2.classList.add('screen')
    Page2.setAttribute('id', 'page2')
    Page2.classList.remove('invisible')
    let ball = document.createElement('div')
    ball.classList.add('ball')
    ball.setAttribute('id', 'ball')
    Page2.appendChild(ball)
    let scene = document.createElement('div')
    scene.classList.add('scene')
    let whiteSurface = document.createElement('div')
    whiteSurface.classList.add('whiteSurface')
    whiteSurface.setAttribute('id', 'whiteSurface')
    ball.appendChild(scene)
    ball.appendChild(whiteSurface)
    let form = document.createElement('form')
    form.setAttribute('id', 'form')
    let label = document.createElement('label')
    let labelText = document.createTextNode('Ask the ball a question')
    label.appendChild(labelText)
    label.setAttribute('for', 'questionInput')
    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'formInput')
    let submit = document.createElement('input')
    submit.setAttribute('id', 'submit')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Ask')
    form.addEventListener('submit', (ev) => { ballAnswer(ev, input, returnArray) })
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(submit)
    Page2.appendChild(form)
    let quitButton = document.createElement('button')
    quitButton.setAttribute('id', 'quitButton')
    const quitButtonText = document.createTextNode('Click to Surrender')
    quitButton.appendChild(quitButtonText)
    quitButton.addEventListener('click', returnToHomescreen)
    Page2.appendChild(quitButton)
    document.getElementById('background').remove()
}

function returnToHomescreen() {
    background = document.createElement('div')
    document.body.appendChild(background)
    background.classList.add('background')
    background.setAttribute('id', 'background')
    let title = document.createElement('h1')
    title.setAttribute('id', 'title')
    let titleText = document.createTextNode('Magic Eight Ball')
    title.appendChild(titleText)
    background.appendChild(title)
    startButton = document.createElement('button')
    startButton.classList.add('startButton')
    startButton.setAttribute('id', 'start')
    let startButtonText = document.createTextNode('Test your luck...')
    startButton.appendChild(startButtonText)
    startButton.addEventListener('click', createGamePage)
    background.appendChild(startButton)
    Page2.remove()
}

function ballAnswer(ev, input, returnArray) {
    ev.preventDefault()
    if (input.value == '') {
        alert('No question was typed. Please type an answer.')
        return;
    }
    if (document.getElementById('answer') !== null) {
        document.getElementById('answer').remove()
    }
    let response = answers[Math.floor(Math.random() * (answers.length - 1))];
    let responseTextElement = document.createElement('h2')
    responseTextElement.setAttribute('id', 'answer')
    let responseText = document.createTextNode(`${response}`)
    responseTextElement.appendChild(responseText)
    document.getElementById('whiteSurface').appendChild(responseTextElement)
    questionsAndAnswers.push(input.value)
    questionsAndAnswers.push(responseText.textContent)
    let lastQuestion = questionsAndAnswers.length - 2
    returnArray = [input, responseTextElement, responseText, questionsAndAnswers, lastQuestion]
    //console.log(lastQuestion)
    //console.log(returnArray)
    // console.log(questionsAndAnswers.length)
    if (questionsAndAnswers.length == 2) {
        console.log('first')
        input.addEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
    }
    else {
        console.log('subsequent')
        console.log(input)
        input.removeEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
        // input.addEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
    }
    // return returnArray;
}

function oldQuestions(ev, returnArray) {
    //console.log(lastQuestion)
    if (ev.key == 'ArrowDown') {
        let input = returnArray[0]
        let responseTextElement = returnArray[1]
        let responseText = returnArray[2]
        let questionsAndAnswers = returnArray[3]
        let lastQuestion = ((questionsAndAnswers.length) - 2)
        //console.log(returnArray)
        //console.log(lastQuestion)
        if (lastQuestion == (questionsAndAnswers.length - 2)) {
            console.log('arrowDownFirstTime')
            input.value = questionsAndAnswers[lastQuestion]
            responseText.textContent = questionsAndAnswers[lastQuestion + 1]
            responseTextElement.appendChild(responseText)
            let returnArray = [input, responseTextElement, responseText, questionsAndAnswers, lastQuestion]
            indexCheck = true;
            //  input.removeEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
            //   input.addEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
        }
        else if (lastQuestion === 0) {
            console.log(lastQuestion)
            alert('There were no prior questions.')
            return;
        }
        else {
            console.log('nice')
            lastQuestion -= 2
            input.value = questionsAndAnswers[lastQuestion]
            responseText.textContent = questionsAndAnswers[lastQuestion + 1]
            console.log(lastQuestion)
            responseTextElement.appendChild(responseText)
            let returnArray = [input, responseTextElement, responseText, questionsAndAnswers, lastQuestion]
            //  input.removeEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
            //  input.addEventListener('keydown', (ev) => { oldQuestions(ev, returnArray) })
        }
    }

    if (ev.key == 'ArrowUp') {
        let input = returnArray[0]
        let responseTextElement = returnArray[1]
        let responseText = returnArray[2]
        let questionsAndAnswers = returnArray[3]
        let lastQuestion = ((questionsAndAnswers.length) - 2)
        if (lastQuestion == (questionsAndAnswers.length - 2)) {
            alert('there are no further questions since this was the last one you asked.')
            return;
        }
        lastQuestion += 2
        input.value = questionsAndAnswers[lastQuestion]
        responseText.textContent = questionsAndAnswers[lastQuestion + 1]
        responseTextElement.appendChild(responseText)
    }

}