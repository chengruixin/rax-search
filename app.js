const app = require("express")();
const indexRouter = require("./routers/indexRouter");
const PORT = process.env.PORT || 8080;


app.use('/', indexRouter);

app.listen(PORT, ()=>{
    console.log("app is running on port", PORT);
})