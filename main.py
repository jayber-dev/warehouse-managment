from flask import Flask, render_template
import sqlite3 as sq
import datetime

conn = sq.connect('data.db')

cur = sq.Cursor(conn)

cur.execute('''CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_name TEXT NOT NULL, 
    item TEXT NOT NULL,
    item_description TEXT,
    quantity INTEGER,
    catalog_id TEXT,
    update_date TEXT,
    WITHOUT ROW)
    ''');

conn.commit()



cur.execute(f'''INSERT INTO warehouse (warehouse_name,item,item_description,quantity,catalog_id,update_date)
            VALUES ('931','מסור','חד מאוד',5,'50000321','{datetime.datetime().now()}')''')
conn.commit()

app = Flask(__name__)

@app.route('/',)
def index():
    print()
    return render_template('index.html')

if (__name__ == '__main__'):
    app.run(debug=True)