var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var generateId = require('../utils/generateId');


var Product = require('../models/Product');

router.use(function(req,res,next){
	next();
});

router.get('/',function(req,res){
	res.json({ message:'Bienvenido al ejercicio CRUD con NodeJS'});
});

//new product
router.post('/product',function(req,res){
    var newProduct = new Product();

    newProduct.code = generateId.generateUniqueID();
    newProduct.name = req.body.name;
    newProduct.weight = req.body.weight;
    newProduct.price = req.body.price;
	
    //save product
	newProduct.save(function(err){
		if(err)
			res.send(err);

		res.json({message:'El producto fue añadido exitosamente'});
	});
	
});

//get all product
router.get('/product',function(req,res){
	Product.find(function(err,products){
		if(err)
			res.send(err);
		
		res.json(products);
	});
});

//delete product by code
router.delete('/product/:code',function(req,res){
	Product.remove({'code':req.params.code},function(err){
		if(err)
			res.end(err);
		
		res.json({ message:'el producto con el código '+req.params.code+" se ha eliminado con exito" });
	});
});

//get product by code
router.get('/product/:code',function(req,res){
	Product.findOne({'code':req.params.code},function(err,product){
		if(err)
			res.send(err);
		res.json(product);
	});
});

//Edit product by code
router.put('/product/:code',function(req,res){
	Product.findOne({'code':req.params.code},function(err,product){
		if(err)
			res.send(err);
        
            if(req.body.name)
            {
                product.name = req.body.name;
            }

            if(req.body.weight)
            {
                product.weight = req.body.weight;
            }

            if(req.body.price)
            {
                product.price = req.body.price;
            }
		product.save(function(err){
			if(err)
				res.send(err);
			
			res.json(product);
		});
	});
});



module.exports = router;