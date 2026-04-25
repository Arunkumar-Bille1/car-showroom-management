import mysql.connector

passwords = ['', 'root', 'password', 'admin', '1234', '123456', 'root123']
success = None
for p in passwords:
    try:
        if p == '':
            conn = mysql.connector.connect(host='localhost', user='root')
        else:
            conn = mysql.connector.connect(host='localhost', user='root', password=p)
        print(f'SUCCESS with password: "{p}"')
        success = p
        break
    except Exception as e:
        pass

if success is None:
    print('FAILED to find password')
