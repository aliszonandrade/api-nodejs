const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTsecret = "maoehihisecretpassword";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth(req, res, next){//middleware
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token,JWTsecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err: "Token inválido!"});
            }else{
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email};                
                next();
            }
        })
    }else{
        res.status(401);
        res.json({err: "Token inválido!"});
    }

}

var DB = {
    games: [
        {
            id:12,
            title: "Call of duty",
            year: 2012,
            price: 30
        },
        {
            id:13,
            title: "Habbo Hotel",
            year: 2004,
            price: 2
        },
        {
            id:14,
            title: "Minecraft",
            year: 2009,
            price: 100
        }
    ],
    users: [
        {
            id: 1,
            name: "Alisson Andrade",
            email: "alisson@outlook.com",
            password: "alisson"
        },
        {
            id: 23,
            name: "Ualisson Andrade",
            email: "ualisson@outlook.com",
            password: "ualisson"
        }
    ]
}

app.get("/games", auth, (req,res) => {
    res.statusCode = 200;
    res.json({user: req.loggedUser, games: DB.games});
});

app.get("/game/:id", (req,res) => {
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else
            res.sendStatus(404);
    }


});

app.post("/game", (req, res) => {
    var { title, price, year } = req.body;

    DB.games.push({
        id: 15,
        title,
        price,
        year
    });

    res.sendStatus(200);

});

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1)
            res.sendStatus(404);
        else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }      
    }
});

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            var {title, price, year} = req.body;

            if(title != undefined)
                game.title = title;
            if(price != undefined)
                game.price = price;
            if(year != undefined)
                game.year = year;

            res.sendStatus(200);
        }
        else
            res.sendStatus(404);   
    }
});

app.post("/auth", (req, res) => {
    var { email, password } = req.body;

    if(email != undefined){
        var user = DB.users.find(u => u.email == email);

        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id, email: user.email},JWTsecret,{expiresIn:'4h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas"});
            }

        }else{
            res.status(404);
            res.json({ err: "Email enviado não existe na base de dados"});
        }
    }else{
        res.status(400);
        res.json({ err: "E-mail enviado é inválido"});
    }

});

app.listen(8080, () => {
    console.log("Api rodando");
});