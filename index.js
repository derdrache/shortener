var express = require("express");
var app = express();

var eingabe;


app.get("/:url*", function(req, res){
    
    var url = req.params.url+req.params[0];
    var checkUrl = new RegExp("^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");

    if (!checkUrl.test(url)){
        res.send("Please enter a valid URL");
        
    }else { 
        eingabe = url;
        
        
        
        
        
        
        
        
        
        
        res.send("looks good");
    }            
});



app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})