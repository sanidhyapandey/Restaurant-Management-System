var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

 const foodRouter = require("./routes/FoodRoute");
 const usersRouter = require("./routes/UsersRoute");
 const itemsRouter = require("./routes/ItemRoute");
 const ordersRouter = require("./routes/OrdersRoute");
 const dinersRouter = require("./routes/Diner_tableRoute");
 const reservationsRouter = require("./routes/ReservationRoute");
 const loginRouter = require("./routes/LoginRoute");
const cors = require("cors");



app.use(cors());
/**
 * parse requests of content-type - application/json
 */
app.use(bodyParser.json());
app.use(foodRouter);
app.use(usersRouter);
app.use(itemsRouter);
app.use(ordersRouter);
app.use(dinersRouter);
app.use(reservationsRouter);
app.use(loginRouter);
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json({"message": "Congratulations! you are working great!"});
});
(async () => {
    try {
        await mongoose.connect('mongodb+srv://Sanidhya_Pandey:camerondiaz70@cluster0.7qcm3.mongodb.net/restaurant?retryWrites=true&w=majority', {
            useNewUrlParser: true
          });
    }
   catch(e) {
       console.log("Error in connecting to database" + e)
   }
    app.listen(8000, () =>
      console.log("Started listening on port:8000")
    );
  })();