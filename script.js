const button = document.getElementById('submit');
button.addEventListener("click", getFlag);
async function getFlag(){
    const country = document.getElementById("enter").value.trim();
    const flag = document.getElementById("flag")
    flag.innerHTML = ""
    if(!country){
        flag.innerHTML = "<p>Country name required!</p>"
        return;
    }

    try{
        const res = await fetch(`https://api.api-ninjas.com/v1/countryflag?country=${country}`,{
            headers:{
                "X-Api-Key": ""
            }
        });
        const data = await res.json();

        if(data.status === 404)
            flag.innerHTML = "<p>Country not found!</p>"
        else{
            const flagUrl = data.find(item => item.country === country);
            flag.innerHTML = `<img src = "${flagUrl}" alt="Flag of ${country}">`
        }
    }
    catch(error){
        flag.innerHTML = "<p>Something went wrong. Please try again later.</p>"
    }
}
    
