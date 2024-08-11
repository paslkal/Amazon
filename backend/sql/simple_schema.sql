create database amazon;
use amazon;

create table products( 
  id varchar(255) primary key,
  `image` varchar(255) not null,
  `name` varchar(255) not null,

  rating JSON,
  /* foreign key (rating_id)   references ratings(id) */ 
  price_cents int,

  keywords JSON,
  /* foreign key (keyword_id) references keywords(id), */

  `type` varchar(50),
  /* foreign key (type_id) references types(id), */

  size_chart_link varchar(255),
  appliance_instructions varchar(255),
  appliance_warranty varchar(255)
);

create table cart(
  product_id varchar(255),
  /* foreign key (product_id) references products(id),*/
  
  quantity int not null,
  delivery_option_id varchar(1) not null
);

create table orders(
  id varchar(255) primary key,
  order_time varchar(255),
  total_cost_cents float,
  
  order_product_id int
  /* foreign key (order_product_id) references order_products(id)*/
);

create table order_products(
  id int primary key auto_increment,
  
  product_id varchar(255),
  /* foreign key (product_id) references products(id),*/
  
  estimated_delivery_time varchar(255) not null, 
  quantity int not null,
  variation boolean null
);

alter table cart add foreign key (product_id) references products(id);
alter table orders add foreign key (order_product_id) references order_products(id);
alter table order_products add foreign key (product_id) references products(id);
