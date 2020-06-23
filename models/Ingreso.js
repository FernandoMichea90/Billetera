const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const IngresosSchema=new Schema(
    {
        
       fecha:
       {
           type:Date
       },
        descripcion:
        {
            type:String,
            required:true       

        },

        tipo:
        {
            type: Schema.ObjectId,
            ref: 'tipoingreso'
            
        },
        monto:
        {

            type:Number,
            required:true       
        },
        usuario: {
            type: Schema.ObjectId,
            ref: 'usuario'
        }
    })
    module.exports=mongoose.model('ingreso',IngresosSchema);