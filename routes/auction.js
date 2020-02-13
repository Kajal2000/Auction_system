const express = require('express');
const app = express.Router();
const appDB  = require("../model/auctionDB")

app.post("/api",(req,res)=>{
    data = {
        auction_name : req.body.auction_name,
        price : req.body.price
    }
    appDB.insert_data(data)
        .then((s_data)=>{
            res.send(s_data)
        }).catch((err)=>{ 
            console.log(err)
        })
    })

app.get("/api/:auction_id",(req,res)=>{
    let auction_id = req.params.auction_id
    var data_1 = appDB.get_by_id(auction_id);
    data_1.then((data)=>{
        let auction_id = data[0]["auction_id"]
        if (data[0]["price"] < req.body.bidder_price){
            let store = {
                "bidder_name" : req.body.bidder_name,
                "bidder_price" : req.body.bidder_price,
                "auction_id" : auction_id
            }
            appDB.insert_bidder(store)
            .then(()=>{
                res.send("insert data")
            }).catch((err)=>{ 
                console.log(err)
            })
        }
    })
})

// app.delete("/delapi/:auction_id",(req,res)=>{
//     let auction_id = req.params.auction_id
//     var data = appDB.del_bidder(auction_id)
//         data.then((Resp)=>{
//             res.json(Resp)
//         })
//     });
module.exports = app;