const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const gastoSchema=new Schema(
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
            ref: 'usuario'
            
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
    module.exports=mongoose.model('gasto',gastoSchema);