const express = require('express');
const { body } = require('express-validator');
const router = express.Router();


const pool = require('../database');

router.get('/add',(req,res) => {
    res.render('links/add');

});
router.post('/add', (req,res) =>{ // <- La función middleware ya no es async
    const {title, url, description } = req.body;
    const newLink={
        title,
        url,
        description
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
        req.flash('SUCCESS','Enlace creado');
        res.redirect('/links');
    });
});
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM links',  function (error, results, fields) {
        if (error) throw error;    
        const links = results; 
     
          res.render('links/list.hbs',{"links" : links});
    
      });
 });

router.get('/delete/:id',(req,res)=>{
   const { id } = req.params;
   pool.query('DELETE FROM links WHERE ID = ?',[id],  function (error, results, fields) {
    if(error) { // <- Si ocurre un error en la consulta
        console.log(error); // <- mostramos error por consola
        return res.status(500).send('error'); // <- enviamos mensaje al cliente
    }
    req.flash('SUCCESS','Enlace eliminado');
    res.redirect('/links');
  });
});

router.get('/edit/:id',(req,res)=> {
    const { id } = req.params;
    pool.query('SELECT * FROM links WHERE ID  = ? ',[id],  function (error, results, fields) {
        if (error) throw error;    
        const links = results; 
   
    
        res.render('links/edit.hbs',{"link" : links[0]});
    
    });
router.post('/edit/:id',(req,res)=>{
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
    req.flash('SUCCESS','Enlace editado');
    res.redirect('/links');
})
  
});



module.exports = router;