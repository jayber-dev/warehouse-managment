import csv
import sqlite3 as sq
import datetime

conn = sq.connect('data.db')
cur = sq.Cursor(conn)
update_date = datetime.datetime.now()

with open('myFile0.csv') as data_file:
    csv_data = csv.reader(data_file, delimiter=',')
    for row in csv_data:
        if(not row[0] == 'warehouse'):
            print(row)
            cur.execute(f'''INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES('{row[0]}','{row[1]}','{row[2]}','{row[3]}','{row[4]}','{update_date}')''')      
            conn.commit()