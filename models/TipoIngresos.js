const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TipoingresosSchema=new Schema(
    {
        
       
        tipo:
        {
            type:String
        },
        usuario: {
            type: Schema.ObjectId,
            ref: 'usuario'
        }
    })
    module.exports=mongoose.model('tipoingreso',TipoingresosSchema);