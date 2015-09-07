interface Results {
  [answerId: number]: number
}

type ResultUpdates = [number, number]

type Row = [string, number]

@component('marklogic-results')
class ResultsComponent extends polymer.Base {
  @property({
    notify: true,
    readonly: true,
    type: Array
  })
  rows: [number[]]

  @property({
    notify: true,
    readonly: true,
    type: Array
  })
  columns: string[]

  formattedAnswers: FormattedAnswer[]

  @property({
    type: Object
  })
  results: Results

  @property({
    type: Object
  })
  resultUpdates: ResultUpdates

  @property({
    type: Array
  })
  answers: Answer[]

  @observe('results')
  onResults() {
    if (this.results && this.formattedAnswers) {
      let rows: number[] = []
      let self = this
      this.formattedAnswers.forEach(function(formattedAnswer) {
        let result = self.results[formattedAnswer.id]
        rows.push(result || 0)
      })
      this.set('rows', [rows])
    }
  }

  @observe('resultUpdates')
  onResultUpdates() {
    if (this.results) {
      this.results[this.resultUpdates[0]] = this.resultUpdates[1]
      this.onResults()
    }
  }

  @observe('answers')
  onAnswers() {
    this.formattedAnswers = formatAnswers(this.answers)
    this.columns = this.formattedAnswers.map(function(formattedAnswer) {
      return formattedAnswer.title
    })
    this.set('columns', this.columns)
  }

  ready() {
  }

  detatched() {
  }
}

ResultsComponent.register();
