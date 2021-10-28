const express = require('express');
const router = express.Router();

// layout router
const nav = require('../layout/nav');
const header = require('../layout/header');
const main = require('../layout/main');
const footer = require('../layout/footer');

router.get('/', (req,res)=>{
    const render = {
        nav:nav.nav(),
        header:header.header(),
        content:main.main(),
        footer:footer.footer(),
        css:"main"
    }
    res.render('index', render);
});

module.exports = router;