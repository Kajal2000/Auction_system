let knex = require('./connection.js')

// first tbl 
knex.schema.createTable('auctioneer_data', (table) => {
    table.string('auction_name');
    table.integer('price');
    table.increments('auction_id');
    })
    .then(()=>{
        console.log("tbl created")
    }).catch((err)=>{
        console.log("there are some error")
    })

// sec tbl
knex.schema.createTable('Bidder_data_tbl', (table) => {
    table.string('bidder_name');
    table.integer('bidder_price');
    table.increments('bidder_id');
    })
    .then(()=>{
        console.log("tbl created")
    }).catch((err)=>{
        console.log("there are some error")
    })