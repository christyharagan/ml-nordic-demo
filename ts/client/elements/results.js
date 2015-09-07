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
var ResultsComponent = (function (_super) {
    __extends(ResultsComponent, _super);
    function ResultsComponent() {
        _super.apply(this, arguments);
    }
    ResultsComponent.prototype.onResults = function () {
        if (this.results && this.formattedAnswers) {
            var rows = [];
            var self_1 = this;
            this.formattedAnswers.forEach(function (formattedAnswer) {
                var result = self_1.results[formattedAnswer.id];
                rows.push(result || 0);
            });
            this.set('rows', [rows]);
        }
    };
    ResultsComponent.prototype.onResultUpdates = function () {
        if (this.results) {
            this.results[this.resultUpdates[0]] = this.resultUpdates[1];
            this.onResults();
        }
    };
    ResultsComponent.prototype.onAnswers = function () {
        this.formattedAnswers = formatAnswers(this.answers);
        this.columns = this.formattedAnswers.map(function (formattedAnswer) {
            return formattedAnswer.title;
        });
        this.set('columns', this.columns);
    };
    ResultsComponent.prototype.ready = function () {
    };
    ResultsComponent.prototype.detatched = function () {
    };
    __decorate([
        property({
            notify: true,
            readonly: true,
            type: Array
        })
    ], ResultsComponent.prototype, "rows");
    __decorate([
        property({
            notify: true,
            readonly: true,
            type: Array
        })
    ], ResultsComponent.prototype, "columns");
    __decorate([
        property({
            type: Object
        })
    ], ResultsComponent.prototype, "results");
    __decorate([
        property({
            type: Object
        })
    ], ResultsComponent.prototype, "resultUpdates");
    __decorate([
        property({
            type: Array
        })
    ], ResultsComponent.prototype, "answers");
    Object.defineProperty(ResultsComponent.prototype, "onResults",
        __decorate([
            observe('results')
        ], ResultsComponent.prototype, "onResults", Object.getOwnPropertyDescriptor(ResultsComponent.prototype, "onResults")));
    Object.defineProperty(ResultsComponent.prototype, "onResultUpdates",
        __decorate([
            observe('resultUpdates')
        ], ResultsComponent.prototype, "onResultUpdates", Object.getOwnPropertyDescriptor(ResultsComponent.prototype, "onResultUpdates")));
    Object.defineProperty(ResultsComponent.prototype, "onAnswers",
        __decorate([
            observe('answers')
        ], ResultsComponent.prototype, "onAnswers", Object.getOwnPropertyDescriptor(ResultsComponent.prototype, "onAnswers")));
    ResultsComponent = __decorate([
        component('marklogic-results')
    ], ResultsComponent);
    return ResultsComponent;
})(polymer.Base);
ResultsComponent.register();
