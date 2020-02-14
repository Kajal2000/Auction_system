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
    setTimeout(() => data_1.then((data)=>{
        for(var k = 0; k<data.length; k++ ){
        let auction_id = data[k]["auction_id"]
        if (data[k]["price"] < req.body.bidder_price){
            let store = {
                "bidder_name" : req.body.bidder_name,
                "bidder_price" : req.body.bidder_price,
                "auction_id" : auction_id,
                "bidder_id" :req.body.bidder_id
            }
            appDB.insert_bidder(store)
            .then(()=>{
                res.send("insert data")
            }).catch((err)=>{ 
                console.log(err)
            })
        }
        }
    }),1000)
})


app.get("/get_max/:auction_id",(req,res)=>{
    let auction_id = req.params.auction_id
    var data1 = appDB.get_id(auction_id);
    data1.then((res_data)=>{
        var max_data = []
        for(let i = 0; i < res_data.length; i++){
        let data = (res_data[i]["bidder_price"])
        max_data.push(data)
        var max_value = Math.max(...max_data)
        }
        for( let j = 0; j <res_data.length; j++){
            let data = res_data[j]["bidder_price"]
            if(data == max_value){
                let name = res_data[j]["bidder_name"]
                let price = max_value
                let bidder_id = res_data[j]["bidder_id"]
                let auction_id = res_data[j]["auction_id"]
            let won_data = {
                name : name,
                price : price,
                bidder_id : bidder_id,
                auction_id : auction_id
            }
        res.send(won_data)
            }
        }
    }).catch((err)=>{
        console.log(err);
    })     
});


// app.delete("/delapi/:auction_id",(req,res)=>{
//     let auction_id = req.params.auction_id
//     var data = appDB.del_bidder(auction_id)
//         data.then((Resp)=>{
//             res.json(Resp)
//         })
//     });
module.exports = app;