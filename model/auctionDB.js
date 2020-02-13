let knex = require('../connection.js')

let insert_data = (data) => {
    return knex("auctioneer_data").insert(data)
}

let get_by_id = (auction_id) =>{
    return knex("auctioneer_data")
    .select("*")
    .where("auctioneer_data.auction_id",auction_id)
}


let insert_bidder = (store) => {
    return knex("Bidder_data_tbl").insert(store)

}

// let del_bidder = (auction_id) => {
//     return knex("Bidder_data_tbl").del(auction_id)

// }

module.exports = {insert_data,get_by_id,insert_bidder}
