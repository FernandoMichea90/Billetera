const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const tipogastoSchema=new Schema(
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
    module.exports=mongoose.model('tipogasto',tipogastoSchema);