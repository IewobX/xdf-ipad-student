/**
 * @author xubowei
 * window.localStorage.studentID                                                                                        学生id
 * window.localStorage.localUrlPath                                                                                     url前缀
 * */
/**
 * @author xubowei
 * bug
 * 1.teacher_name传回null
 *
 * */
/**
 * @author xubowei
 * 我的课程界面*/
(function () {
    let url = window.localStorage.localUrlPath;
    initPage();
    /**
     * @author xubowei
     * websocket 监听老师修改上课状态*/
    startWebSocketServer(window.localStorage.studentID, "studentCourse");


    /**
     * @author xubowei
     * 加载页面*/
    function initPage() {
        $.ajax({
            url: url + 'auth/get/education/teacher/now/course',
            success: function (result) {
                if (result.isSuccess) {
                    if (result.Data.length <= 0) {
                        alert("提示:您当前没有课程");
                        return;
                    }
                    // $('#studentID').data('studentID', result.Msg);
                    window.localStorage.studentID = result.Msg;
                    let html = '';
                    for (let i = 0; i < result.Data.length; i++) {
                        let data = result.Data[i];
                        html += renderLesson(i, data);
                        $('.swiper-wrapper').append($(html));
                        $('.index_' + i).data('course', data);
                    }
                    // joinInClass();
                }
            }
        });
    }
    /**
     * @author xubowei
     * 监听学生点击开始上课按钮*/
    // function joinInClass() {
    //     console.log($('.lessoning'));

        // $('body').on('click','.item_ .lessoning',function () {
        //     alert(0);
        // });
        // $('.lessoning').click(function () {
        //     let course = $(this).parents('.swiper-slide').data("course");
        //     let courseID = course.course_id;
        //     let studentID = window.localStorage.studentID;
        //
        //     window.localStorage.course = course;
        //     $.ajax({
        //         url: url + "auth/get/student/course/url/" + courseID + "," + studentID,
        //         success: function (result) {
        //             if (!result.isSuccess) {
        //                 alert('提示:' + result.Msg);
        //                 return;
        //             }
        //             let newTab = window.open('about:blank');
        //             newTab.location.href = result.Data;
        //         }
        //     });
        // });
    // }
    $('body').on('click','.item_',function () {
        let course = $(this).parents('.swiper-slide').data("course");
        let courseID = course.course_id;
        let studentID = window.localStorage.studentID;

        window.localStorage.course = course;
        $.ajax({
            url: url + "auth/get/student/course/url/" + courseID + "," + studentID,
            async: false,
            success: function (result) {
                if (!result.isSuccess) {
                    alert('提示:' + result.Msg);
                    return;
                }
                console.log(result.Data);
                // let newTab = window.open('about:blank');
                // newTab.location.href = result.Data;
            }
        });
    });






    /**
     * @author xubowei
     * 初始化渲染课程界面*/
    function renderLesson(i, data) {
        let html =
            '<div class="swiper-slide index_' + i + '">\n' +
            '    <div class="item_ ">\n' +
            '        <p class="portrait">\n' +
            '            <span class="portrait-img"><img src="img/touxiang1.png"></span>\n' +
            '        </p>\n' +
            '        <div class="lesson-content">\n' +
            '            <span class="tab"></span>\n' +
            '            <p class="teacher">教师：<span>' + data.teacher_name + '</span></p>\n' +
            '            <ul>\n' +
            '                <li class="name">' + data.course_name + '</li>\n' +
            '                <li class="time">' + data.course_begin_time + '-' + data.course_end_time + '</li>\n' +
            '                <li class="location">' + data.classroom_name + '</li>\n' +
            '            </ul>\n';
        switch (data.course_state) {
            case '0':
                html += '<span class="course_state before-lesson"></span>';
                break;
            case '1':
                html += '<span class="course_state lessoning"></span>';
                break;
            case '2':
                html += '<span class="course_state after-lesson"></span>';
                break;
            default:
                break;
        }

        html +=
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        return html;
    }
})();
function displayMessage(messages) {
    console.log(messages);
}