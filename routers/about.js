const express = require('express');
const router = express.Router();

// layout router
const nav = require('../layout/nav');
const content = require('../layout/about');
const footer = require('../layout/footer');

router.get('/about', (req,res)=>{
    const render = {
        nav:nav.nav(),
        header:"",
        content:content.content(),
        footer:footer.footer(),
        css:"sub_page"
    }
    res.render('index', render);
});

module.exports = router;