"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavBarComponent = void 0;
var core_1 = require("@angular/core");
var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(location) {
        this.location = location;
        this.elem = document.documentElement;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        $('#full-screen').css('display', 'block');
        $('#exit-full-screen').css('display', 'none');
    };
    NavBarComponent.prototype.clicked_fullscreen = function () {
        if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
            $('#full-screen').css('display', 'none');
            $('#exit-full-screen').css('display', 'block');
        }
    };
    NavBarComponent.prototype.clicked_exitfullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            $('#full-screen').css('display', 'block');
            $('#exit-full-screen').css('display', 'none');
        }
    };
    NavBarComponent.prototype.clicked_back = function () {
        this.location.back();
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-bar',
            templateUrl: './nav-bar.component.html',
            styleUrls: ['./nav-bar.component.css']
        })
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
