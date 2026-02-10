import psutil
from fastapi import HTTPException
import asyncio

latest_stats = ()

def check_system_stats():

    info = {
        'CPU Usage': 'unknown',
        'RAM Usage': 'unknown'
    }

    try:
        info['CPU Usage'] = psutil.cpu_percent(interval=None)
        info['RAM Usage'] = psutil.virtual_memory().percent
    except PermissionError:
        raise HTTPException(status_code=404, detail='You dont have permissions to do that')



    return info


async def monitor_system():
    while True:

        latest_stats = check_system_stats()
        await asyncio.sleep(1)