const systemButtons = document.querySelectorAll('.btn')
const statsValues = document.querySelectorAll('.stat-value')
const statsPercentage = document.querySelectorAll('.progress-fill')
const infoContainers = document.querySelectorAll('.data-field')



function getBasicHeader(username, password){
    const credentials = `${username}:${password}`

    const base64Credentials = btoa(credentials)

    return `Basic ${base64Credentials}`
}

async function update_stats(){

    const response = await fetch("/api/system-stats/", {
        method:'GET',
        headers: {
            'Authorization': getBasicHeader('', ''),
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()
    

    statsValues[0].textContent = `${data['CPU Usage']}`
    statsPercentage[0].style.width = `${data['CPU Usage']}%`
    statsValues[1].textContent = `${data['RAM Usage']}`
    statsPercentage[1].style.width = `${data['RAM Usage']}%`

}



async function get_system_status(){
    const response = await fetch("/api/system/", 
        {
        method:'GET',
        headers: {
            'Authorization': getBasicHeader('', ''),
            'Content-Type': 'application/json'
        }
    }
    )
    const data = await response.json()


    infoContainers[0].textContent = data['Hostname']
    infoContainers[1].textContent = data['OS Name']
    infoContainers[2].textContent = data['IP Local']
    infoContainers[3].textContent = data['IP Public']
    infoContainers[4].textContent = data['MAC Address']

    
}

setInterval(update_stats, 1000)
get_system_status()

