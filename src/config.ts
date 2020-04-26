export default {
  host: {
    url: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
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
