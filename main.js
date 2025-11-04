// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
//
// const app = express();
// const PORT = 3000;
//
// let secret = 'qwerty';
// app.use(cookieParser(secret));
// app.use(cors({ origin: '*' }));
// app.use(express.json());
//
// app.get('/test', async (req, res) => {
//     // console.error({req, res})
//     console.log(req.cookies); // объект с куками
//
//     console.log(`куки test в куках ${ !('test' in req.cookies) ? 'не' : '' } существуют`)
//
//     if ('test' in req.cookies) {
//
//     }
//
//     res.cookie('test', 'abcde');
//     res.json({status: 'ok' } );
// });
//
// app.get('/test', async (req, res) => {
//     // console.error({req, res})
//     console.log(req.cookies); // объект с куками
//
//     console.log(`куки test в куках ${ !('test' in req.cookies) ? 'не' : '' } существуют`)
//
//     if ('test' in req.cookies) {
//
//     }
//
//     res.cookie('test', 'abcde');
//     res.json({status: 'ok' } );
// });
//
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
//
