"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseProfile = function (profile) {
    var parsed = {
        provider: "daldalso",
        key: profile.key,
        id: profile.key ? profile.key.replace(/[^0-9]/gi, "") : "",
        displayName: profile.name || null,
        name: profile.name || null,
        account: profile.account || null,
        libra: profile.libra || null,
        foveon: profile.foveon || null,
        profile: profile.profile || null,
        _raw: "",
        _json: JSON.parse("{}"),
    };
    return parsed;
};
exports.default = ParseProfile;
