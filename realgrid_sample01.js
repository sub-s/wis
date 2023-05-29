const container1 = document.getElementById('realgrid1');
const provider1 = new RealGrid.LocalDataProvider(false);
const gridView1 = new RealGrid.GridView(container1);
const resetRealGrid1 = ()=>{
    gridView1.header.height = 28 * 2;
    gridView1.displayOptions.rowHeight = 28;
    gridView1.displayOptions.useFocusClass = true;
    gridView1.setFooters(
        {
            visible:false,
        }
    );
}
gridView1.setDataSource(provider1);
provider1.setFields([
    {
        name: 'Column01',
        fieldName: 'Recycle',
        header: {
            text: 'Recycle 상태',
        },
    },
    {
        name: 'Column02',
        fieldName: 'Apply',
        header: {
            text: 'Gender',
        },
    },
    {
        name: 'Column03',
        fieldName: 'Count',
        header: {
            text: 'Count',
        },
    },
    {
        name: 'Column04',
        fieldName: 'Line',
        header: {
            text: 'Line',
        },
    },
    {
        name: 'Column05',
        fieldName: 'LotID',
        header: {
            text: 'LotID',
        },
    },
    {
        name: 'Column06',
        fieldName: 'Stepdesc',
        header: {
            text: 'Stepdesc',
        },
    },
    {
        name: 'Column07',
        fieldName: 'quality',
        header: {
            text: '품질 Data.',
        },
        dataType: "boolean",
    },
    {
        name: 'Column08',
        fieldName: 'ScrapType',
        header: {
            text: 'Scrap 유형',
        },
    },
    {
        name: 'Column09',
        fieldName: 'ScrapSlot',
        header: {
            text: 'Scrap slot',
        },
    },
    {
        name: 'Column10',
        fieldName: 'startDate',
        header: {
            text: '등록일',
        },
    },
    {
        name: 'Column11',
        fieldName: 'user',
        header: {
            text: '등록자',
        },
    },
    {
        name: 'Column12',
        fieldName: 'part',
        header: {
            text: '등록 Part',
        },
    },
]);
gridView1.setColumns([
    {
        name: 'Column01',
        fieldName: 'Recycle',
        header: {
            text: 'Recycle 상태',
        },
        editable:false,
        styleCallback: function(grid, dataCell){
            let temp = (dataCell.value === "신청가능")?"realgrid-cell-color-01":(dataCell.value === "기술합의대기")?"realgrid-cell-color-02":"realgrid-cell-color-03";
            return temp;
        },
    },
    {
        name: 'Column02',
        fieldName: 'Apply',
        header: {
            text: '신청',
        },
        editable:false,
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = "";
                temp = (cell.value === "GMP변경필요")?'<button class="realgrid-cell-btn" onclick="realgridBtnClick('+cell.index.dataRow +','+cell._index.column._index+',\''+cell.dataColumn._fieldName+'\',\''+cell.dataColumn._name+'\',\''+cell.dataColumn.displayText+'\')">'+cell.value+'</button>':(cell.value === "신청")?'<button class="realgrid-cell-btn t1" onclick="realgridBtnClick('+cell.index.dataRow +','+cell._index.column._index+',\''+cell.dataColumn._fieldName+'\',\''+cell.dataColumn._name+'\',\''+cell.dataColumn.displayText+'\')">'+cell.value+'</button>':'';
                return temp;
            }
        },
    },
    {
        name: 'Column03',
        fieldName: 'Count',
        header: {
            text: '나이',
        },
        styleName: "realgrid-txt-right",
    },
    {
        name: 'Column04',
        fieldName: 'Line',
        header: {
            text: 'Line',
        },
    },
    {
        name: 'Column05',
        fieldName: 'LotID',
        header: {
            text: 'Lot ID',
        },
    },
    {
        name: 'Column06',
        fieldName: 'Stepdesc',
        header: {
            text: 'Step desc.',
        },
    },
    {
        name: 'Column07',
        fieldName: 'quality',
        header: {
            text: '품질 Data.',
        },
        editable:false,
        renderer:{
            type:"html",
            callback: function(grid, cell, w, h) {
                let temp = (cell.value)?'<div class="realgrid-btn-set"><button class="realgrid-cell-btn" onclick="realgridBtnClick('+cell.index.dataRow +','+cell._index.column._index+',\''+cell.dataColumn._fieldName+'\',\''+cell.dataColumn._name+'\',\''+cell.dataColumn.displayText+'\')">FDC</button>' + '<button class="realgrid-cell-btn" onclick="realgridBtnClick('+cell.index.dataRow +','+cell._index.column._index+',\''+cell.dataColumn._fieldName+'\',\''+cell.dataColumn._name+'\',\''+cell.dataColumn.displayText+'\')">SPC</button></div>':'';
                return temp;
            }
        },
    },
    {
        name: 'Column08',
        fieldName: 'ScrapType',
        header: {
            text: 'Scrap 유형',
        },
    },
    {
        name: 'Column09',
        fieldName: 'ScrapSlot',
        header: {
            text: 'Scrap slot',
        },
    },
    {
        name: 'Column10',
        fieldName: 'startDate',
        header: {
            text: '등록일',
        },
    },
    {
        name: 'Column11',
        fieldName: 'user',
        header: {
            text: '등록자',
        },
    },
    {
        name: 'Column12',
        fieldName: 'part',
        header: {
            text: '등록 Part',
        },
    },
]);


