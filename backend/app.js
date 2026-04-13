 import express from 'express';
<<<<<<< HEAD:backEnd/app.js
 import cors from 'cors'; 
=======
>>>>>>> 668e71a082668d994d1a2449cf59caf83647ed93:backend/app.js
import movieRouter from './router.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/movies', movieRouter);
app.get('/test',(req,res)=>{
    res.send('server running on on port 5500');
})

//error middleware
function erorrHandler (err, req, res, next) {
    const code = err.code || 500;
    const message = err.message || 'internal server erorr';
    res.status(code).json({
        success:false,
        message
    })
}

//APP CONSTRUCTION  
app.use (express.json()); //global middleware
app.use('/assets', express.static('assets'));
app.use ('/api/v1/movies',movieRouter); //routes
app.use (erorrHandler); 

app.listen(5500,()=>{
    console.log('server running on port 5500');
})