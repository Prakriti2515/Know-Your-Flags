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
        const data = await res.json();

        if(!data.length)
            flag.innerHTML = "<p>Country not found!</p>"
        else{
            const flagUrl = data[0].rectangle_image_url;
            flag.innerHTML = `<img src = "${flagUrl}" alt="Flag of ${country}" width="200">`
        }
    }
    catch(error){
        console.error(error);
        flag.innerHTML = "<p>Something went wrong. Please try again later.</p>"
        
    }
}
    
