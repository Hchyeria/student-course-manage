const APIError = require('../middleware/rest').APIError
const sequelize = require('./../model/index')
const Student = require('../model/models/Student')
const Course = require('../model/models/Course')
const Selection = require('../model/models/Selection')

var getStudentSelectInfo = async (sid) =>{
    let select_info;
    try{
        select_info = await sequelize.query(
            `select C.*, S.select_year, S.score
            from selections S, courses C
            where S.student_sid = :sid and S.course_cid = C.cid`,
            { 
                replacements: { sid: sid },
                type: sequelize.QueryTypes.SELECT 
            }
        )
    }
    catch{
        throw new APIError('select:not_found', '无法查询')
    }
    select_info = select_info.length? select_info : null
    return select_info
}


var getALLStudent = async (ctx, next) => {
    let query_info = ctx.query;
    let page = query_info.page;
    let student = await Student.findAll()
    let star = page? (20*(page-1))+1 : 0;
    if(page === 1) star = 0
    ctx.rest(student.slice(star,star+20))
}


var getInfoStudent = async(ctx, next) =>{
    let query_info = ctx.query;
    let sid = query_info.sid;
    let sname = query_info.sname;
    let s_info;
    if(sid){
        s_info = await Student.findAll({
            where:{
                sid: sid
            }
        })
        if(sname){
            if(sname !== s_info[0].dataValues.sname){
                throw new APIError('student:not_found', '学号与姓名不符');
            }
        }
    }
    else if(sname){
        s_info = await Student.findAll({
            where:{
                sname: sname
            }
        })
        sid = s_info[0].dataValues.sid
    }
    else{
        throw new APIError('student:not_found', '缺少 sid|sname')
    }
    if(!s_info.length){
        throw new APIError('student:not_found', '没有找到此学生')
    }
    let info = Object.assign({}, s_info[0].dataValues)
    let select_info = await getStudentSelectInfo( sid)
    info.select_info = select_info
    ctx.rest(info)
}

var addStudent = async (ctx, next) => {
    let post_body = ctx.request.body;
    if(JSON.stringify(post_body) === "{}"){
        throw new APIError('student:add_erro', '信息不能为空')
    }
    let gender = post_body.gender
    if(gender){
        if(gender !== "男" && gender !== "女"){
            throw new APIError('student:add_erro', '性别错误')
        }
    }
    try{
        let select_info = await Student.create(post_body);
        ctx.rest(select_info)
    }
    catch{
        throw new APIError('student:add_erro', '无法添加')
    }
}

var changeStudent = async (ctx, next) => {
    let post_body = ctx.request.body;
    let sid = post_body.sid
    let gender = post_body.gender
    if(gender){
        if(gender !== "男" && gender !== "女"){
            throw new APIError('student:update_erro', '性别错误')
        }
    }
    delete post_body.sid
    if(!sid || sid.length !== 10){
        throw new APIError('student:not_found', '错误的学号')
    }
    let student
    try{
        student = await Student.update(
            post_body,
            {
                where: {
                    sid: sid
            }
        })
    }
    catch{
        throw new APIError('student:update_erro', '无法更新')
    }
    if(!student.length || !student){
        throw new APIError('student:not_found', '错误的学号')
    }
    ctx.rest(post_body, 'student:update_success')
}

var deletStudent = async (ctx, next) => {
    let post_body = ctx.request.body;
    let sid = post_body.sid
    let sel_info
    try{
        let sql = `delete 
            from students
            where sid = :sid;`
        sel_info = await sequelize.query(
            sql,
            { 
                replacements: { sid: sid },
                type: sequelize.QueryTypes.DELETE
            }
        )
    }
    catch{
        throw new APIError('student:delet_erro', '无法删除')
    }
    ctx.rest({sid: sid},'student:delet_success')
}

var addCourse = async (ctx, next) =>{
    let post_body = ctx.request.body;
    if(JSON.stringify(post_body) === "{}"){
        throw new APIError('course:add_erro', '信息不能为空')
    }
    let add_info
    try{
        add_info = await Course.create(post_body)
    }
    catch{
        throw new APIError('course:add_error', '添加课程失败')
    }
    ctx.rest(add_info, 'course:add_success')
}

