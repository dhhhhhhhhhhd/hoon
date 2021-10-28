exports.nav = ()=>{
    const template = `
    <nav class="nav_container">
    <img src="../public/img/nav/m_menu.png" alt="메뉴" class="m_menu_btn"/>
    <div class="logo_container">
        <a href="/"><img src="../public/img/nav/logo.png" alt="로고" class="logo_img"/></a>
    </div>
    <ul class="m_menu_container">
    <img src="../public/img/main/close_icon.png" alt="닫기버튼" class="m_menu_close"/>
        <li class="m_menu_title">
            <a href="/about">회사소개</a>
        </li>
        <li>
            <a href="/about">회사소개</a>
        </li>
        <li>
            <a href="/about">photo gallery</a>
        </li>
        <li class="m_menu_title">
            <a href="/corporate">법인서비스</a>
        </li>
        <li>
            <a href="/corporate">서비스안내</a>
        </li>
        <li class="m_menu_title">
            <a href="/normal">일반고객</a>
        </li>
        <li>
            <a href="/normal">서비스안내</a>
        </li>
        <li class="m_menu_title">
            <a href="/consignment">탁송서비스</a>
        </li>
        <li>
            <a href="/consignment">서비스안내</a>
        </li>
        <li class="m_menu_title">
            <a href="/inquiry">게시판</a>
        </li>
        <li>
            <a href="/inquiry">문의게시판</a>
        </li>
        <li>
            <a href="/review">후기게시판</a>
        </li>
        <li>
            <a href="/infomation">정보게시판</a>
        </li>
    </ul>
    <ul class="menu_container">
        <li><a href="/about">회사소개</a>
        </li>
        <li><a href="/corporate">법인서비스</a>
        </li>
        <li><a href="/normal">일반고객</a>
        </li>
        <li><a href="/consignment">탁송서비스</a>
        </li>
        <li><a href="/inquiry">게시판</a>
        </li>
        <script src="../public/js/nav.js"></script>
        </ul>
        <div class="sub_menu">
            <div class="sub_menu_box">
                <ul class="sub_menu_list">
                    <li class="this_sub_menu">
                        <ul>
                            <li>
                                <a href="/about">회사소개</a>
                            </li>
                            <li>
                                <a href="/about">photo gallery</a>
                            </li>
                        </ul>
                    </li>
                    <li class="this_sub_menu">
                        <ul>
                            <li>
                                <a href="/corporate">서비스 안내</a>
                            </li>
                        </ul>
                    </li>
                    <li class="this_sub_menu">
                        <ul>
                            <li>
                                <a href="/normal">서비스 안내</a>
                            </li>
                        </ul>
                    </li>
                    <li class="this_sub_menu">
                        <ul>
                            <li>
                                <a href="/consignment">서비스 안내</a>
                            </li>
                        </ul>
                    </li>
                    <li class="this_sub_menu">
                        <ul>
                            <li>
                                <a href="/inquiry">문의게시판</a>
                            </li>
                            <li>
                                <a href="/review">후기게시판</a>
                            </li>
                            <li>
                                <a href="/infomation">정보게시판</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `
    return template;
}