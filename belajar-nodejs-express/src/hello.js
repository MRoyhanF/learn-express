import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/royhan', (req, res) => {
    res.send("Hello Royhan");
});

app.listen(3000, () =>{
    console.info("server sarted on port 3000");
});