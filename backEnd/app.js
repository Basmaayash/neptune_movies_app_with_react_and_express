import express from 'express';
import movieRouter from './router.js';

const app = express();

app.get('/test',(req,res)=>{
    res.send('server running on on port 5500');
})

//APP CONSTRUCTION  
app.use (express.json()); //global middleware
app.use ('/api/v1/movies',movieRouter); //routes

app.listen(5500,()=>{
    console.log('server running on port 5500');
})