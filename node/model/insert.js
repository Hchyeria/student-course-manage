const fs = require('fs-extra');
const XLSX = require('xlsx');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Selection = require('./models/Selection');
const sequelize = require('./index')

let files = fs.readdirSync(__dirname + '/data');

function pro_erroMsg(code, msg){
    this.code = code || 'internal:unknown_error'
    this.message = msg || ''
}


var workbookList = (() =>{
    let workbookList = {}
    files.filter(f => f.endsWith('.xlsx')).forEach(ele =>{
        let name = ele.substring(0, ele.length - 5);
        workbookList[name] = XLSX.readFile(__dirname + '/data/' + ele)
    })
    return workbookList
})();


var ins_student = async (iscreate) => {
    iscreate && await Student.sync({force: true});
    let sheetNames = workbookList.student.SheetNames
    sheetNames.forEach((ele, index) =>{
        let worksheet = workbookList.student.Sheets[ele]
        let datajson =  XLSX.utils.sheet_to_json(worksheet)
        datajson.forEach(ele =>{
            let item = Object.keys(ele).reduce((aac, val) => (aac[val] = ele[val], aac), {})
            item.entrance_age = 17
            item.class_id = index + 1
            Student.create(item);
        })

    })
}

var ins_course = async (iscreate) => {
    iscreate && await Course.sync({force: true});
    let sheetNames = workbookList.course.SheetNames
    let worksheet = workbookList.course.Sheets[sheetNames[0]]
    let datajson =  XLSX.utils.sheet_to_json(worksheet)
    datajson.forEach(ele =>{
        let item = Object.keys(ele).reduce((aac, val) => (aac[val] = ele[val], aac), {})
        Course.create(item);
    })
}

function save_to_xlsx() {
    this.student_ref = 2
    this.select_ref = 2
    this.fn = async function (data, type, path){
        let num, SheetNames, headers;
        let leng = data.length
        switch (type){
            case 'student': {
                num = this.student_ref
                SheetNames = '软1'
                //headers = ['sid', 'entrance_age', 'sname', 'gender']
                break;
            }
            case 'selection': {
                num = this.select_ref
                SheetNames = 'Sheet1'
                //headers = ['sltid', 'student_sid', 'course_cid', 'select_year', 'score']
                break;
            }
            default: num = 1;
        }
        /* headers = headers
            .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
            .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
        let workbook = await XLSX.readFile(__dirname + '/data/' + type + '.xlsx')
        let sheetNames = workbook.SheetNames
        let worksheet = workbook.Sheets[sheetNames[0]]
        let datajson =  XLSX.utils.sheet_to_json(worksheet)
        let data = data.concat(datajson) */
        var output = data
            .map((v, i) => Object.keys(v).map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (2+i) })))
            .reduce((prev, next) => prev.concat(next))
            .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
        //var output = Object.assign({}, headers, data1);
        var outputPos = Object.keys(output);
        var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
        var wb = {
            SheetNames: [SheetNames],
            Sheets: {
                [SheetNames]: Object.assign({}, output, { '!ref': ref })
            }
        };
        XLSX.writeFile(wb, path + '.xlsx');

    }

}

var save_to_xlsx_ins= new save_to_xlsx();

var ins_select = async (iscreate) => {
    iscreate && await Selection.sync({force: true});
    let student = await sequelize.query(
        'SELECT * FROM students WHERE sid <> 3017207553 ',
    { 
        type: sequelize.QueryTypes.SELECT 
    }
    )
    let course = await Course.findAll({});
    let time = new Date().getFullYear()
    let i = 1;
    student.forEach(ele =>{
        let items = []
        course.forEach(elem =>{
            if(ele.entrance_year <= elem.suit_grade){
                if((+time) <= elem.cancel_year){
                    let select_year;
                    if(ele.entrance_year == 2016){
                        select_year = elem.suit_grade===2018? 2017 : (elem.suit_grade===2017? 2018 : time)
                    }
                    else{
                        select_year = elem.suit_grade===2018? 2018 :time
                    }
                    let item = {
                        sltid: i++,
                        student_sid: ele.sid,
                        course_cid: elem.cid,
                        select_year: select_year,
                        score: (Math.random()*40 + 60).toFixed(1)
                    }
                    items.push(item)
                }
                else{
                    //console.log('erro_cancel_year' + '课程已取消')
  
                }
            }
            else{
                //console.log('erro_suit_grade' + '课程需要更高年级')
            }
        })
        //Selection.bulkCreate(items)
        save_to_xlsx_ins.fn(items, 'selection', __dirname + '/data/selection/' + ele.sid)
    })

}



module.exports = async (iscreate) =>{
    ins_select(0)
}