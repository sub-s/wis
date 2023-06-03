const globalGridView = [];

const initGrid01 = ()=>{
    const container = document.getElementById('realgrid');
    const provider = new RealGrid.LocalDataProvider(false);
    globalGridView[0] = new RealGrid.GridView(container);
    const gridView = globalGridView[0];
    const resetRealGrid = ()=>{
        gridView.displayOptions.syncGridHeight = "always"
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
    setPaging(provider);
}

const initGrid02 = ()=>{
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
}




function setPaging(dataProvider){
    var totalData = dataProvider.getRowCount();    // 총 데이터 수
    var dataPerPage = 8;    // 한 페이지에 나타낼 데이터 수
    var pageCount = 3;        // 한 화면에 나타낼 페이지 수
    const gridView = globalGridView[0];
  
    setPageSelbox(totalData, dataPerPage);
    gridView.setPaging(true, dataPerPage);
    paging(totalData, dataPerPage, pageCount, 1);
  }
  
  function paging(totalData, dataPerPage, pageCount, currentPage, gridView){
    console.log("currentPage : " + currentPage);
    
    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹
    
    console.log("pageGroup : " + pageGroup);
    
    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage)
        last = totalPage;
    var first = last - (pageCount - 1) < 1 ? 1 : last - (pageCount - 1)   // 화면에 보여질 첫번째 페이지 번호
    var next = last+1;
    var prev = first-1;
    
    console.log("last : " + last);
    console.log("first : " + first);
    console.log("next : " + next);
    console.log("prev : " + prev);
  
    var $pingingView = $("#paging");
    
    var html = "";
  
    if(prev == 0) {
        html += "<a href=# id='first' class='disabled'>|<</a> ";
        html += "<a href=# id='prev' class='disabled'><</a> ";
    } else {
        html += "<a href=# id='first'>|<</a> ";
        html += "<a href=# id='prev'><</a> ";         
    }
    
    
    for(var i=first; i <= last; i++){
        html += "<a href='#' style='width: 50px' id=" + i + ">" + i + "</a> ";
    }
    
    if(last < totalPage) {
        html += "<a href=# id='next'>></a>";
        html += "<a href=# id='last'>>|</a>";
    } else {
        html += "<a href=# id='next' class='disabled'>></a>";
        html += "<a href=# id='last' class='disabled'>>|</a>";
    }
    
    $("#paging").html(html);    // 페이지 목록 생성
    
    $("#paging a").css({"color": "black",
                        "padding-left": "10px"});
                        
    $("#paging a#" + currentPage).css({
        "color":"#3771F9",
        "text-decoration":"none", 
        "border":"1px solid #3771F9",
        "border-radius":"4px",
    });    // 현재 페이지 표시
                                       
    $("#paging a").click(function(event){
        event.preventDefault();
        
        var $item = $(this);
        var $id = $item.attr("id");
        var selectedPage = $item.text();
        const gridView = globalGridView[0];
        
  
        if($id == "first")   selectedPage = 1;
        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev < 1 ? 1 : prev
        if($id == "last")    selectedPage = totalPage;
        
        gridView.setPage(selectedPage-1);
        paging(totalData, dataPerPage, pageCount, selectedPage);
    });
                                       
  }
  
  function setPageSelbox(totalData, dataPerPage,gridView){
    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
  
    for (var i=1; i <= totalPage; i++) {
        var optStr = "<option value=" + i + ">" + i + "</option>";
        console.log(optStr);
        $("#selBox").append(optStr);
    }
  
    $("#selBox").change(function() {
        var totalData = dataProvider.getRowCount();    // 총 데이터 수
        var dataPerPage = 8;    // 한 페이지에 나타낼 데이터 수
        var pageCount = 3;        // 한 화면에 나타낼 페이지 수
        var selectedPage = $(this).val();
        const gridView = globalGridView[0];
  
        gridView.setPage(selectedPage-1);
        paging(totalData, dataPerPage, pageCount, selectedPage);
    });
  }