var getCourse = async (ctx, next) =>{
    let query_info = ctx.query;
    let sid = query_info.sid
    course_info = await Course.findAll()
    if(!sid){
        ctx.rest(course_info)
    }
    else{
        let select_info = await getStudentSelectInfo(sid)
        if(!select_info){
            let res = course_info.map(ele => {
                ele.dataValues['isselect'] = 0
                return ele.dataValues
            })
            ctx.rest(res)
        }
        else{
            let sel_cids = select_info.reduce((aac, val) => (aac.push(val.cid), aac) , [])
            let res = course_info.map(ele =>{
                if(sel_cids.indexOf(ele.dataValues.cid) > 0){
                    ele.dataValues['isselect'] = 1
                }
                else{
                    ele.dataValues['isselect'] = 0
                }
                return ele.dataValues
            })
            ctx.rest(res)
        }

    }
}

/* var getCourseById = async (ctx, next) =>{
    let sid = ctx.params.sid
    if(!sid){
        throw new APIError('student:not_found', '错误的学号')
    }
    let select_info = await getStudentSelectInfo(sid)
    if(!select_info){
        throw new APIError('student:not_found', '错误的学号')
    }
    ctx.rest(select_info)
} */

var getCourseInfo = async(ctx, next) =>{
    let query_info = ctx.query;
    let cid = query_info.cid
    let page = query_info.page;
    let star = page? (20*(page-1))+1 : 0;
    if(page === 1) star = 0;
    let cname = query_info.cname
    if(!cid && !cname){
        throw new APIError('course:info_select_erro', '请求不能为空')
    }
    function foo(course_info){
        if(!course_info || !course_info.length){
            throw new APIError('course:not_found', '没有找到此课程')
        }
    }
    let course_info
    if(cid){
        course_info = await Course.findAll({
            where:{
                cid: cid
            }
        })
        foo(course_info)
    }
    else{
        course_info = await Course.findAll({
            where:{
                cname: cname
            }
        })
        foo(course_info)
        cid = course_info[0].dataValues.cid
    }
    try{
        let sql = `select S1.* , S.select_year, S.score
                    from selections S, students S1
                    where S.course_cid = :cid and S.student_sid = S1.sid;`
        let select_info = await sequelize.query(
            sql,
            { 
                replacements: { 
                    cid: cid 
                },
                type: sequelize.QueryTypes.SELECT 
            }
        )
        if(!select_info.length || !select_info){
            ctx.rest(Object.assign({}, course_info,{
                select_info: null
            }))
        }
        select_info = select_info.slice(star, star+20)
        let info = select_info
        .reduce((aac, val) =>{ 
            if(aac[val.sid]){
                aac[val.sid].slection_info.push({[val.select_year]: val.score})
            }
            else{
                aac[val.sid] = {
                    sname: val.sname, 
                    gender: val.gender, 
                    class_id: val.class_id, 
                    entrance_year: val.entrance_year, 
                    slection_info: [{[val.select_year]: val.score}]     
                }
            }   
            return aac;
        }, {})
        info = Object.keys(info).reduce((aac, val) => (aac.push(Object.assign({}, {sid: val}, info[val])), aac), [])
        ctx.rest(Object.assign({}, course_info[0].dataValues,{
            select_info: info
        }))
    }
    catch{
        ctx.rest(Object.assign({}, course_info,{
            select_info: null
        }))
    }
}

var changeCourse = async(ctx, next) =>{
    let post_body = ctx.request.body;
    let cid = post_body.cid
    delete post_body.cid
    if(!cid){
        throw new APIError('course:not_found', '请求不能为空')
    }
    let slection;
    try{
        slection = await Course.update(
            post_body,
            {
                where: {
                    cid: cid
                }
            }
        )
    }
    catch{
        throw new APIError('course:update_erro', '无法更新')
    }
    if(!slection || !slection.length){
        throw new APIError('course:not_found', '错误的课程号')
    }
    ctx.rest(post_body,'course:update_success')
}

