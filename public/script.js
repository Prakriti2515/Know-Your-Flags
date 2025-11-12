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
        const res = await fetch(`/api/flag?country=${country}`);
        console.log("Response status:", res.status)
        const data = await res.json();

        console.log("frontend fetched data: ", data)
        
        if(!data)
            flag.innerHTML = "<p>Country not found!</p>"
        else{
            const flagUrl = data.rectangle_image_url;
            console.log("Flag URL:",flagUrl)
            flag.innerHTML = `<img src="${flagUrl}" alt="Flag of ${country}" width="200">`
        }
    }
    catch(error){
        console.error(error);
        flag.innerHTML = "<p>Something went wrong. Please try again later.</p>"
        
    }
}
    
