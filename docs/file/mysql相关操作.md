# mysql相关

## 安装源

```
rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
yum repolist enabled | grep "mysql.*-community.*"
yum -y install mysql-community-server
systemctl enable mysqld  -----开机启动
systemctl start mysql  ----启动
mysql_secure_installation ---安全设置
mysql -u root -p    进入mysql
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
flush privileges；
```

云环境配置外部端口3306安全策略组

## 创建新用户

```
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'user'@'%';-----授权
flush privileges ;刷新权限
```

## 更改字符集

 安装完的MySQL的默认字符集为 latin1 ，为了要将其字符集改为用户所需要的(比如utf8)，就必须改其相关的配置文件；由于linux下MySQL的默认安装目录分布在不同的文件下；不像windows一样放在同一目录下，只需修改其中的my.ini文件，重起后就生效了；所以先来看看linux下MySQL的数据库文件、配置文件和命令文件分别在不同的目录 ： 

1、数据库目录，其所创建的数据库文件都在该目录下 
　　/var/lib/mysql/ 
2、配置文件 （mysql.server命令及配置文件所在地） 
　　/usr/share/mysql 
3、相关命令（如mysql mysqladmin等） 
　　/usr/bin 
4、启动脚本（如mysql启动命令） 
　　/etc/rc.d/init.d/ 

查看默认字符集 
\#mysql -u root - p 
\#(输入密码) 

mysql> show variables like 'character_set%';

![image-20201216194035494](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201216194035494.png)

修改字符集 修改 /etc/my.cnf文件

```
#/etc/my.cnf

[client]

default-character-set=utf8

[mysqld]

datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

user=mysql

# Disabling symbolic-links is recommended to prevent assorted security risks

symbolic-links=0

#default-character-set=utf8
character-set-server=utf8
init_connect='SET NAMES utf8'

[mysql]
no-auto-rehash

default-character-set=utf8

[mysqld_safe]

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

切记：在mysqld中加入的是 character-set-server=utf8 而不是 default-character-set=utf8 
否则会报：Starting MySQL...The server quit without updating PID file [失败]lib/mysql/localhost.localdomain.pid).异常

重起MySQL服务器，使其设置的内容生效 

```
一、启动方式

1、使用 service 启动：service mysqld start

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld start

3、使用 safe_mysqld 启动：safe_mysqld&



二、停止

1、使用 service 启动：service mysqld stop

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld stop

3、 mysqladmin shutdown 

三、重启

1、 使用 service 启动：service mysqld restart

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld restart
```