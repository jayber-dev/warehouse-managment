from flask import Flask, render_template, request,redirect,url_for
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
    update_date text)
    ''');



# cur.execute(f'''INSERT INTO warehouse (warehouse_name,item,item_description,quantity,catalog_id,update_date)
#             VALUES ('931','צבע','צבע שצובע הכל ויחד עם זאת זה לא צובע טוב ',5,'50000321','{datetime.now()}')''')


conn.commit()



app = Flask(__name__)

@app.route('/',)
def index():
    conn = sq.connect('data.db')
    cur = sq.Cursor(conn)
    res = cur.execute('''SELECT * FROM warehouse''')
    data = res.fetchall()
    cur.close()
    return render_template('index.html', data=data)

@app.route('/addItem',methods=['GET','POST'])
def add_item():
    if(request.method == "POST"):
        conn = sq.connect('data.db')
        cur = sq.Cursor(conn)
        dict_data = request.form.to_dict()
        cur.execute(f"""INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES('{dict_data["warehouse"]}','{dict_data["item"]}','{dict_data["description"]}','{dict_data["quantity"]}','{dict_data["catalog_id"]}','{datetime.datetime.now()}')""")
        conn.commit()
        cur.close()
        print(request.form.to_dict())
        return redirect(url_for('index'))
    return render_template('addItem.html')

@app.route('/item_delete/<string:row_delete>',methods=['GET'])
def item_delete(row_delete):
    stmt = "DELETE FROM warehouse WHERE item="+"row_delete"
    print(row_delete)
    conn = sq.connect('data.db')
    cur = sq.Cursor(conn)
    cur.execute(stmt)
    print(row_data.fetchall())
    conn.commit()
    return redirect(url_for('index'))
    
if (__name__ == '__main__'):
    app.run(debug=True)