var deletCourse = async(ctx, next) =>{
    let post_body = ctx.request.body;
    let cid = post_body.cid
    if(!cid){
        throw new APIError('course:not_found', '请求不能为空')
    }
    let del_info
    try{
        let sql = `delete
                from courses
                where cid = ${cid};`
        del_info = await sequelize.query(
            sql,
            { 
                type: sequelize.QueryTypes.DELETE
            }
        )
    }
    catch{
        throw new APIError('course:delet_error', '无法删除')
    }
    ctx.rest('删除成功!', 'course:delet_success')
}

var addSlection = async (ctx, next) =>{
    let time = new Date().getFullYear()
    let post_body = ctx.request.body;
    let sid = post_body.sid
    let cid = post_body.cid
    function pro_fail(cid, cname, message){
        this.cid = cid,
        this.cname = cname,
        this.message = message || '已选择课程'
    }
    let fail = [];
    if(!sid){
        throw new APIError('student:not_found', '错误的学号')
    }
    if(!cid.length){
        throw new APIError('course:not_found', '课程编号不能为空')
    }

    let student_info = await Student.findAll({
        where: {
            sid: sid
        }
    })
    if(!student_info || !student_info.length){
        throw new APIError('student:not_found', '错误的学号')
    }
    let select_info;
    let already_select = await getStudentSelectInfo(sid);
    let isCidString = Object.prototype.toString.call(cid[0]).slice(8, -1) === 'String'
    if(already_select){
        already_select.forEach(ele =>{
            let temp = isCidString? ele.cid + '' : ele.cid
            let index = cid.indexOf(temp)
            if(index >= 0 && time === ele.select_year){
                cid.splice(index, 1)
                fail.push(new pro_fail(ele.cid, ele.cname))
            }
        })
    }
    if(!cid.length){
        throw new APIError('course:erro', '已选择课程')
    }
    let cid_string = JSON.stringify(cid).replace('[','(').replace(']',')')
    try{
        let sql = `select *
        from courses
        where cid in ${cid_string};`
        select_info = await sequelize.query(
            sql,
            { 
                type: sequelize.QueryTypes.SELECT 
            }
        )
    }
    catch{
        throw new APIError('course:not_found', '查询课程信息失败')
    }
    let items = []
    select_info.forEach(element => {
        if(student_info[0].dataValues.entrance_year <= element.suit_grade){
            if((+time) <= element.cancel_year){
                let item = {
                    student_sid: sid,
                    course_cid: element.cid,
                    select_year: time,
                    score: (Math.random()*40 + 60).toFixed(1)
                }
                items.push(item)
            }
            else{
                fail.push(new pro_fail(element.cid, element.cname, '课程已取消'))
            }
        }
        else{
            fail.push(new pro_fail(element.cid, element.cname, '课程需要更高年级'))
        }
    });
    let info;
    let real_select = await Selection.bulkCreate(items)
    if(!real_select.length){
        info = Object.assign({}, {
            status: false,
            code: 'selection_fail',
            fail: fail.length? fail : null,
        }, {real_select: real_select})
        ctx.rest(info)
        return;
    }
    info = Object.assign({}, {
        status: true,
        code: 'selection_success',
        fail: fail.length? fail : null,
    }, {real_select: real_select})
    ctx.rest(info)
}

var changeSlection = async (ctx, next) =>{
    let post_body = ctx.request.body;
    let sid = post_body.sid
    let cid = post_body.cid
    let select_year = post_body.select_year
    delete post_body.sid
    delete post_body.cid
    delete post_body.select_year
    if(!sid || !cid || !select_year){
        throw new APIError('slection:not_found', '请求不能为空')
    }
    let slection
    try{
        slection = await Selection.update(
            post_body,
            {
                where: {
                    student_sid: sid,
                    course_cid: cid,
                    select_year: select_year
                }
            }
        )
    }
    catch{
        throw new APIError('slection:update_erro', '无法更新')
    }
    if(!slection || !slection[0]){
        throw new APIError('slection:not_found', '错误的学号和课程号和选课年份')
    }
    ctx.rest(post_body, 'slection:update_success')
}

