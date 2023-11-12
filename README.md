Setup

npm install

create a .env file based on env.sample
-copy and paste the .env.sample and rename it to .env

to make the database

- Open your terminal
- enter "mysql -u root -p"
- Enter password (should be "rootroot")
- enter "CREATE DATABASE instock;"

to perform migrations and seed db

- open the terminal in vscode at the project root
- run "npm run db:migrate"
- run "npm run db:seed"
