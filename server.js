const express = require("express");
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt"); 
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;
const prisma = new PrismaClient();
//const saltRounds = 10; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/register', async (req, res) => {
  
  const { email, username, password, photo } = req.body

  if (!email || !username || !password) {
    return res.status(400).send('Les champs email, username et password sont requis.');
  }

  try {

    const encprtPass =  await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password : encprtPass,
        photo
      }
    });
    console.log('Utilisateur enregistré avec succès:', user);
    res.status(200).send('Utilisateur enregistré avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur');
  }
});


  
  app.listen(port, () => {
    console.log(`Le serveur à demarré au port : ${port}`)
  })

  //app.METHOD(PATH, HANDLER)