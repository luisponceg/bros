const express = require('express');
const { body } = require('express-validator');
const router = express.Router();


const pool = require('../database');
const {isLoggedIn} =require ('../lib/auth');

router.get('/add',isLoggedIn,(req,res) => {
    res.render('links/add');

});
router.post('/add',isLoggedIn, (req,res) =>{ // <- La función middleware ya no es async
    const {title, url, description } = req.body;
    const newLink={
        title,
        url,
        description,
        user_id: req.user.id
        //ALMACENA ESOS DATOS EN LA VARIABLE NEWLINK
    };
    pool.query('INSERT INTO links set ?',[newLink], (error) => { // <- usamos una función callback
        if(error) { // <- Si ocurre un error en la consulta
            console.log(error); // <- mostramos error por consola
            return res.status(500).send('error'); // <- enviamos mensaje al cliente
        }
        // ...
        // hacemos algo con los resultados (si lo necesitamos)
        // ...
        // return res.status(200).send('recibido'); // <- enviamos mensaje al cliente
        req.flash('success','Enlace creado');
        res.redirect('/links');
    });
});
router.get('/',isLoggedIn,(req,res)=>{
    pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id], function (error, results, fields) {
        if (error) throw error;    
        const links = results; 
     
          res.render('links/list.hbs',{"links" : links});
    
      });
 });

router.get('/delete/:id',isLoggedIn,(req,res)=>{
   const { id } = req.params;
   pool.query('DELETE FROM links WHERE ID = ?',[id],  function (error, results, fields) {
    if(error) { // <- Si ocurre un error en la consulta
        console.log(error); // <- mostramos error por consola
        return res.status(500).send('error'); // <- enviamos mensaje al cliente
    }
    req.flash('success','Enlace eliminado');
    res.redirect('/links');
  });
});

router.get('/edit/:id',isLoggedIn,(req,res)=> {
    const { id } = req.params;
    pool.query('SELECT * FROM links WHERE ID  = ? ',[id],  function (error, results, fields) {
        if (error) throw error;    
        const links = results; 
   
    
        res.render('links/edit.hbs',{"link" : links[0]});
    
    });
router.post('/edit/:id',isLoggedIn,(req,res)=>{
    const { id } = req.params;
    const {title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    console.log(newLink);
    pool.query('UPDATE links SET ? WHERE ID  = ? ',[newLink , id],  function (error, results, fields) {
        if (error) throw error;    
        const links = results;                 
    });
    req.flash('success','Enlace editado');
    res.redirect('/links');
})
  
});



module.exports = router;