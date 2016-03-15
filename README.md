To do application
=================

This application has following functions:

1. List tasks
2. Add a task via text box
3. filter tasks in three way all, active and completed
4. import and export tasks
5. save and load tasks into/from a database
6. Delete all tasks via Clear all button

**Note**: filter function remember what you selected and use next time.

###How to use

You can use this application by download as a zip file and extract it or clone this repo.

#### No database
If you don't want to save and load functions you can open file index.html in directory named **"Stand alone"** by Firefox or Google Chrome. The application will load via web browser.


#### Database
In order to use save and load functions you must follow these steps:

prerequisite

php >= 5.3.6  
MySql >= 5.6.x

**Note:** you can use other DBMS but I use MySql in test

1. create a database in any name
2. create table name **"tasks"** with
    ```sql
    CREATE TABLE tasks
    (
        tid int NOT NULL UNIQUE AUTO_INCREMENT,
        text varchar(255),
        status varchar(10),
        createtime bigint unsigned,
        PRIMARY KEY (tid)
    );
    ```

3. open file config.ini and set database configuration correspond to your database server (host, port, databasename, username, password)
4. run application  
If you use php built-in server go to root application directory (contain index.php) then type following command in terminal:

        php -S localhost:8080 -t ./

    open web browser and type localhost:8080 in address bar.  
If you use Apache HTTP server copy files to your root directory that you set in Apache configuration file and open application via web browser.

**Note:** In order to use with Apache server you have to activate URL rewriting module and set Apache configuration file.

activate URL rewriting module

    sudo a2enmod rewrite

restart Apache server

    sudo service apache2 restart

set oververride permission open your Apache configuration file for example
*/etc/apache2/sites-enabled/000-default.conf* add this code inside ```<VirtualHost *:80>``` block

    <Directory /var/www/html>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>

restart Apache server to take effect

    sudo service apache2 restart

**Note:** Don't forget to set permission of your root directory.

If you have any trouble in config Apache to use this application there is more information to these site

[how-to-set-up-mod_rewrite-for-apache-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_rewrite-for-apache-on-ubuntu-14-04)  
[Configuration fatfreeframework for Apache](http://fatfreeframework.com/routing-engine#sample-apache-configuration)
