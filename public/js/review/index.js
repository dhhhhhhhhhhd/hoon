var dataGetUrl = "/review/getList"; // 데이터를 가져올 링크
var urlType = "post"; // 데이터 방식 GET/POST
var dataType = "json"; // 데이터 형식
var maxTableColspan = 5; // 테이블 열의 갯수
var maxListLength = 8; // 보여주는 리스트 갯수
var pagingBtnLength = 5; // 페이징 버튼 갯수
var btnClickColor = "#545454"; // 페이징 버튼 클릭시 색상
var btnColor = "white";
var pagingBox = $(".paging_box"); // 페이징 박스 엘리먼트
var prev = $(".prev"); // 이전 버튼 엘리먼트
var next = $(".next"); // 다음 버튼 엘리먼트
var listContainer = $(".table_box"); // 데이터를 넣을 컨테이너 엘리먼트

listContainer.children("ul").addClass("list_space");

function failedGetData() {
    return "<tr><td colspan=" + maxTableColspan + ">게시물 없음</td></tr>";
}

function successGetData(data) {
    var dataList = "";
    for (var i = 0; i < maxListLength && i < data.length; i++) {
        // var imgResult = "../public/img/review/no_img.png";
        // if (JSON.parse(data[i].img_sum).length > 0) {
        //     imgResult = JSON.parse(data[i].img_sum)[0];
        // }
        dataList += `
        <li>
        <a href="/review/${data[i].No}">
            <div class="img_sum_box">
                <img src="${JSON.parse(data[i].img_sum)}" alt="">
                </div>
            <div class="list_info_box">
                <h3>${data[i].title}</h3>
            </div>
            <h4>
                ${data[i].name} <b> ${data[i].insert_date}</b>
            </h4>
            </a>
        </li>
        `
    }
    return dataList;
}

function pagingCreate(data, page) {
    var pagingList = "";
    var maxList = 0;
    if (page <= 1)
        page = 0;
    for (var i = page; i < (data.length / maxListLength); i++) {
        maxList++;
        if (maxList <= pagingBtnLength) {
            pagingList += `<span class="paging_btn" value="${i + 1}">${i + 1}</span>`
        }
    }
    prev.after(pagingList);
}

function resetData(data, page) {
    var dataList = "";
    var listSpace = $(".list_space");
    listSpace.empty();
    for (var i = (page - 1) * maxListLength; i < maxListLength * page; i++) {
        if (data[i] == undefined) {
            continue;
        } else {
            var imgResult = "../public/img/review/no_img.png";
            if (data[i].img_sum != undefined) {
                imgResult = JSON.parse(data[i].img_sum)[0];
            }
            dataList += `
            <li>
                <div class="img_sum_box">
                <img src="${imgResult}" alt="">
                </div>
                <div class="list_info_box">
                    <h3></h3>
                    <a href="/review/${data[i].No}">${data[i].title}</a>
                </div>
                <h4>
                ${data[i].name} <b> ${data[i].insert_date}</b>
                </h4>
            </li>
            `
        }
    }
    listSpace.append(dataList);
}

function prevClick(data) {
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.first().attr('value'));
    var pagingCreatePageResult = ((pagingBtnValue - pagingBtnLength) - 1);
    var resetDataPageResult = (pagingBtnValue - pagingBtnLength);
    if (pagingBtnValue <= 1 || pagingBtnValue - pagingBtnLength < 1) {
        return;
    } else {
        pagingBtn.remove();
        pagingCreate(data, pagingCreatePageResult);
        resetData(data, resetDataPageResult);
        $(`.paging_btn[value=${resetDataPageResult}]`).css("backgroundColor", btnClickColor).css("color", btnColor);
    }
}

function nextClick(data) {
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.last().attr('value'));

    if (pagingBtnValue >= data.length / maxListLength) {
        return;
    } else {
        pagingBtn.remove();
        pagingCreate(data, pagingBtnValue);
        resetData(data, pagingBtnValue + 1);
        $(`.paging_btn[value=${pagingBtnValue + 1}]`).css("backgroundColor", btnClickColor).css("color", btnColor);
    }
}

function pagingClick(data) {
    var pagingBtn = $(".paging_btn");
    pagingBtn.each(function () {
        $(this).on("click", function () {
            pagingBtn.removeAttr("style");
            var page = $(this).attr("value");
            $(this).css({ "backgroundColor": btnClickColor, "color": btnColor, "transitionDuration": "0.3s" });
            resetData(data, page);
        });
    });
}


$(function () {
    var list_space = $(".list_space");

    $.ajax({
        url: dataGetUrl,
        type: urlType,
        dataType: dataType,
        success: function (data) {
            var list_clone = "";
            if (data.length <= 0)
                list_clone = failedGetData();
            else
                list_clone = successGetData(data);

            list_space.append(list_clone);
            pagingCreate(data, 0);
            $(".paging_btn").eq(0).css("background-color", btnClickColor).css("color", btnColor);
            prev.on("click", function () {
                prevClick(data)
            });
            next.on("click", function () {
                nextClick(data)
            });
            pagingBox.on("mouseover", function () {
                pagingClick(data);
            });
        }, error: function () {
            console.log("Failed to fetch Data");
        }
    });
});

