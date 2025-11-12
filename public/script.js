const button = document.getElementById('submit');
const flag = document.getElementById("flag")
const input = document.getElementById("enter")

button.addEventListener("click", getFlag);
input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        getFlag();
    }
})
async function getFlag(){
    const country = input.value.trim();
    
    flag.innerHTML = ""
    
    if(!country){
        flag.innerHTML = "<p>Country name required!</p>"
        return;
    }

    try{
        const res = await fetch(`/api/flag?country=${country}`);
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
    
