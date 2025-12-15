const button = document.getElementById('submit');
const flag = document.getElementById("flag")
const input = document.getElementById("enter")

button.addEventListener("click", getFlag);
input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        getFlag();
    }
})

const nameToCode = {};
async function loadMetaData(){
    try{
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
        const data = await res.json()

        data.forEach(country=>{
            if(country.name?.common && country.cca2){
                nameToCode[country.name.common.toLowerCase()]= country.cca2;
            }
        })
    }
    catch(err){
        console.error("Failed to load metadata:", err);
    }
}

loadMetaData();


async function getFlag(){
    const country = input.value.trim().toLowerCase();
    const code = nameToCode[country];
    
    flag.innerHTML = ""
    
    if(!code){
        flag.innerHTML = "<p>Country not found!</p>"
        return;
    }

    try{
        const res = await fetch(`/api/flag?country=${code}`);
        console.log("Response status:", res.status)
        const data = await res.json();
        
        if(!data)
            flag.innerHTML = "<p>Country not found!</p>"
        else{
            const flagUrl = data.rectangle_image_url;
            flag.innerHTML = `<img src="${flagUrl}" alt="Flag of ${country}">`
        }
    }
    catch(error){
        console.error(error);
        flag.innerHTML = "<p>Something went wrong. Please try again later.</p>"
    }
}


    
