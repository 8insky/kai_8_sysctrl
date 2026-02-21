const elements = document.querySelectorAll('.pc_stats')

const systemButtons = document.querySelectorAll('.btn')

console.log(systemButtons)



function getBasicHeader(username, password){
    const credentials = `${username}:{password}`

    const base64Credentials = btoa(credentials)

    return `Basic ${base64Credentials}`
}

async function update_stats(){

    const response = await fetch("/api/system-stats/", {
        method:'POST',
        headers: {
            'Authorization': getBasicHeader('admin', 'alamakota'),
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()
    

    elements[0].textContent = `Zuzycie PROCESORA ${data['CPU Usage']}`
    elements[1].textContent = `Zuzycie RAMU ${data['RAM Usage']}`
}



async function get_system_status(){
    const response = await fetch("/api/system/", 
        {
        method:'POST',
        headers: {
            'Authorization': getBasicHeader('admin', 'alamakota'),
            'Content-Type': 'application/json'
        }
    }
    )
    const data = await response.json()

    console.log(data)
}

setInterval(update_stats, 1000)
get_system_status()

