// my-server.js
import { handler } from './build/handler.js';
import express from 'express';
import LnurlAuth from "passport-lnurl-auth"
import passport from 'passport'
import session from 'express-session';
import {createUserIfNotExist} from "./backend.js"


const app = express();

app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

const config = {
	host: 'localhost',
	port: 3000,
	url: null,
};

if (!config.url) {
	config.url = 'http://' + config.host + ':' + config.port;
}

app.use(session({
	secret: '12345',
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const map = {
	user: new Map(),
};

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	done(null, map.user.get(id) || null);
});

passport.use(new LnurlAuth.Strategy(function(linkingPublicKey, done) {
	let user = map.user.get(linkingPublicKey);
	if (!user) {
		user = { id: linkingPublicKey };
		map.user.set(linkingPublicKey, user);
	}
	done(null, user);
}));

app.use(passport.authenticate('lnurl-auth'));


app.get('/login',
	function(req, res, next) {
		if (req.user) {
			createUserIfNotExist(req.user)
			// Already authenticated.
			return res.redirect('/');
		}
		next();
	},
	new LnurlAuth.Middleware({
		callbackUrl: "https://faea-182-218-133-97.jp.ngrok.io" + '/login',
        loginTemplateFilePath: './login-template.html',
		cancelUrl: config.url
	})
);

app.get("/user", 
function (req, res, next) {
	if (req.user) {
		res.send({user: req.user.id});
	}
    else{
        res.send({user: null})
    }
})

app.post('/logout',	 function(req, res, next){
	req.logout(function(err) {
	  if (err) { return next(err); }
	  res.redirect('/');
	});
  });
  

const server = app.listen(config.port, config.host, function() {
	console.log('Server listening at ' + config.url);
});

process.on('uncaughtException', error => {
	console.error(error);
});

process.on('beforeExit', code => {
	try {
		server.close();
	} catch (error) {
		console.error(error);
	}
	process.exit(code);
});


 app.use(handler);



app.listen(3000, () => {
  console.log('listening on port 3000');
});