import psutil

print(psutil.cpu_percent(interval=1), psutil.virtual_memory().percent)