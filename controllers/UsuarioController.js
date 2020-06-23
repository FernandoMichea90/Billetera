const Diario = require('../models/Usuario');
const jwt =require('jsonwebtoken')
const bcrypt=require('brcypt')



exports.nuevoUsuario = async (req, res, next) => {
   
    const diario = new Diario(req.body);
    diario.password=await bcrypt.hash(req.body.password,12)


    try {


        console.log(diario);
        
        // almacenar el registro
        await diario.save();
        res.json({ mensaje : 'Se agrego un nuevo registro' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
}

exports.autenticarUsuario=async(req,res,next)=>{
    console.log("paso por el Login ");
    
    const {correo,password}=req.body
console.log(correo);
try{
const usuario=await Diario.findOne({correo})
console.log("el usuario"+usuario);

if(!usuario)
{
    // si el usuario no existe
    await res.status(401).json({mensaje:"el usuario no existe"})
    next()
}else
{
        if(!bcrypt.compareSync(password,usuario.password))
        {
            // si el password es correcto

            console.log("estoy fuera "+password);
            console.log("estoy fuera "+usuario.password);

            
            await res.status(401).json({mensaje:'Password Incorrecto'})
            next()

        }else
        {
            
                //password token ,firmar el correcto 
                const id=usuario._id;
                    
                const token=jwt.sign(
                    {
                        correo:usuario.correo,
                        nombre:usuario.nombre,
                        id:usuario._id

                    },'LLAVESECRETA',
                    {
                        expiresIn:'1h'
                    })

                    res.json({token})
        }


}
}catch(error)
{
    console.log(error);


    
}


}


exports.buscarNombreUsuario=async(req,res,next)=>
{

    
    const diario = await  Diario.findById(req.params.idUsuario)

    console.log(diario);
    
    if(!diario) {
        res.json({mensaje : 'Ese diario no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(diario.nombre);


}