const layout = [
    {
      name:"Recycle 신청",
      expandable: true,
      items:[
        {column: "Column01", width:100, groupShowMode:"always"},
        {column: "Column02", width:100, groupShowMode:"expand"},
        {column: "Column03", width:100, groupShowMode:"collapse"},
      ]
    },
    {
        name:"",
        expandable: true,
        items: [
            {column: "Column04", width:100, groupShowMode:"expand"},
            {column: "Column05", width:100, groupShowMode:"expand"},
            {column: "Column06", width:100, groupShowMode:"expand"},
        ]
    },
    {
        name:"Scrap Info",
        expandable: true,
        items: [
            {column: "Column07", width:150, groupShowMode:"expand"},
            {column: "Column08", width:100, groupShowMode:"expand"},
            {column: "Column09", width:100, groupShowMode:"expand"},
        ]
    },
    {
        name:"Scrap User Info",
        expandable: true,
        items: [
            {column: "Column10", width:100, groupShowMode:"expand"},
            {column: "Column11", width:100, groupShowMode:"expand"},
            {column: "Column12", width:100, groupShowMode:"expand"},
        ]
    },
]

gridView1.setColumnLayout(layout)
resetRealGrid1();

gridView1.setColumnProperty("Column01", "autoFilter", true);

const dummyDatas1 = [];
for(let i=0; i<100; i++){
    const rNum = Math.ceil(Math.random() * 3);
    const aNum = Math.ceil(Math.random() * 3);
    const fTxt = (Math.ceil(Math.random() * 10) % 2 === 0)?"P":"";
    const ScrapTypeArr = ["공정_불량(RJ)","PARTCLE_(RJ)","THICKNESS_(RJ)",];
    const today = new Date();
    dummyDatas1.push({
        Recycle : (rNum === 1)?"신청가능":(rNum === 2)?"OI처리":"기술합의대기",
        Apply : (aNum === 1)?"GMP변경필요":(aNum === 2)?"신청":"",
        Count : Math.floor(Math.random() * 10000000000),
        Line : fTxt + Math.ceil(Math.random() * 99),
        LotID : "ID" + Math.ceil(Math.random() * 50),
        Stepdesc : Number(Math.random() * 10).toFixed(1) + " TANSY TIN BUFFING",
        quality : (Math.ceil(Math.random() * 10) % 2 === 0)?true:false,
        ScrapType : ScrapTypeArr[Math.ceil(Math.random() * (ScrapTypeArr.length - 1))],
        ScrapSlot : (Math.ceil(Math.random() * 10) % 2 === 0)?"01,02,03,04":"",
        startDate : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" +Math.ceil(Math.random() * 30),
        user : "name" + i,
        part : (Math.ceil(Math.random() * 10) % 2 === 0)?"METAL":"CVD",
    })
}
provider1.setRows(dummyDatas1);

// setPaging();