var deletSlection = async (ctx, next) =>{
    let query_info = ctx.request.body;
    let sid = query_info.sid
    let cid = query_info.cid
    if(!sid){
        throw new APIError('student:not_found', '错误的学号')
    }
    if(!cid.length){
        throw new APIError('course:not_found', '课程编号不能为空')
    }
    function pro_fail(cid, cname, message){
        this.cid = cid,
        this.cname = cname || '',
        this.message = message || ''
    }
    let fail = []
    let already_select = await getStudentSelectInfo(sid)
    if(!already_select){
        throw new APIError('selection:erro', '还没有选课')
    }
    let already_select_cid = already_select.reduce((aac, val) => (aac.push(val.cid), aac ), [])
    let res_cid = []
    cid.forEach((ele, i) =>{
        let index = already_select_cid.indexOf((+ele)) 
        if(index < 0){
            fail.push(new pro_fail(ele.cid, '还没有选择课程'))
        }
        else{
            res_cid.push(ele)
        }
    })
    if(!res_cid.length){
        throw new APIError('selection:erro', '没有选择课程无法删除')
    }
    let cid_string = JSON.stringify(res_cid).replace('[','(').replace(']',')')
    try{
        let sql = `delete
            from selections
            where student_sid = :sid and course_cid in ${cid_string};`
        let sel_info = await sequelize.query(
            sql,
            { 
                replacements: { 
                    sid: sid
                },
                type: sequelize.QueryTypes.DELETE
            }
        )
        ctx.rest('删除成功!','selection:delet_success')
    }
    catch{
        throw new APIError('selection:delet_erro', '无法删除')
    }
}

var getAvgScore = async (ctx, next) =>{
    let query_info = ctx.query;
    let sid = query_info.sid
    let cid = query_info.cid
    let class_id = query_info.class_id
    if(!sid && !cid && !class_id){
        throw new APIError('slection:not_found', '请求不能为空')
    }
    if(sid && cid){
        throw new APIError('slection:getAvgScore_erro', '不能 sid 和 cid 都传 我哭了')
    }
    var foo = async (type_id, query, id_string, class_query=0) =>{
        try{
            let sql = `select avg(score) as total_avg
                        from selections
                        where ${query} = ${type_id};`
            if(class_query){
                sql = `select avg(score) as total_avg
                        from selections
                        where student_sid in (
                            select sid
                            from students
                            where class_id = ${class_id}
                        );`
            }
            let select_info_total = await sequelize.query(
                sql,
                { 
                    type: sequelize.QueryTypes.SELECT 
                }
            )
            if(!select_info_total || !select_info_total[0].total_avg){
                throw new APIError('slection:getAvgScore_erro', '错误的学号或者课程号或班级号')
            }
            sql = `select avg(score) as avg_score, select_year
                    from selections
                    where ${query} = ${type_id}
                    group by select_year;`
            if(class_query){
                sql = `select avg(score) as avg_score, select_year
                        from selections
                        where student_sid in (
                            select sid
                            from students
                            where class_id = ${class_id}
                        )
                        group by select_year;`
            }
            let select_info_detail = await sequelize.query(
                sql,
                { 
                    type: sequelize.QueryTypes.SELECT 
                }
            )
            let info = Object.assign(
                {}, 
                select_info_total[0], 
                {
                    [id_string]: type_id, 
                    'select_info_detail': select_info_detail
                })
            if(id_string === 'cid'){
                let sql = `select avg(score) as avg_score, select_year, C.class_id
                        from selections,
                            (select class_id, sid
                            from students
                            ) C
                        where course_cid = ${type_id} and C.sid = student_sid
                        group by select_year, C.class_id;`     
                let select_info_detail_class = await sequelize.query(
                    sql,
                    { 
                        type: sequelize.QueryTypes.SELECT 
                    }
                )
                let temp = select_info_detail_class
                .reduce((aac, val) =>{

                    if(aac[val.select_year]){
                        aac[val.select_year].data.push({[val.class_id]: val.avg_score})
                    }
                    else{
                        aac[val.select_year] = {yaer: val.select_year, data: [{[val.class_id]: val.avg_score}]}
                    }
                    return aac;
                }  , {})
                let temp_array = []
                Object.keys(temp).forEach(ele => temp_array.push(temp[ele]))
                info = Object.assign({}, info, {'select_info_year': temp_array})
            }
            return info
        }
        catch{
            throw new APIError('slection:getAvgScore_erro', '无法查询')
        }
    }
    let res_info;
    if(sid){
        res_info = await foo(sid, 'student_sid', 'sid')
    }
    if(cid){
        res_info = await foo(cid, 'course_cid', 'cid')
    }
    if(class_id){
        res_info = await foo(class_id, 'class_i', 'class_id', 1)
    }
    ctx.rest(res_info)
}

