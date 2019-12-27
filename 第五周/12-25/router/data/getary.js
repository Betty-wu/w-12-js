let express = require("express");
let router = express.Router();
// "/"代表的是"/getary"
router.get("/",(req,res)=>{
    // console.log('===');
    setTimeout(()=>{
      res.json({code:0,ary:[1,2,3]})
    },4000)
})

module.exports = router;


