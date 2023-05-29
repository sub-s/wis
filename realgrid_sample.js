const container = document.getElementById('realgrid');
const provider = new RealGrid.LocalDataProvider(false);
const gridView = new RealGrid.GridView(container);
const resetRealGrid = ()=>{
    gridView.header.height = 28;
    gridView.displayOptions.rowHeight = 28;
    gridView.setFooters(
        {
            visible:true,
            items:[
                {   
                    height: 28
                }, 
                {
                    height: 28
                }, 
                {
                    height: 28
                }
            ]
        }
    );
}
gridView.setDataSource(provider);
provider.setFields([
    {
        name: 'Column01',
        fieldName: 'country',
        header: {
            text: '해당국가',
        },
    },
    {
        name: 'Column02',
        fieldName: 'gender',
        header: {
        text: '성별',
        },
    },
    {
        name: 'Column03',
        fieldName: 'pay',
        header: {
            text: '계약 급여',
        },
        dataType: "number",
    },
    {
        name: 'Column04',
        fieldName: 'appraisal',
        header: {
        text: '고객 평가',
        },
    },
    {
        name: 'Column05',
        fieldName: 'level',
        header: {
            text: '업무 숙련도',
        },
    },
    {
        name: 'Column06',
        fieldName: 'address',
        header: {
            text: '주소',
        },
    },
    {
        name: 'Column07',
        fieldName: 'data',
        header: {
            text: '데이타 관리',
        },
    },
]);
gridView.setColumns([
    {
        name: 'Column01',
        fieldName: 'country',
        header: {
            text: '해당국가',
        },
    },
    {
        name: 'Column02',
        fieldName: 'gender',
        header: {
            text: '성별',
        },
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = "";
                temp = (cell.value === "남")?"<span class='realgrid-icon-circle m'>"+cell.value+"</span>":"<span class='realgrid-icon-circle w'>"+cell.value+"</span>";
                return temp;
            }
        },
        footers: [
            {
                text: "합계",
                styleName: "realgrid-txt-center",
            },
            {
                text: "최대 값",
                styleName: "realgrid-txt-center",
            },
            {
                text: "평균 값",
                styleName: "realgrid-txt-center",
            },
        ]
    },
    {
        name: 'Column03',
        fieldName: 'pay',
        header: {
            text: '계약 급여',
        },
        width: 130,
        styleName:"realgrid-txt-right",
        footers: [
            {
                expression: "sum",
                numberFormat: "#,###",
            },
            {
                text: "최대 값",
                numberFormat: "#,###",
                expression: "max",
            },
            {
                text: "평균",
                numberFormat: "#,###",
                expression: "avg",
            }
        ]
    },
    {
        name: 'Column04',
        fieldName: 'appraisal',
        header: {
          text: '고객 평가',
        },
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = "<div class='grid-gage-bar'><ul>";
                const max = 5;
                const bar = Number(cell.value);
                const empty = max - bar;
                for(let i=0; i<bar; i++){
                    temp += "<li class='active'></li>";
                }
                for(let i=0; i<empty; i++){
                    temp += "<li></li>";
                }
                temp += "</ul></div>";
                return temp;
            }
        },
    },
    {
        name: 'Column05',
        fieldName: 'level',
        header: {
        text: '업무 숙련도',
        },
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                const id = 'gabe-bar-'+cell.index.dataRow+'-'+cell._index.column._index;
                const value = cell.value;
                let temp = (Number(value.replace(/\%$/g,'')) >= 80)?"<div id="+id+" class='realgrid-gage-bar b' data-value='"+value+"'><span style='width:"+value+"'></span><p>"+value+"</p></div>":"<div id="+id+" class='realgrid-gage-bar' data-value='"+value+"'><span style='width:"+value+"'></span><p>"+value+"</p></div>";
                return temp;
            }
        },
    },
    {
        name: 'Column06',
        fieldName: 'address',
        header: {
          text: "주소",
        },
        width:250,
        editable:false,
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = "";
                temp = "<div class='realgrid-address'> " + cell.value + "</div>";
                return temp;
            }
        }
    },
    {
        name: 'Column07',
        fieldName: 'data',
        header: {
          text: "데이타 관리",
        },
        editable:false,
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = "";
                temp = '<button class="realgrid-cell-btn" onclick="realgridBtnClick('+cell.index.dataRow +','+cell._index.column._index+',\''+cell.dataColumn._fieldName+'\',\''+cell.dataColumn._name+'\',\''+cell.dataColumn.displayText+'\')">삭제</button>';
                return temp;
            }
        }
    },
]);
resetRealGrid();

gridView.setColumnProperty("Column01", "autoFilter", true);

const dummyDatas = [];
for(let i=0; i<100; i++){

    dummyDatas.push({
        country : "한국",
        gender : (Math.floor(Math.random() * 2) % 2 === 0)?"남":"여",
        pay : Math.floor(Math.random() * 10000000000),
        appraisal : Math.ceil(Math.random() * 5),
        level : Math.ceil(Math.random() * 100) + "%",
        address : "서울특별시 중구 연세빌딩  엘지유플러스 ",
        data : "삭제",

    })
}
provider.setRows(dummyDatas);

setPaging();