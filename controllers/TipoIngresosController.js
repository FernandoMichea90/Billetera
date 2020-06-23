const Diario = require('../models/TipoIngresos');
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
    
    const diario = await  Diario.findById(req.params.idTip);
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
        const diario = await Diario.findOneAndUpdate({ _id : req.params.idTip }, req.body, {
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
        await Diario.findOneAndDelete({_id : req.params.idTip});
        res.json({mensaje : 'El diario se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}