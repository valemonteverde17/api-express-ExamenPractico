const express = require('express')
const app = express()
const port = 3500

app.use(express.json())

const data =[
    {
        id:1,
        nombre:"Zendaya",
        ocupación:"actriz",
        edad:25,
    },
    {
        id:2,
        nombre:"Kendall",
        ocupación:"modelo",
        edad:27,
    },
    {
        id:3,
        nombre:"Niall",
        ocupación:"cantante",
        edad:28,
    }
]

app.get("/",(req,res)=>{
    res.send("Examen practico")
})
app.get("/famosos/all",(req,res)=>{
    res.status(200).json(data)
})
app.get("/famosos/:id",(req,res)=>{
    const id_user=req.params.id
    const encontrado = data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }
    else{
        res.status(404).json({message:"No encontrado"})
    }
})
app.put("/famosos/:id",(req,res)=>{
    const user_body= req.body
    const param=req.params.id
    const encontrado=data.findIndex(item=>item.id==param)
    if(encontrado!==1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message:"No encontrado"})
    }
})
app.delete("/famosos/:id", (req, res) => {
    try {
        const param = req.params.id;
        const encontradoIndex = data.findIndex(item => item.id == param);

        if (encontradoIndex !== -1) {
            data.splice(encontradoIndex, 1); 
            res.status(200).json({ message: "Famoso eliminado correctamente" });
        } else {
            res.status(404).json({ message: "No encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.listen(port,()=>{
    console.log("Servicio escuchando el puerto: ",port)
})

