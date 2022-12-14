from flask import Flask, render_template, request,redirect,url_for
import sqlite3 as sq
import datetime
import webbrowser as wb
# import dbinsert



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
    ''')

conn.commit()
app = Flask(__name__)

@app.route('/',)
def index():
    conn = sq.connect('data.db')
    cur = sq.Cursor(conn)
    res = cur.execute('''SELECT * FROM warehouse''')
    data = res.fetchall()
    warehouse_names = set()
    for i in range(len(data)):
        warehouse_names.add(data[i][1])
    cur.close()
    return render_template('index.html', data=data, set_data=warehouse_names)

@app.route('/addItem',methods=['GET','POST'])
def add_item():
    if(request.method == "POST"):
        conn = sq.connect('data.db')
        cur = sq.Cursor(conn)
        dict_data = request.form.to_dict()
        update_date = datetime.datetime.now()
        arr_data = [dict_data['warehouse'],dict_data['item'],dict_data['description'],dict_data['quantity'],dict_data["catalog_id"],update_date]
        # cur.execute(f"""INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES('{dict_data["warehouse"]}',\'{dict_data["item"]}\',\'{dict_data["description"]}\','{dict_data["quantity"]}','{dict_data["catalog_id"]}','{update_date}')""")
        cur.execute(f"""INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES(?,?,?,?,?,?)""",arr_data)
        conn.commit()
        cur.close()
        print(request.form.to_dict())
        return redirect(url_for('index'))

    conn = sq.connect('data.db')
    cur = sq.Cursor(conn)
    # res = cur.execute('SELECT warehouse_name FROM warehouse')
    res = cur.execute('SELECT * FROM warehouse')
    all_warehouses = res.fetchall()
    print(all_warehouses)
    warehouse_names = set()
    for i in range(len(all_warehouses)):
        warehouse_names.add(all_warehouses[i][1])

    print(warehouse_names)
    return render_template('addItem.html', data=warehouse_names)

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
        # print(data)
        args_array = [data['warehouse'], data['item'], data['quantity'], data['description'], data['catalog_id'], update_date]
        print(args_array)
        sql_query = f"UPDATE warehouse SET warehouse_name = ?, item = ?, quantity = ?, item_description= ?, catalog_id= ?, update_date= ? WHERE id={row_id}"
        cur.execute(sql_query,args_array)
        conn.commit()
        cur.close()
        print('im in post method')
        return redirect(url_for('index'))

    conn = sq.connect('data.db')    
    cur = sq.Cursor(conn)
    cur.execute('''SELECT * FROM warehouse''')
    query_data = cur.fetchall()
    # print(query_data)
    warehouse_names = set()
    for i in range(len(query_data)):
        warehouse_names.add(query_data[i][1])
    
    print(request.args.to_dict())
    return render_template('updateItem.html', row_id=row_id, data=request.args.to_dict(),set_data=warehouse_names)
        
@app.route('/search/', methods=["GET","POST"])
def search():
    search_query = request.args.to_dict()['q']  
    conn = sq.connect('data.db')    
    cur = sq.Cursor(conn)
    if(search_query == 'All warehouses'):
        cur.execute('''SELECT * FROM warehouse''')
        query_data = cur.fetchall()
        warehouse_names = set()
        for i in range(len(query_data)):
            warehouse_names.add(query_data[i][1])      
        return render_template('index.html', data=query_data, set_data=warehouse_names)
    else:
        cur.execute("PRAGMA case_sensitive_like = true;")
        cur.execute(f"""SELECT * FROM warehouse WHERE warehouse_name LIKE '%{search_query}%' OR item LIKE '%{search_query}%' OR item_description LIKE '%{search_query}%' """)
        query_data = cur.fetchall()
        print(query_data)
        warehouse_names = set()
        for i in range(len(query_data)):
            warehouse_names.add(query_data[i][1])
        print(warehouse_names)
        return render_template('index.html', data=query_data, q_param=search_query, set_data=warehouse_names)



if (__name__ == '__main__'):
    
    wb.open(url="http://127.0.0.1:5000")
    app.run(debug=False)
    
    