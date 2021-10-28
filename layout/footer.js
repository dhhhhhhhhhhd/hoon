exports.footer = ()=>{
    const template = `
    <footer class="copyright_container">
        <img src="../public/img/footer/logo.png" alt="로고"/>
        <ul>
            <li>대표 : 정인균</li>
            <li>사업자등록번호 : 826-48-00215</li>
            <li>E-mail : speedts0124@nate.com</li>
            <li>FAX : 0505-300-2547</li>
        </ul>
        <p>Copyright © 아빠대리운전. All Rights Reserved</p>
        </footer>
        <div class="remote_box">
        <a href=""><img src="../public/img/footer/remote.png" alt="remote.jpg" usemap="#remote.jpg" style="border: 0;" /></a>

        <map name="remote.jpg">
            <area shape="rect" coords="0,0,91,79" href="/corporate" target="" alt="" style="outline:none;"/>
            <area shape="rect" coords="0,80,115,167" href="/normal" target="" alt="" style="outline:none;"/>
            <area shape="rect" coords="1,169,116,244" href="/consignment" target="" alt="" style="outline:none;"/>
            <area shape="rect" coords="1,246,100,340" href="" class="top_btn" target="" alt=""style="outline:none;" />
        </map>
        </div>
        <script src="../public/js/footer.js"></script>

    `
    return template;
}