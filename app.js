require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
app.use(express.json({limit: '10mb'}))
app.use(cookieParser())
app.use(cors())

require('./db/conn')
app.use(require('./router/auth'))

const port = process.env.PORT || 5000

app.get('/setcookie', function (req, res) {
      
    // Setting a cookie with key 'my_cookie' 
    // and value 'geeksforgeeks'
    res.cookie('my_cookie', 'geeksforgeeks');
    res.send('Cookies added');
  })
    
  // Route for getting all the cookies
  app.get('/getcookie', function (req, res) {
      res.send(req.cookies);
  })

//   Code	Text	        Purpose
//    200	OK	            For successful GET and PUT requests.
//    201	Created	        For a successful POST request.
//    202	Accepted	    For a request that resulted in a scheduled task being created to perform the actual request.
//    400	Bad Request	    Issued when a malformed request was sent.
//    401	Unauthorized    This response is sent when your client failed to provide credentials or its credentials were invalid.
//    403	Forbidden	    Returned when permissions do not allow the operation.
//    404	Not Found	    When a particular resource doesn’t exist or couldn’t be found.


if(process.env.NODE_ENV == 'production'){
    const path = require('path');
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port , () => {
    console.log(`Backend is running at Port ${port}`)
})
// mongodb+srv://Ankit628792:<password>@cluster0.tde6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 