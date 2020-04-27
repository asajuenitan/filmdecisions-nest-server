"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    host: {
        url: process.env.HOST || 'http://filmdecisions.com/ang',
        port: process.env.PORT || '',
    },
    jwt: {
        secretOrKey: 'projectOneFilmDecions',
        expiresIn: 36000,
    },
    mail: {
        host: 'mail.filmdecisions.com',
        port: 465,
        secure: true,
        user: 'donotreply@filmdecisions.com',
        pass: 'b()G=W3{&IIu',
    },
};
//# sourceMappingURL=config.js.map