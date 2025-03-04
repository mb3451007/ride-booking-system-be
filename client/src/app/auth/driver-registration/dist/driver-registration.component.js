"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DriverRegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var common_1 = require("@angular/common");
var bootstrap = require("bootstrap");
var http_1 = require("@angular/common/http");
var DriverRegisterComponent = /** @class */ (function () {
    function DriverRegisterComponent(fb, authService, router, stripeService) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.stripeService = stripeService;
        this.step = 1;
        this.message = '';
        this.isError = false;
        this.stripeLoaded = false;
        this.step1Form = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            consent: [false, forms_1.Validators.requiredTrue]
        });
        this.step2Form = this.fb.group({
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            phone: [''],
            company: [''],
            address: [''],
            subscription: ['monthly', forms_1.Validators.required],
            cardNumber: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]{13,19}$')]],
            expirationDate: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
            cvc: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]{3,4}$')]],
            dataConsent: [false, forms_1.Validators.requiredTrue],
            terms: [false, forms_1.Validators.requiredTrue]
        });
    }
    DriverRegisterComponent.prototype.ngOnInit = function () {
        this.loadStripe();
    };
    DriverRegisterComponent.prototype.ngAfterViewInit = function () {
        this.initializeStripeElements();
    };
    DriverRegisterComponent.prototype.loadStripe = function () {
        return __awaiter(this, void 0, Promise, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.stripeLoaded) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loadStripeScript()];
                    case 2:
                        _a.sent();
                        this.stripe = Stripe('pk_test_51N2zfiBHAK3VyaqUHLxCAue1ZffFof5jE4X4lRfxvBqffzikRlcQTxj3Lrb3zbVgkmHSob3i2hidx0aQEP153HTM00rJFnDGJo');
                        this.stripeLoaded = true;
                        this.initializeStripeElements();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error loading Stripe:', error_1);
                        this.showMessage('Failed to load payment system. Please try again later.', true);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DriverRegisterComponent.prototype.loadStripeScript = function () {
        return new Promise(function (resolve, reject) {
            if (typeof Stripe !== 'undefined') {
                resolve();
                return;
            }
            var script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = function () { return resolve(); };
            script.onerror = function () { return reject(new Error('Failed to load Stripe script')); };
            document.head.appendChild(script);
        });
    };
    DriverRegisterComponent.prototype.initializeStripeElements = function () {
        var _this = this;
        if (!this.stripe || !document.getElementById('card-element')) {
            return;
        }
        var elements = this.stripe.elements();
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        this.card = elements.create('card', {
            style: style,
            hidePostalCode: true
        });
        this.card.mount('#card-element');
        this.card.on('change', function (event) {
            if (event.error) {
                _this.showMessage(event.error.message, true);
            }
        });
    };
    DriverRegisterComponent.prototype.nextStep = function () {
        this.step1Form.markAllAsTouched();
        if (this.step === 1 && this.step1Form.valid) {
            this.step = 2;
        }
    };
    DriverRegisterComponent.prototype.prevStep = function () {
        this.step = 1;
    };
    DriverRegisterComponent.prototype.submitForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, paymentMethod_1, pmError, amount, currency, error_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.step1Form.markAllAsTouched();
                        this.step2Form.markAllAsTouched();
                        if (!this.step1Form.valid || !this.step2Form.valid || !this.stripe || !this.card) {
                            this.showMessage('Please complete all required fields correctly.', true);
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.stripe.createPaymentMethod({
                                type: 'card',
                                card: this.card,
                                billing_details: {
                                    name: this.step2Form.value.firstName + " " + this.step2Form.value.lastName,
                                    email: this.step1Form.value.email,
                                    phone: this.step2Form.value.phone
                                }
                            })];
                    case 2:
                        _a = _b.sent(), paymentMethod_1 = _a.paymentMethod, pmError = _a.error;
                        if (pmError) {
                            this.showMessage(pmError.message, true);
                            return [2 /*return*/];
                        }
                        amount = this.step2Form.value.subscription === 'monthly' ? 3900 : 32700;
                        currency = 'usd';
                        // Create payment intent
                        this.stripeService.createPaymentIntent(amount, currency).subscribe({
                            next: function (paymentIntent) { return __awaiter(_this, void 0, void 0, function () {
                                var confirmError, formData, error_3;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.stripe.confirmCardPayment(paymentIntent.client_secret, // Using client_secret as per backend response
                                                {
                                                    payment_method: paymentMethod_1.id
                                                })];
                                        case 1:
                                            confirmError = (_a.sent()).error;
                                            if (confirmError) {
                                                this.showMessage(confirmError.message, true);
                                                return [2 /*return*/];
                                            }
                                            formData = __assign(__assign(__assign({}, this.step1Form.value), this.step2Form.value), { paymentMethodId: paymentMethod_1.id });
                                            this.authService.register(formData).subscribe({
                                                next: function (response) {
                                                    _this.showMessage('Registration successful! Redirecting to login...', false);
                                                    setTimeout(function () {
                                                        _this.router.navigate(['/login']).then(function () {
                                                            window.location.reload();
                                                        });
                                                    }, 1000);
                                                },
                                                error: function (regError) {
                                                    _this.showMessage('Registration failed: ' + (regError.message || 'Unknown error'), true);
                                                }
                                            });
                                            return [3 /*break*/, 3];
                                        case 2:
                                            error_3 = _a.sent();
                                            this.showMessage('Payment confirmation failed.', true);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function (intentError) {
                                _this.showMessage('Failed to create payment intent: ' + (intentError.message || 'Unknown error'), true);
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        this.showMessage('Payment processing error occurred.', true);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DriverRegisterComponent.prototype.validateNumberInput = function (event) {
        if (!/[0-9]/.test(event.key) && event.key !== '-') {
            event.preventDefault();
        }
    };
    DriverRegisterComponent.prototype.showMessage = function (message, isError) {
        this.message = message;
        this.isError = isError;
        var modalElement = document.getElementById('messageModal');
        if (modalElement) {
            var modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    };
    DriverRegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-driver-register',
            standalone: true,
            imports: [common_1.CommonModule, forms_2.ReactiveFormsModule, http_1.HttpClientModule],
            templateUrl: './driver-registration.component.html',
            styleUrls: ['./driver-registration.component.css']
        })
    ], DriverRegisterComponent);
    return DriverRegisterComponent;
}());
exports.DriverRegisterComponent = DriverRegisterComponent;
