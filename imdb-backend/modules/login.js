const jwt = require('jsonwebtoken');
const basicAuth = require('basic-auth');
const LdapAuth = require('ldapauth-fork');

const ldap = new LdapAuth({
  url: 'ldap://localhost:389',
  bindDN: 'cn=admin,dc=imdb,dc=app,dc=org',
  bindCredentials: 'imdbapp',
  searchBase: 'ou=users,dc=imdb,dc=app,dc=org',
  searchFilter: '(uid={{username}})',
  reconnect: true
});

const JWT_SECRET = process.env.SECRET || 'imdbapp';

const tryLogin = function(req, res, next) {
    var credentials = basicAuth(req);
    if (!credentials) {
        resultLogin(req, res, next, false);
    }

    ldap.authenticate(credentials.name, credentials.pass, function(err, user) {
        let result = true;
        if (err) {
            result = false;
        }else{
            req.user = user;
        }
        resultLogin(req, res, next, result);
    });
}

const resultLogin = function(req,res, next, result){
    if(result){
        var token = jwt.sign({ id: req.user.uidNumber }, JWT_SECRET, {
            expiresIn: 600 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
    }else{
        res.status(500).send('Login inválido!');
    }    
}

const verifyJWT = function(req, res, next){
    var token = req.headers['Authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

module.exports = {
    tryLogin,
    verifyJWT
}