var getScoreInfo = async(ctx, next) =>{
    let query_info = ctx.query;
    let class_id = query_info.class_id
    let cid = query_info.cid
    if(!class_id && !cid){
        throw new APIError('class:not_found', '请求不能为空')
    }
    var foo = async (start, total, isClass=0,isdetail=0, isFull=0, isBad=0) =>{
        let sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                    from selections
                    where score between ${start} and ${start + 9} and
                    course_cid = ${cid}
                    ${isdetail? 'group by select_year' : ''};`
        if(isClass){
            sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                    from selections
                    where score between ${start} and ${start + 9} and
                    student_sid in (
                        select sid
                        from students
                        where class_id = ${class_id}
                    )
                    ${isdetail? 'group by select_year' : ''};`
        }
        if(isFull){
            sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                    from selections
                    where score = 100 and
                    course_cid = ${cid}
                    ${isdetail? 'group by select_year' : ''};`
            if(isClass){
                sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                from selections
                where score = 100 and
                student_sid in (
                    select sid
                    from students
                    where class_id = ${class_id}
                )
                ${isdetail? 'group by select_year' : ''};`
            }

        }
        if(isBad){
            sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                    from selections
                    where score < 60 and
                    course_cid = ${cid}
                    ${isdetail? 'group by select_year' : ''};`
            if(isClass){
                sql = `select count(*) as num, count(*)/${total} as fraction${isdetail? ', select_year' : ''}
                from selections
                where score < 60 and
                student_sid in (
                    select sid
                    from students
                    where class_id = ${class_id}
                )
                ${isdetail? 'group by select_year' : ''};`
            }

        }
        let select_info_total = await sequelize.query(
            sql,
            { 
                type: sequelize.QueryTypes.SELECT 
            }
        )
        return select_info_total
    }
    let total
    try{
        let sql 
        if(cid){
            sql = `select count(*) as total
                    from selections
                    where course_cid = ${cid};`
        }
        if(class_id){
            sql = `select count(*) as total
                    from selections
                    where student_sid in (
                        select sid
                        from students
                        where class_id = ${class_id}
                    );`
        }
        let total_count = await sequelize.query(
            sql,
            { 
                type: sequelize.QueryTypes.SELECT 
            }
        )
        if(!total_count || !total_count.length){
            throw new APIError('selection:class_error', '无法查询')
        }
        total = total_count[0].total
    }
    catch{
        throw new APIError('selection:class_error', '无法查询')
    }
    let res_info = {}
    let info = [];
    if(!total){
        throw new APIError('selection:class_not_found', '没有选课信息')
    }
    res_info.total = total
    if(cid){
        let bad_total = await foo(0, total, 0, 0, 0, 1)
        let bad_detail = await foo(0, total, 0, 1, 0, 1)
        info.push(Object.assign({satrt: 0}, bad_total [0], {'select_info_detail': bad_detail}))
        for(let i=60; i<100; i+=10){
            let temp_total = await foo(i, total)
            let temp_detail = await foo(i, total, 0, 1)
            info.push(Object.assign({satrt: i}, temp_total[0], {'select_info_detail': temp_detail}))
        }
        let full_total = await foo(0, total, 0, 0, 1)
        let full_detail = await foo(0, total, 0, 1, 1)
        info.push(Object.assign({satrt: 100}, full_total[0], {'select_info_detail': full_detail}))
    }
    if(class_id){
        let bad_total = await foo(0, total, 1, 0, 0, 1)
        let bad_detail = await foo(0, total, 1, 1, 0, 1)
        info.push(Object.assign({satrt: 0}, bad_total [0], {'select_info_detail': bad_detail}))
        for(let i=60; i<100; i+=10){
            let temp_total = await foo(i, total, 1)
            let temp_detail = await foo(i, total, 1, 1)
            info.push(Object.assign({satrt: i}, temp_total[0], {'select_info_detail': temp_detail}))
        }
        let full_total = await foo(0, total, 1, 0, 1)
        let full_detail = await foo(0, total, 1, 1, 1)
        info.push(Object.assign({satrt: 100}, full_total[0], {'select_info_detail': full_detail}))
    }
    res_info.data = info
    ctx.rest(res_info)
}

var getScore = async(ctx, next) =>{
    let query_info = ctx.query;
    let sid = query_info.sid
    let sname = query_info.sname
    let cid = query_info.cid
    let cname = query_info.cname
    if(!sid && !sname){
        throw new APIError('student:not_found', '学生信息不能为空')
    }
    if(!cid && !cname){
        throw new APIError('course:not_found', '课程信息不能为空')
    }
    try{
        let  sql
        if(sid && cid){
            sql = `select score
                from selections
                where course_cid = ${cid} and student_sid = ${sid}`
        }
        else if(sid){
            sql = `select score
                from selections
                where student_sid = ${sid} and
                course_cid =
                (
                    select cid
                    from courses
                    where cname = '` + cname + "')"
        }
        else if(cid){
            sql = `select score
                from selections
                where course_cid = ${cid} and
                student_sid =
                (
                    select sid
                    from students
                    where sname = '` + sname + "')"
        }
        else{
            sql = `select score
                from selections
                where course_cid =
                (
                    select cid
                    from courses
                    where cname = '` + cname + "')"
                + ` and
                student_sid =
                (
                    select sid
                    from students
                    where sname = '` + sname + "')"
        }
        let select_score = await sequelize.query(
            sql,
            { 
                type: sequelize.QueryTypes.SELECT 
            }
        )
        if(!select_score || !select_score.length){
            throw new APIError('score:get_error', '无法获得成绩')
        }
        ctx.rest(select_score)

    }
    catch{
        throw new APIError('score:get_error', '无法获得成绩')
    }
}

