from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from fastapi.responses import FileResponse
from starlette.requests import Request
from typing import Dict
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Optional
import os
import pathlib
import re
import json

app = FastAPI(
    title='Miris Mimitako static API',
    description='This is data analysis API.',
    version='0.0.1'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

file_path = pathlib.Path(__file__).parent
project_settings_file_path = os.path.join(
    file_path, "statics/config", "projects.json")
project_settings_file = open(os.path.join(
    file_path, "statics/config", "projects.json"))
project_settings = json.load(project_settings_file)
print(project_settings_file)
print(project_settings)

# @app.get("/")
# async def main_menu(request: Request):
#     params = {"title": "Miris Stat API"}

#     return templates.TemplateResponse('base.html', request, params=params)


class Body(BaseModel):
    project_title: str


@app.post("/make_project")
async def make_project(body: Body):
    print(body.project_title)
    if body.project_title == False:
        return {"result": "You should input text"}
    else:
        body.project_title = re.sub(r'[\\/:*?"<>|]+', "-", body.project_title)

    mk_dir = os.path.join(file_path, "project", body.project_title)
    print(mk_dir)
    if os.path.isdir(mk_dir):
        return {"result": "Project is already exist."}
    else:
        os.makedirs(mk_dir)
        project_settings["project"].append(body.project_title)
        project_settings[body.project_title] = []
        print(project_settings_file)
        with open(project_settings_file_path, encoding="utf-8", mode="w") as outfile:
            json.dump(project_settings, outfile, indent=4)
        return {"result": "Success! make project."}


@app.get("/projects")
async def project_list():
    # reload json file
    project_settings_file = open(os.path.join(file_path, "statics/config", "projects.json"))
    project_settings = json.load(project_settings_file)

    print(project_settings["project"])
    return {"project_list": project_settings["project"]}

class Analysis(BaseModel):
    project_title:str
    analysis_title:str

@app.post("/analysis_create")
async def analysis_create(analysis_data:Analysis):
    # Judge empty data
    if analysis_data.analysis_title == False:
        return {"result":"You should input text"}
    else:
        analysis_data.analysis_title = re.sub(r'[\\/:*?"<>|]+', "-", analysis_data.analysis_title)
    
    mk_dir = os.path.join(file_path,"project", analysis_data.project_title, analysis_data.analysis_title)
    print(mk_dir)
    if os.path.isdir(mk_dir):
        return {"result": "Analysis is already exist."}
    else:
        os.makedirs(mk_dir)
        project_settings[analysis_data.project_title].append(analysis_data.analysis_title)
        print(analysis_data.project_title)
        with open(project_settings_file_path, encoding="utf-8", mode="w") as outfile:
            json.dump(project_settings, outfile, indent=4)
        return {"result": "Success! make analysis."}
