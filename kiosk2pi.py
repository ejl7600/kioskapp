import sqlite3
from datetime import datetime

con = sqlite3.connect("<path to kioskapp>/kioskapp/server/data.db")
cur = con.cursor()


insert_statemet = "INSERT INTO submissions (sessionKey, date, destination) VALUES(?, ?, ?)"

values = ["foo", datetime.today().strftime("%Y-%M-%d"), "bar"]

cur.execute(insert_statemet, values)
con.commit()