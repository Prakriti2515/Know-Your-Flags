import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.static("public"))

app.get("/api/flag", async(requestAnimationFrame, res)=>{
    const country = requestAnimationFrame.query.country;

    try{
        const response = await fetch(
            `https://api.api-ninjas.com/v1/countryflag?country=${country}`,
            {
                headers:{
                    "X-Api-Key": process.env.API_KEY
                }
            }
        );
        const data = await response.json();
        res.json(data);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error fetching flag" });
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port:${process.env.PORT}`)
})