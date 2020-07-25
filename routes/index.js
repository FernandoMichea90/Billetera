const express=require('../node_modules/express')
const router=express.Router();
const usuarioController=require('../controllers/UsuarioController')
const TipoGastosController=require('../controllers/TipoGastosController')
const TipoIngresoController=require('../controllers/TipoIngresosController')
const IngresoController=require('../controllers/IngresoController')
const GastoController=require('../controllers/GastoController')
module.exports=function()
{

    // Crear Usuario 
    router.post('/crearcliente',usuarioController.nuevoUsuario);
    //Auntenticar Usuario 
    router.post('/iniciar-sesion',usuarioController.autenticarUsuario);

    //tipo Gastos 
        //Crear
    router.post('/tipodegastos',TipoGastosController.nuevoDiario);
        //Listar tipo gastos por usuarios 
    router.get('/tipodegastos/:idUsuario',TipoGastosController.listarDiariosporId)    
        // Retornar un tipo por id 
    router.get('/tipodegastosedit/:idTip',TipoGastosController.mostrarDiario) 
        //modificar tipo de Gastos   
    router.put('/tipodegastosedit/:idTip',TipoGastosController.actualizarDiario)    
        //eliminar tipo gastos 
    router.delete('/tipodegastos/:idTip',TipoGastosController.eliminarDiario)   
    
    //tipo Ingresos
        //Crear
        router.post('/tipodeingreso',TipoIngresoController.nuevoDiario);
        //Listar tipo ingresos por usuarios 
    router.get('/tipodeingreso/:idUsuario',TipoIngresoController.listarDiariosporId)    
        // Retornar un tipo por id 
    router.get('/tipodeingresoedit/:idTip',TipoIngresoController.mostrarDiario) 
        //modificar tipo de Ingresos   
    router.put('/tipodeingresoedit/:idTip',TipoIngresoController.actualizarDiario)    
        //eliminar tipo ingresos
    router.delete('/tipodeingreso/:idTip',TipoIngresoController.eliminarDiario)   
    
    //Ingreso 
 //Crear
 router.post('/ingreso',IngresoController.nuevoDiario);
 //Listar  ingresos por usuarios 
router.get('/ingreso/:idUsuario',IngresoController.listarDiariosporId)    
 // Retornar un ingreso por id 
router.get('/ingresoedit/:idIng',IngresoController.mostrarDiario) 
 //modificar  Ingresos   
router.put('/ingresoedit/:idIng',IngresoController.actualizarDiario)    
 //eliminar ingresos
router.delete('/ingreso/:idIng',IngresoController.eliminarDiario)   
//Total Ingreso
router.get('/ingresostotales',IngresoController.ingresosTotales)    
//Ingreso por mes 

router.get('/ingresostotalesmes',IngresoController.ingresoTotalesMes)    
//Ingreso por tipo

router.get('/ingresosportipo/:idUsuario',IngresoController.ingresosportipo) 

//Ingreso por tipo por periodo  

router.put('/ingresosportipoperiodo',IngresoController.ingresosportipoperiodo) 

//Ingreso por por dia usuario 
router.get('/ingresospordia/:idUsuario',IngresoController.listarDiariosporIdydia)    


    //Gasto
 //Crear
 router.post('/gasto',GastoController.nuevoDiario);
 //Listar  gasto por usuarios 
router.get('/gasto/:idUsuario',GastoController.listarDiariosporId)    
 // Retornar un gasto por id 
router.get('/gastoedit/:idIng',GastoController.mostrarDiario) 
 //modificar  gasto   
router.put('/gastoedit/:idIng',GastoController.actualizarDiario)    
 //eliminar gasto
router.delete('/gasto/:idIng',GastoController.eliminarDiario)   

//Total Gastos
router.get('/gastostotales/',GastoController.gastosTotales)    


//Gassto por mes 

router.get('/gastostotalesmes/:idUsuario',GastoController.gastosTotalesMes)    

//Ingreso por tipo

router.get('/gastosportipo',GastoController.gastoportipo)    

   
router.get('/gastosportipoprueba/:idUsuario',GastoController.gastoportipoprueba)    

//Gastos por por dia usuario 
router.get('/gastospordia/:idUsuario',GastoController.listarDiariosporIdydia)    

//Gastos por por dia usuario 
router.put('/gastospordia',GastoController.listarDiariosporIdydiaperiodo)    


router.put('/gastosportipoperiodo',GastoController.gastoportipoperiodo)    



    return router 
}