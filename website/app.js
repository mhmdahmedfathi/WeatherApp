/* Global Variables */
let url = "http://api.openweathermap.org/data/2.5/weather?zip="
let app = "&appid=5f001e4f63d3267254621193b25a0845"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', GetWeather);
const input= document.getElementById('feelings').value;
function GetWeather(e) {
    
    const ZipArea = document.getElementById('zip').value;
    GetAreaWeather(url, ZipArea, app)
}


const postData = async (url, data = [])=>{
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
}


const GetData = async (url)=>{
   const data = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        }})
    return data
}

const GetAreaWeather = async (url, ZipArea, app) => {
    // 1.
    const res = await fetch(url + ZipArea + app)
    try {

        const data = await res.json();
        data.Date=newDate;
        data.input=input;
        postData("/data",data);
        const ProjectData = GetData("/retrive");
        
        ProjectData.then(response => {
            if(!response.ok){
                console.error(response)
            } else {
                return response.json();
            }
        }).then(result => {
            
            document.getElementById("temp").innerHTML = result.projectData.temp;
            document.getElementById("date").innerHTML = result.projectData.date;
            document.getElementById("content").innerHTML = result.projectData.UserInput;
        })


    } catch (error) {
        console.log("error", error);
    }
}
