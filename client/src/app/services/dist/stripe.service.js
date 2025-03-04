"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StripeService = void 0;
var core_1 = require("@angular/core");
var StripeService = /** @class */ (function () {
    function StripeService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:5000/api/create-payment-intent'; // Adjust URL if needed
    }
    StripeService.prototype.createPaymentIntent = function (amount, currency) {
        return this.http.post(this.apiUrl, { amount: amount, currency: currency });
    };
    StripeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StripeService);
    return StripeService;
}());
exports.StripeService = StripeService;
