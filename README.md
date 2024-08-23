# Copy of amazon.com
Run `npm install` to install all necessary packages<br>
Run `nodemon ./backend/server.js` to run <i>expressjs</i> server<br>
Change `.env` file in `./backend/sql` folder with environment variables for MYSQL Server like
```
MYSQL_HOST='127.0.0.1'
MYSQL_PORT=5000
MYSQL_USER='username'
MYSQL_PASSWORD='password'
MYSQL_DATABASE='amazon'
```
Create sql database using `./backend/sql/simple_schema.sql`<br>
Then run `node ./backend/sql/loadSQL` to load data in mysql database<br> 
Open amazon.html using extension called "Live Server" if you using VS Code