const Diario = require('../models/Gasto');
const Tipo = require('../models/Tipogastos');

var mongoose = require('mongoose')
// agrega un nuevo cliente
exports.nuevoDiario = async (req, res, next) => {
    const diario = new Diario(req.body);

    try {

        
        // almacenar el registro
        await diario.save();
        res.json({ mensaje : 'Se agrego un nuevo registro' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
}


exports.mostrarDiario = async (req, res, next) => {
    console.log("paso por aca");
    
    const diario = await  Diario.findById(req.params.idIng);
    console.log("muestrame");
    console.log(diario);
    
    
    if(!diario) {
        res.json({mensaje : 'Ese diario no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(diario);
}



exports.listarDiarios=async(req,res,next)=>
{

    try {
        const diario = await Diario.find({});
        
    //const diario = await Diario.findById({_id});

        diario.forEach(prueba=>
            {

                var fechaInicial =new Date(prueba.fecha)
                
                let menoscuatrohoras=1000*60*60*4;
                let suma=fechaInicial.getTime()-menoscuatrohoras
                let fechaFinal=new Date(suma) 


                diario.fecha=fechaFinal;

            });
        



        
        res.json(diario);
    } catch (error) {
        console.log(error);
        next();
    }


}


exports.listarDiariosporId=async(req,res,next)=>
{
    
   

    try {
        //const diario = await Diario.find({});     console.log('req'+req);
           

    const diario = await Diario.find({usuario:`${req.params.idUsuario}`});

        diario.forEach(prueba=>
            {

                var fechaInicial =new Date(prueba.fecha)
                
                let menoscuatrohoras=1000*60*60*4;
                let suma=fechaInicial.getTime()-menoscuatrohoras
                let fechaFinal=new Date(suma) 


                diario.fecha=fechaFinal;

            });
        



        
        res.json(diario);
    } catch (error) {
        console.log(error);
        next();
    }


}
exports.listarDiariosfecha=async(req,res,next)=>
{

    var start = new Date();
    

    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(19,59,59,999);
    

    try {
        const diario = await Diario.find({"fecha" : { $gte : "2020-05-28T00:00:00.000Z" ,$lte:end}});
        res.json(diario);
    } catch (error) {
        console.log(error);
        next();
    }


}



exports.actualizarDiario = async (req, res, next) => {
    try {
        const diario = await Diario.findOneAndUpdate({ _id : req.params.idIng }, req.body, {
            new : true
        });
        res.json(diario);
    } catch (error) {
        res.send(error);
        next();
    }
}


exports.eliminarDiario = async (req, res, next) => {
    try {
        await Diario.findOneAndDelete({_id : req.params.idIng});
        res.json({mensaje : 'El diario se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.gastosTotales=function(req,res,next)
{
   
    
    var prueba=mongoose.Types.ObjectId('5ee16faebda38c3fd5df67d0');
    
        Diario.aggregate([
            {$match: {"usuario" :prueba }},{$group:{
            _id: null,   
            totalAmount: { $sum: "$monto" }  }
        
          }],function( err, data ) {

            if ( err )
              throw err;
        
            console.log( JSON.stringify( data, undefined, 2 ) );
         
            res.json( data );
          })

    //const diario = await Diario.findById({_id});
        
        }  


        //Ingreso  Por mes 
exports.gastosTotalesMes=function(req,res,next)
{
    
    var prueba=mongoose.Types.ObjectId('5ee16faebda38c3fd5df67d0');
    
        Diario.aggregate([
            {$match: {"usuario" :prueba }},{$group:{
           // _id:{ $substr: ['$fecha', 5, 2]},   
          // "_id":{"$arrayElemAt":[{"$split":["$fecha","-"]},1]},
          "_id": { "$month": { "$toDate": "$fecha" }},
         
           totalAmount: { $sum: "$monto" },
            }
        
          },{ $sort : {fecha :1} }],function( err, data ) {

            if ( err )
              throw err;
        
            console.log( JSON.stringify( data, undefined, 2 ) );
         
            res.json( data );
          })

    //const diario = await Diario.findById({_id});
        
       
   


}



      //Ingreso  Por Tipo
      exports.gastosTotalesMes=function(req,res,next)
      {
          console.log("paso por aca");
          
          var prueba=mongoose.Types.ObjectId('5ee16faebda38c3fd5df67d0');
          
              Diario.aggregate([
                  {$match: {"usuario" :prueba }},{$group:{
                 // _id:{ $substr: ['$fecha', 5, 2]},   
                // "_id":{"$arrayElemAt":[{"$split":["$fecha","-"]},1]},
                "_id": { "$month": { "$toDate": "$fecha" }},
                 totalAmount: { $sum: "$monto" },
                  }
              
                }],function( err, data ) {
      
                  if ( err )
                    throw err;
              
                  console.log( JSON.stringify( data, undefined, 2 ) );
               
                  res.json( data );
                })
      
          //const diario = await Diario.findById({_id});
              
             
         
      
      
      }
   
exports.gastoportipo=function(req,res,next)
{

    console.log("paso por aca");
    console.log(Tipo.collection.name);
    
    var bd=Tipo.collection.name
    var prueba=mongoose.Types.ObjectId('5ee16faebda38c3fd5df67d0');
    
        Diario.aggregate([
            {"$group" : {"_id":"$tipo", "quantity":{"$sum":"$monto"}}}, 

        
        


        ],function( err, data ) {

            if ( err )
              throw err;
        
            console.log( JSON.stringify( data, undefined, 2 ) );
         
            res.json( data );
          })


}