let currentQuestion = 0
let correctAnswers = 0

showQuestion()

document.querySelector('.scoreArea button').addEventListener('click', resetQuiz)

function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let pct = Math.floor((currentQuestion / questions.length) * 100)

    document.querySelector('.progress--bar').style.width = `${pct}%`

    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    document.querySelector('.question').innerHTML = q.question

    let optionsHtml = ''
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
    }
    document.querySelector('.options').innerHTML = optionsHtml

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    finishQuiz()
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++
  }

  currentQuestion++
  showQuestion()
}

function finishQuiz() {
  let score = Math.floor((correctAnswers / questions.length) * 100)

  if (score < 30) {
    document.querySelector('.scoreText1').innerHTML = 'Viiiiiixe!'
    document.querySelector('.scorePct').style.color = '#F00'
  } else if (score >= 30 && score < 70) {
    document.querySelector('.scoreText1').innerHTML = 'Bom!'
    document.querySelector('.scorePct').style.color = '#FF0'
  } else if (score >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
    document.querySelector('.scorePct').style.color = '#0A4'
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${score}%`
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`

  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.progress--bar').style.width = '100%'
}

function resetQuiz() {
  correctAnswers = 0
  currentQuestion = 0
  showQuestion()
}