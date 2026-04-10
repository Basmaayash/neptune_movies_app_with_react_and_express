import express from 'express';

const app = express();

app.get('/test',(req,res)=>{
    res.send('server running on on port 5500');
})

app.listen(5500,()=>{
    console.log('server running on port 5500');
})