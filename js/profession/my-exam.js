/**
 * @author xubowei
 * window.localStorage.studentID                                                                                        学生id
 * window.localStorage.course                                                                                           当前课程
 * window.localStorage.localUrlPath                                                                                     url前缀
 * */

/**
 * @author xubwowei
 * 学生考试列表界面*/
(function () {
    // let courseID = JSON.parse(window.localStorage.course).course_id;
    let url = window.localStorage.localUrlPath;
    $.ajax({
        url: url + "auth/get/course/by/courseID",
        data: {course_id: JSON.parse(window.localStorage.course).course_id},
        success: function (result) {
            if (result.isSuccess) {
                let course = result.Data;

                for (let i = 0; i < course.coursePaperList.length; i++) {
                    let html = '';
                    let course_paper = course.coursePaperList[i];
                    html = renderExam(i, course_paper, course.teacher_name);
                    $('.swiper-wrapper').append($(html));
                    $('.index_' + i).data('paper', course.coursePaperList[i]);
                }
            }
        }
    });

    /**
     * @author xubowei
     * 监听学生点击开始考试按钮*/
    $('body').on('click','.start-exam',function () {
        let paper = $(this).parents('.swiper-slide').data('paper');
        let paper_id = paper.course_paper_id;
        let studentID = window.localStorage.studentID;

        window.localStorage.paper = paper;
        $.ajax({
            url: url + "auth/get/student/exam/url/" + paper_id + "," + studentID,
            async: false,
            success: function (result) {
                if (!result.isSuccess) {
                    alert('提示:' + response.Msg);
                    return;
                }
                let newTab = window.open('about: blank');
                newTab.location.href = window.localStorage.localUrlPath + result.Data;
            }
        })
    });
    /**
     * @author xubowei
     * websocket 监听老师是否开始考试*/
    startWebSocketServer(window.localStorage.course.course_id, "studentCourse");



    /**
     * @author xubowei
     * 初始化学生试卷列表界面*/
    function renderExam(i, course_paper, teacher) {
        let html =
            '<div class="swiper-slide index_' + i + '">\n' +
            '    <div class="item_">\n' +
            '        <p class="releaseWay">';
        html += course_paper.course_paper_issure === '1' ? '整卷发布' : '逐题发布';
        html += '</p>\n' +
            '        <ul>\n' +
            '            <li class="exam-type">' + course_paper.paper_name + '</li>\n' +
            '            <li class="exam-teacher">发布人:' + teacher.split(' ')[0] + '</li>\n' +
            '            <li class="exam-times">考试时长:' + '' + 'min</li>\n' +
            '            <li class="question-num">共' + '' + '题</li>\n' +
            '        </ul>\n' +
            '        <div class="';
        html += course_paper === '2' ? 'answer' : 'start-exam';
        html += '"></div>\n' +
            '    </div>\n' +
            '</div>';
        return html;
    }
})();

function displayMessage(messages) {

}