interface Answer {
  id: number
  values: {
    symbol: string
    value: boolean
  }[]
}

interface FormattedAnswer {
  title: string, id: number
}

function formatAnswers(answers: Answer[]) {
  return answers.map(function(answer) {
    return <FormattedAnswer>{
      id: answer.id, title: answer.values.reduce(function(previousValue, currentValue) {
        return previousValue + (previousValue === '' ? '' : ' and ') + currentValue.symbol + ' is ' + (currentValue.value ? 'true' : 'false')
      }, '')
    }
  })
}
