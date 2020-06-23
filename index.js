const express=require('express')

const route=require('../Backend/routes')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
require('dotenv').config({path:'variables.env'})
const cors =require('cors');
const app=express ()
mongoose.Promise=global.Promise;
mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser:true

})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// definir un dominio para ejecutar peticiones 

const whitelist =[process.env.FRONTEND_URL]


console.log("hola munfo "+process.env.FRONTEND_URL);

const corsOption={
    origin:(origin,callBack)=>
    {
       // console.log(origin);
        
        // revisar si la peticion proveniente del servidor esta en la whitelist

        const existe =whitelist.some(dominio=>dominio===origin);
        if(existe)
        {

            callBack(null,true)
        }else{

            callBack(new Error('no permitido por cors'));
            
        }
    }

}

app.use(cors(corsOption));

app.use('/',route())

const host =process.env.HOST || '0.0.0.0'
const port =process.env.PORT || 5000
app.listen(port,host,()=>
{

    console.log("El servidor esta funcionando");
    console.log(process.env.DB_URL);
    console.log(process.env.FRONTEND_URL);

    

})


