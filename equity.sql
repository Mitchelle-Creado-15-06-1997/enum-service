create database equity;
use equity;

create user 'equity-dev'@'%'IDENTIFIED BY 'neoworldequitydev';
show grants for 'equity-dev';
show grants;
GRANT SELECT ON *.* TO `equity-dev`@`%` WITH GRANT OPTION;



CREATE TABLE enum_of_enums (
    id int(11) not null auto_increment,
    type_key varchar(255) not null unique,
    description varchar(255) default null,
    is_active tinyint(2) default 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT id_pk PRIMARY KEY (id)
);

insert into enum_of_enums(type_key, description) values ('mcap', 'Market Capitalization'), ('exchange', 'Exchange types'), ('time_period', 'duration'), ('query_type', 'Filters to get Volume / Value'), ('S/C', 'Standalone or Consolidated'), ('O/U', 'Out or Under Performers'), ('merchant_type', 'Buyers or Sellers');
select * from enum_of_enums;



CREATE TABLE enum_values (
    id int(11) not null auto_increment,
    type_key varchar(255) not null unique,
    description varchar(255) default null,
    enum_id int(11) not null,
    is_active tinyint(2) default 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT id_pk PRIMARY KEY (id),
    FOREIGN KEY (enum_id) REFERENCES enum_of_enums(id)
);

insert into enum_values(type_key, description, enum_id) values ('Small Cap', 'Market Capitalization - Small Cap', 1), ('Mid Cap', 'Market Capitalization - Mid Cap', 1), ('Large Cap', 'Market Capitalization - Large Cap', 1), ('BSE', 'Exchange types - BSE', 2), ('NSE', 'Exchange types - NSE', 2), ('month', 'duration - month', 3), ('year', 'duration - year', 3), ('day', 'duration - day', 3), ('volume', 'Query type - Volume', 4), ('value', 'Query type - Value', 4), ('S', 'S/C - Standalone', 5), ('C', 'S/C - Standalone', 5), ('O', 'O/U', 6), ('U', 'O/U', 6), ('Buyers', 'Merchant type - Buyers', 7), ('Sellers', 'Merchant type - Sellers', 7);
select * from enum_values;



CREATE TABLE vendor (
    id int(11) not null auto_increment,
    name varchar(255) not null unique,
    is_active tinyint(2) default 1,
    priority tinyint(2) default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT id_pk PRIMARY KEY (id)
);

insert into vendor(name, priority) values ('CMOT', 0), ('BSE', 1), ('NSE', 2);
select * from vendor;

CREATE TABLE enum_vendor_mapping (
    id int(11) not null auto_increment,
    vendor_id int(11) not null,
    mapping_name varchar(255) default null,
    mapping_key varchar(255) default null,
    description varchar(255) default null,
    enum_value_id int(11) not null,
    is_active tinyint(2) default 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT id_pk PRIMARY KEY (id),
    FOREIGN KEY (enum_value_id) REFERENCES enum_values(id),
    FOREIGN KEY (vendor_id) REFERENCES vendor(id),
	CONSTRAINT unique_enum UNIQUE (vendor_id, mapping_name, mapping_key, enum_value_id)
);

insert into enum_vendor_mapping(vendor_id, mapping_name, mapping_key, description, enum_value_id) values (1, 'Small Cap', 'Small Cap', 'Market Capitalization - Small Cap', 1), (1, 'Mid Cap', 'Mid Cap', 'Market Capitalization - Mid Cap', 2), (1, 'Large Cap', 'Large Cap', 'Market Capitalization - Large Cap', 3), (1, 'BSE', 'BSE', 'Exchange types - BSE', 4), (1, 'NSE', 'NSE', 'Exchange types - NSE', 5), (1, 'month', 'month', 'duration - month', 6), (1, 'year', 'year', 'duration - year', 7), (1, 'day', 'day', 'duration - day', 8), (1, 'volume', 'volume', 'Query type - Volume', 9), (1, 'value', 'value', 'Query type - Value', 10), (1, 'S', 'S', 'S/C - Standalone', 11), (1, 'C', 'C', 'S/C - Standalone', 12), (1, 'O', 'O', 'O/U', 13), (1, 'U', 'U', 'O/U', 14), (1, 'Buyers', 'Buyers', 'Merchant type - Buyers', 15), (1, 'Sellers', 'Sellers', 'Merchant type - Sellers', 16);
select * from enum_vendor_mapping;

