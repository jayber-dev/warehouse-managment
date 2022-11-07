import csv
import sqlite3 as sq
import datetime



conn = sq.connect('data.db')
cur = sq.Cursor(conn)
update_date = datetime.datetime.now()
print(update_date)
with open('fromGoogle.csv', encoding='utf-8') as data_file:
    csv_data = csv.reader(data_file, delimiter=',')
    for row in csv_data:
        if(not row[0] == 'warehouse'):
            print(row)
            row.append(update_date.now())
            print(row)
            cur.execute(f'''INSERT INTO warehouse(warehouse_name,item,item_description,quantity,catalog_id,update_date) VALUES(?,?,?,?,?,?)''',row)      
            conn.commit()