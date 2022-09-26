from flask import Flask, render_template, request,redirect,url_for
import sqlite3 as sq
import datetime

conn = sq.connect('data.db')

cur = sq.Cursor(conn)

cur.execute('''CREATE TABLE IF NOT EXISTS warehouse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        update_date = datetime.datetime.now()
        cur.execute(f"""INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES('{dict_data["warehouse"]}',\'{dict_data["item"]}\',\'{dict_data["description"]}\','{dict_data["quantity"]}','{dict_data["catalog_id"]}','{update_date}')""")
        conn.commit()
        cur.close()
        print(request.form.to_dict())
        return redirect(url_for('index'))
    return render_template('addItem.html')

@app.route('/item_delete/<string:row_delete>',methods=['GET'])
def item_delete(row_delete):
    stmt = f"DELETE FROM warehouse WHERE id={row_delete}"
    print(row_delete)
    conn = sq.connect('data.db')
    cur = sq.Cursor(conn)
    cur.execute(stmt)
    conn.commit()
    cur.close()
    return redirect(url_for('index'))

@app.route('/item_update/<string:row_id>', methods=['get','post'])
def item_update(row_id):
    if(request.method == 'POST'):
        data = request.form.to_dict()
        conn = sq.connect('data.db')    
        cur = sq.Cursor(conn)
        update_date = datetime.datetime.now()
        print(data)
        cur.execute(f"""UPDATE warehouse SET
                    warehouse_name = '{data['warehouse']}',
                    item = '{data['item']}',
                    quantity = '{data['quantity']}',
                    item_description= '{data['description']}',
                    catalog_id= '{data['catalog_id']}',
                    update_date= '{update_date}'
                    WHERE id={row_id}""")
        conn.commit()
        cur.close()
        print('im in post method')
        return redirect(url_for('index'))
        
    print(request.args.to_dict())
    return render_template('updateItem.html', row_id=row_id, data=request.args.to_dict())
        
    
if (__name__ == '__main__'):
    app.run(debug=True)