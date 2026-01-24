import socket
import platform
import os
import datetime
from fastapi import HTTPException
import datetime





def get_system_info():

    try:

        #hostname 
        hostname = platform.node()

        #OS
        os_name = f"{platform.system()} {platform.release()}"

        try:
            user = os.getlogin()
        except:
            user = 'unknown'

        
        #ip address

        ip = '192.168.0.1'

        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        try:    
            s.connect((ip, 22))

            ip = s.getsockname()[0]
        except Exception:
            ip = 'unknown'
        finally:
            s.close()

        #DATE

        date = datetime.datetime.now().strftime("%d.%m.%Y")
        
        return {
            "pc_name": hostname,
            "os_name": os_name,
            "user": user,
            "ip": ip,
            "date": date
        }
    except Exception as e:
    
        raise HTTPException(status_code=500, detail = 'Nie dziala')

