from flask import Flask, render_template
from flask_pymongo import PyMongo
import salespredict
import pandas as pd

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/forecast")
datapath = 'resources/globalsales.csv'


@app.route("/")
def index():
    data = salespredict.update_all(datapath = datapath)
    return render_template("SalesForecast.html", data = data)


@app.route("/update")
def update():
    forecast = mongo.db.forecast
    forecast_data = salespredict.update_all(datapath = datapath)
    forecast.replace_one({}, forecast_data, upsert=True)
    data = mongo.db.forecast.find_one()
    return render_template("SalesForecast.html", data = data)


if __name__ == "__main__":
    app.run(debug=True)