var loginFunc = async (ctx, next) =>{
    let query_info = ctx.request.body;
    let sid = query_info.sid
    let sname = query_info.sname
    if(!sid || !sname){
        throw new APIError('student:not_found', '输入非法')
    }
    let student
    try{
        student = await Student.findAll({
            where:{
                sid: sid
            }
        })
    }
    catch{
        throw new APIError('student:login_error', '无法登陆')
    }
    if(!student || !student.length){
        throw new APIError('student:not_found', '没有找到此学生')
    }
    if(student[0].dataValues.sname !== sname){
        throw new APIError('student:not_found', '学号姓名不符')
    }
    ctx.rest(student[0])
}


module.exports = [
    {
        method: 'GET',
        path: '/api/student',
        func: getALLStudent
    },
    {
        method: 'GET',
        path: '/api/student/info',
        func: getInfoStudent
    },
    {
        method: 'POST',
        path: '/api/student',
        func: changeStudent
    },
    {
        method: 'POST',
        path: '/api/student/delet',
        func: deletStudent
    },
    {
        method: 'POST',
        path: '/api/student/add',
        func: addStudent
    },
    {
        method: 'GET',
        path: '/api/course',
        func: getCourse
    },
    {
        method: 'POST',
        path: '/api/course',
        func: changeCourse
    },
    {
        method: 'POST',
        path: '/api/course/add',
        func: addCourse
    },
    {
        method: 'POST',
        path: '/api/course/delet',
        func: deletCourse
    },
    {
        method: 'GET',
        path: '/api/course/info',
        func: getCourseInfo
    },
    {
        method: 'POST',
        path: '/api/selection/add',
        func: addSlection
    },
    {
        method: 'POST',
        path: '/api/selection',
        func: changeSlection
    },
    {
        method: 'POST',
        path: '/api/selection/delet',
        func: deletSlection
    },
    {
        method: 'GET',
        path: '/api/score',
        func: getScore
    },
    {
        method: 'GET',
        path: '/api/score/avg',
        func: getAvgScore
    },
    {
        method: 'GET',
        path: '/api/score/info',
        func: getScoreInfo
    },
    {
        method: 'POST',
        path: '/api/login',
        func: loginFunc
    }
];