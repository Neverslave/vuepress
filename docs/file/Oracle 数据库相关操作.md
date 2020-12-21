# Oracle 数据库相关操作

## 表空间

### 查询表空间大小

```sql
SELECT   a.tablespace_name   "表空间名",total   表空间大小,free   表空间剩余大小,  (total-free)   表空间使用大小,   
  ROUND((total-free)/total,4)*100   "使用率   %"   
  FROM     (SELECT   tablespace_name,SUM(bytes)   free   FROM   DBA_FREE_SPACE   
  GROUP   BY   tablespace_name   )   a,   
  (SELECT   tablespace_name,SUM(bytes)   total   FROM   DBA_DATA_FILES   
  GROUP   BY   tablespace_name)   b   
  WHERE   a.tablespace_name=b.tablespace_name
  order by  a.tablespace_name
```

### 增加表空间

设置表空间自动增长

``` sql
alter database datafile '数据文件位置' autoextend on next 自动扩展大小maxsize 最大扩展大小
例如：
alter database datafile '\oracle\oradata\anita_2008.dbf' autoextend on next 100m maxsize 10000m
```



## 数据导入导出

### 数据泵导出

```sql
1.打开CMD,输入命令sqlplus system/密码
2.创建数据导出目录XXX为目录名，'E:\XX'为数据库实际目录，命令如下： create directory XX as 'E:\XX';
3.为oracle用户授予访问数据目录的权限，命令如下： Grant read,write on directory XX to 导出用户名;
4.执行数据泵导出命令，注意一定要在Cmd下执行，不能登录sqlplus后执行。 例：
expdp dxzyjt/dxzyjt@ncdata directory=XX dumpfile=ncdatabak.dmp schemas=dxzyjt  logfile=ncdatabak.log;
5.如果要导出具体的表，执行以下语句：
expdp dxzyjt/dxzyjt@ncdata directory=XX dumpfile=XXX.dmp schemas=dxzyjt  tables=table1/tables=(table1,table2,table3...) logfile=XXX.log;

```

### 数据泵导入

```sql
1.创建导入用户，赋予connect,dba权限
2.创建导入目录，'E:\XX'为数据库实际目录，命令如下：create directory XX as 'E:\XX';
3.为oracle用户授予访问数据目录的权限，命令如下： Grant read,write on directory XX to 导入用户名;
4.执行数据泵导入命令。例：
impdp nc65/nc65@test directory=backup dumpfile=BACKUP.dmp schemas=nc65  logfile=abc.log;
如果导入导出用户不一致，要加上'remap_schema=导出用户：导入用户'
```

### 覆盖导入

```sql
---- 提前创建导入目录
create directory XX as 'E:\XX';
-----覆盖导入
impdp user/password directory=dump_dir dumpfile=GZBACKUP.dmp  full=y logfile=backup.log table_exists_action=replace
```

##  导出指定表



```sql
---- 提前创建导入目录
create directory XX as 'E:\XX';

expdp  user/passwod tables=bd_accassitem,bd_accchart,bd_account,bd_cust_supplier,BD_VOUCHERTYPE,gl_balance,org_adminorg,gl_detail,BD_ACCASOA,sm_user,org_accountingbook,gl_voucher,gl_freevalue directory=gz_dumps dumpfile=backup.dmp  logfile=backup.log 
```



##  修改密码有效期

```sql
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
```

