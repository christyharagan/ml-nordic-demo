// TODO: Quick hack to prevent pulling in server components... but figure out a better way of doing this
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var StatementKind;
(function (StatementKind) {
    StatementKind[StatementKind["PROPOSITION"] = 0] = "PROPOSITION";
    StatementKind[StatementKind["NEGATION"] = 1] = "NEGATION";
    StatementKind[StatementKind["AND"] = 2] = "AND";
    StatementKind[StatementKind["OR"] = 3] = "OR";
    StatementKind[StatementKind["IMPLIES"] = 4] = "IMPLIES";
})(StatementKind || (StatementKind = {}));
var PlayComponent = (function (_super) {
    __extends(PlayComponent, _super);
    function PlayComponent() {
        _super.apply(this, arguments);
        this.answeredIncorrectly = false;
        this.answeredCorrectly = false;
        this.hasAnswered = false;
    }
    PlayComponent.prototype.onAnswers = function () {
        this.set('formattedAnswers', formatAnswers(this.answers));
    };
    PlayComponent.prototype.onPremises = function () {
        function formatStatement(statement) {
            switch (statement.kind) {
                case StatementKind.PROPOSITION:
                    return statement.proposition;
                case StatementKind.NEGATION:
                    return '! (' + formatStatement(statement.a) + ')';
                case StatementKind.AND:
                    return formatStatement(statement.a) + ' & ' + formatStatement(statement.b);
                case StatementKind.OR:
                    return formatStatement(statement.a) + ' | ' + formatStatement(statement.b);
                case StatementKind.IMPLIES:
                    return formatStatement(statement.a) + ' => ' + formatStatement(statement.b);
            }
        }
        this.set('formattedPremises', this.premises.map(formatStatement));
    };
    PlayComponent.prototype.onIsCorrect = function () {
        if (this.isCorrect) {
            this.set('answeredCorrectly', true);
        }
        else {
            this.set('answeredIncorrectly', true);
        }
    };
    PlayComponent.prototype.submit = function () {
        this.set('hasAnswered', true);
        this.set('guess', [this.selectedAnswer.id]);
    };
    PlayComponent.prototype.ready = function () {
    };
    PlayComponent.prototype.detatched = function () {
    };
    __decorate([
        property()
    ], PlayComponent.prototype, "answers");
    __decorate([
        property()
    ], PlayComponent.prototype, "premises");
    __decorate([
        property({
            notify: true,
            readonly: true
        })
    ], PlayComponent.prototype, "formattedPremises");
    __decorate([
        property({
            notify: true,
            readonly: true
        })
    ], PlayComponent.prototype, "formattedAnswers");
    __decorate([
        property()
    ], PlayComponent.prototype, "selectedAnswer");
    __decorate([
        property()
    ], PlayComponent.prototype, "isCorrect");
    __decorate([
        property({
            notify: true,
            readonly: true,
            type: Array
        })
    ], PlayComponent.prototype, "guess");
    __decorate([
        property({
            notify: true,
            readonly: true
        })
    ], PlayComponent.prototype, "answeredIncorrectly");
    __decorate([
        property({
            notify: true,
            readonly: true
        })
    ], PlayComponent.prototype, "answeredCorrectly");
    __decorate([
        property({
            notify: true,
            readonly: true
        })
    ], PlayComponent.prototype, "hasAnswered");
    Object.defineProperty(PlayComponent.prototype, "onAnswers",
        __decorate([
            observe('answers')
        ], PlayComponent.prototype, "onAnswers", Object.getOwnPropertyDescriptor(PlayComponent.prototype, "onAnswers")));
    Object.defineProperty(PlayComponent.prototype, "onPremises",
        __decorate([
            observe('premises')
        ], PlayComponent.prototype, "onPremises", Object.getOwnPropertyDescriptor(PlayComponent.prototype, "onPremises")));
    Object.defineProperty(PlayComponent.prototype, "onIsCorrect",
        __decorate([
            observe('isCorrect')
        ], PlayComponent.prototype, "onIsCorrect", Object.getOwnPropertyDescriptor(PlayComponent.prototype, "onIsCorrect")));
    PlayComponent = __decorate([
        component('marklogic-play')
    ], PlayComponent);
    return PlayComponent;
})(polymer.Base);
PlayComponent.register();
