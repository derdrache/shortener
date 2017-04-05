var express = require("express");
var app = express();
var mongoClient = require("mongodb").MongoClient;
var dburl = "mongodb://localhost:27017/shortener"
var open = require("openurl");
const appUrl ="https://api-projects-derdrache.c9users.io/"; //muss für heroku geändert werden

app.get("/:url*", function(req, res){
  
    const url = req.params.url+req.params[0];
    const checkUrl = new RegExp("^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");

    if (!isNaN(url)) {
        var newUrl = appUrl+url;
        
        mongoClient.connect(dburl, function(err,db){
            db.collection("urlchange").find({}).toArray(function(err,result){
            
                for (var i = 0; i<result.length; i++){
                    if (newUrl == result[i].shortUrl){
                    res.redirect(result[i].originalUrl);    
                    break;
                }   }
            
                db.close();
            });
        });    
        
   
        
        
    }else if (!checkUrl.test(url)){
        res.send(url);
        
    }else { 
       
        mongoClient.connect(dburl, function(err,db){
            if (err) {console.log("db connect error", err);
        } else{
            db.collection("urlchange").find({},{_id: 0}).toArray(function(err, result){
            if (err){res.send("we have a problem");} 
            else if (result.length){
                var check = 0;
                for (var i = 0; i<result.length; i++){
                if (url == result[i].originalUrl){res.send(result[i]); break;}
                  check++;
                  
                  
                }
                //was ist wenn url nicht in der db 
                if (check === result.length){
                    var urlNew = appUrl + (result.length+1)
                  db.collection("urlchange").insert({
                        originalUrl: url,
                        shortUrl: urlNew
                    })
                    res.send({"originalUrl": url, "shortUrl": urlNew})
                }
                
                
            }else {res.send("no documents found")}
            
            db.close();
            
            });
        }
        })
        
    }            
});



app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})