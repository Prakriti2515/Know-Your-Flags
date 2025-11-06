import express from "express"
import dotenv from "dotenv"
import fetch from  "node-fetch"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, "public")))

app.get("/api/flag", async(req, res)=>{
    const country = req.query.country;
    if (!country) {
        console.log("Error 400: Country name required")
        return res.status(400).json({error:"Country name required"});
  }
    try{
        const response = await fetch(
            `https://api.api-ninjas.com/v1/countryflag?country=${country}`,
            {
                headers:{"X-Api-Key": process.env.API_KEY}
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