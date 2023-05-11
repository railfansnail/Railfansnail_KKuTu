import OAuth2Strategy, { VerifyFunction, StrategyOptions } from "passport-oauth2";
export default class Strategy extends OAuth2Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    userProfile(accessToken: string, done: (error: Error | null, profile?: any) => void): void;
}
