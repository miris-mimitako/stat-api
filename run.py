import webbrowser
from controllers import app
import uvicorn
import os
import pathlib

if __name__=="__main__":
    file_path = pathlib.Path(__file__).parent
    home_path = os.path.join(file_path,"project/.home/home.html")
    webbrowser.open(home_path,new=0, autoraise=True)
    uvicorn.run(app=app)
