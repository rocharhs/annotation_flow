from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

# Serve static files (HTML, CSS, JS) from 'static' directory
app.mount('/static', StaticFiles(directory='static'), name='static')

# Define the route for the main HTML page
@app.get("/", response_class=HTMLResponse)
async def read_main():
    return open('static/index.html','r').read()

# Your API routes can be added here
