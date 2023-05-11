"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_oauth2_1 = __importStar(require("passport-oauth2"));
var uid2_1 = __importDefault(require("uid2"));
var profile_1 = __importDefault(require("./profile"));
var providerURL = "https://daldal.so";
var setupOptions = function (options) {
    options.authorizationURL =
        options.authorizationURL || providerURL + "/oauth/authorize";
    options.tokenURL = options.tokenURL || providerURL + "/oauth/token";
    options.state = uid2_1.default(24);
    return options;
};
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    function Strategy(options, verify) {
        var _this = _super.call(this, setupOptions(options), verify) || this;
        _this.name = "daldalso";
        _this._oauth2.setAccessTokenName("access_token");
        _this._oauth2.useAuthorizationHeaderforGET(true);
        return _this;
    }
    Strategy.prototype.userProfile = function (accessToken, done) {
        this._oauth2.get(providerURL + "/oauth/api/me", accessToken, function (err, body, res) {
            if (err) {
                return done(new passport_oauth2_1.InternalOAuthError("Failed to fetch user profile", err));
            }
            var _body = body ? body.toString() : "";
            try {
                body = JSON.parse(_body);
            }
            catch (err) {
                return done(new passport_oauth2_1.InternalOAuthError("Failed to parse API response", err));
            }
            if (!body) {
                return done(new Error("Empty API Response"));
            }
            var profile = profile_1.default(body);
            profile._raw = _body;
            profile._json = JSON.parse(_body);
            done(null, profile);
        });
    };
    return Strategy;
}(passport_oauth2_1.default));
exports.default = Strategy;
module.exports = Strategy;
