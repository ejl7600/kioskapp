const express = require("express");
const cors = require("cors"); 
const formRoutes = require("./routes/formRoute")

const PORT = process.env.API_PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors()); // Enabling CORS for all routes

app.use('/submit', formRoutes);

// Middleware for handling 404 errors (route not found)
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Middleware for handling other errors (internal server errors)
app.use((error, req, res, next) => {
    res.status(error.status || 500); // Setting the response status code
    res.json({
        error: {
            message: error.message // Sending error message in JSON response
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});