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
        return res.status(400).json({error:"Country name required"});
    }
    try{
        const response = await fetch(
            `https://api.api-ninjas.com/v1/countryflag?country=${country}`,
            {
                headers:{"X-Api-Key":process.env.API_KEY}
            }
        );
        const data = await response.json();
        if(data.rectangle_image_url.length)
        {
            res.json({rectangle_image_url:data.rectangle_image_url});
        }
        else{
            console.log("Error fetching data")
            return res.status(500).json({error:"Error fetching flag"})
        }
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error fetching flag" });
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port:${process.env.PORT}`)
})