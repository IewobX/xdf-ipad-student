/**
 * @author xubowei
 * 我的课程界面*/
(function () {
    $.ajax({
        url: url + 'auth/get/education/teacher/now/course',
        success: function (result) {
            if (result.isSuccess) {
                if (result.Data.length <= 0) {
                    alert("提示:您当前没有课程");
                    return;
                }
                $('#studentID').data('studentID', result.Msg);
                let html = '';
                for (let i = 0; i < result.Data.length; i++) {
                    let data = result.Data[i];
                    html += renderLesson(i, data);
                    $('.index_' + i).data('course', data);
                }
                $('.swiper-wrapper').html(html);
            }
        }
    });
    /**
     * @author xubowei
     * 监听学生点击开始上课按钮*/
    $('.lessoning').click(function () {
        let courseID = $(this).parents('.swiper-slide').data("course").course_id;
        let studentID = $('#studentID');
        $.ajax({
            url: url + "auth/get/student/course/url/" + courseID + "," + studentID,
            success: function (result) {
                if (!result.isSuccess) {
                    alert('提示:' + result.Msg);
                    return;
                }
                let newTab = window.open('about:blank');
                newTab.location.href = result.Data;
            }
        });
    });

    /**
     * @author xubowei
     * websocket 监听老师修改上课状态*/







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
            '            </ul>\n' +
            '            <span class="course_state ';
        switch (course_state) {
            case '0':
                html += 'before-lesson';
                break;
            case '1':
                html += 'lessoning';
                break;
            case '2':
                html += 'after-lesson';
                break;
            default:
                break;
        }

        html += '"></span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        return html;
    }
})();
