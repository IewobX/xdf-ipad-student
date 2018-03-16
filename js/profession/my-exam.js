/**
 * @author xubowei
 * window.localStorage.studentID                                                                                        学生id
 * window.localStorage.course                                                                                           当前课程
 * */

/**
 * @author xubwowei
 * 学生考试列表界面*/
(function () {
    let courseID =window.localStorage.course.course_id;
    $.ajax({
        url: url + "auth/get/course/by/courseID",
        data: {course_id: courseID},
        success: function (result) {
            if(result.isSuccess){
                let course = result.Data;
                let html = '';
                for (let i = 0; i < course.coursePaperList.length; i++) {
                    let course_paper = course.coursePaperList[i];
                    html = renderExam(i,course_paper,course.teacher_name);
                    $('.swiper-wrapper').append($(html));
                    $('.index'+i).data('paper',course);
                }
            }
        }
    });

    /**
     * @author xubowei
     * 监听学生点击开始考试按钮*/
    $('.start-exam').click(function () {
        let paper = $(this).parents('.swiper-slide').data('paper');
        let paper_id = paper.course_paper_id;
        let studentID = window.localStorage.studentID;

        window.localStorage.paper = paper;
        $.ajax({
            url: url + "auth/get/student/exam/url/" + paper_id + "," + studentID,
            success: function (result) {
                if (!result.isSuccess) {
                    alert('提示:' + response.Msg);
                    return;
                }
                let newTab = window.open('about: blank');
                newTab.location.href = response.Data;
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
    function renderExam(i,course_paper,teacher){
        let html =
            '<div class="swiper-slide index_"' + i + '>\n' +
            '    <div class="item_">\n' +
            '        <p class="releaseWay">';
        course_paper.course_paper_issure === '1'? html += '整卷发布': html += '逐题发布';
        html += '</p>\n' +
            '        <ul>\n' +
            '            <li class="exam-type">' + course_paper.paper_name + '</li>\n' +
            '            <li class="exam-teacher">发布人:' + teacher + '</li>\n' +
            '            <li class="exam-times">考试时长:' + course_paper.paper.paper_time + 'min</li>\n' +
            '            <li class="question-num">共' + course_paper.paper.paper_num + '题</li>\n' +
            '        </ul>\n' +
            '        <div class="';
        course_paper === '2'? html += 'answer': html += 'start-exam';
        html += '"></div>\n' +
            '    </div>\n' +
            '</div>';
        return html;
    }
})();
function displayMessage(messages) {

}