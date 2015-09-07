// TODO: Quick hack to prevent pulling in server components... but figure out a better way of doing this

enum StatementKind {
  PROPOSITION,
  NEGATION,
  AND,
  OR,
  IMPLIES
}

interface Statement {
  kind: StatementKind
}

interface Proposition extends Statement {
  proposition: string
}

interface UnaryStatement extends Statement {
  a: Statement
}

interface BinaryStatement extends Statement {
  a: Statement
  b: Statement
}

@component('marklogic-play')
class PlayComponent extends polymer.Base {

  @property()
  answers: Answer[]

  @property()
  premises: Statement[]

  @property({
    notify: true,
    readonly: true
  })
  formattedPremises: string[]

  @property({
    notify: true,
    readonly: true
  })
  formattedAnswers: FormattedAnswer[]

  @property()
  selectedAnswer: FormattedAnswer

  @property()
  isCorrect: boolean

  @property({
    notify: true,
    readonly: true,
    type: Array
  })
  guess: [number]

  @property({
    notify: true,
    readonly: true
  })
  answeredIncorrectly = false

  @property({
    notify: true,
    readonly: true
  })
  answeredCorrectly = false

  @property({
    notify: true,
    readonly: true
  })
  hasAnswered = false

  @observe('answers')
  onAnswers() {
    this.set('formattedAnswers', formatAnswers(this.answers))
  }

  @observe('premises')
  onPremises() {
    function formatStatement(statement: Statement) {
      switch (statement.kind) {
        case StatementKind.PROPOSITION:
          return (<Proposition>statement).proposition
        case StatementKind.NEGATION:
          return '! (' + formatStatement((<UnaryStatement>statement).a) + ')'
        case StatementKind.AND:
          return formatStatement((<BinaryStatement>statement).a) + ' & ' + formatStatement((<BinaryStatement>statement).b)
        case StatementKind.OR:
          return formatStatement((<BinaryStatement>statement).a) + ' | ' + formatStatement((<BinaryStatement>statement).b)
        case StatementKind.IMPLIES:
          return formatStatement((<BinaryStatement>statement).a) + ' => ' + formatStatement((<BinaryStatement>statement).b)
      }
    }

    this.set('formattedPremises', this.premises.map(formatStatement))
  }

  @observe('isCorrect')
  onIsCorrect() {
    if (this.isCorrect) {
      this.set('answeredCorrectly', true)
    } else {
      this.set('answeredIncorrectly', true)
    }
  }

  submit() {
    this.set('hasAnswered', true)
    this.set('guess', [this.selectedAnswer.id])
  }

  ready() {
  }

  detatched() {
  }
}

PlayComponent.register();
