// var agentStatus = document.getElementById('agentStatus')
// agentStatus.onchange = () => {
//   console.log(agentStatus.value)
// }

//工作列閃爍範例(切換視窗5秒後觸發)
// document.addEventListener("visibilitychange", (event) => {
//   if (document.visibilityState == "visible") {
//     console.log("tab is active")
//   } else {
//     console.log("tab is inactive")
//     setTimeout(()=>{
//       alert('您有新訊息!');
//     }, 5000);
//   }
// });

// let table  = new DataTable('#myTable', {
//   sort: true,
//   scrollX: true,
//   "columnDefs": [
//     {"className": "dt-center", "targets": "_all"},
//   ],
//   language: {
//     url: "common/json/zh_Hant.json" 
//   }
// });



$(function(){
  // $('#summerNote').summernote({
  //   lang: 'zh-TW'
  //   airMode: true
  // });

  if (document.querySelector('#summerNote')) {
    $('#summerNote').summernote({
      lang: 'zh-TW',
      height: '150',
      toolbar: [
      // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline']],
        ['insert', ['link']],
      ]
    });  
  }
  

  moment.locale('zh-tw');
  if (document.querySelector('#startDate')) {

    var today = new Date();
    var lastweek = new Date(today);
    lastweek.setDate(today.getDate()-7);
    
    document.querySelector('#startDate').valueAsDate = lastweek;
    document.querySelector('#endDate').valueAsDate = today;
  }
});


function initAgentTable() {



  let agentTable = new DataTable('#agentTable', {

    /*設定屬性(預設功能)區塊*/
    "searching": true, // 預設為true 搜尋功能，若要開啟不用特別設定
    "paging": true, // 預設為true 分頁功能，若要開啟不用特別設定
    "ordering": true, // 預設為true 排序功能，若要開啟不用特別設定
    "sPaginationType": "full_numbers", // 分頁樣式 預設為"full_numbers"，若需其他樣式才需設定
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], //顯示筆數設定 預設為[10, 25, 50, 100]
    //"pageLength":'10', // 預設為'10'，若需更改初始每頁顯示筆數，才需設定
    "processing": true, // 預設為false 是否要顯示當前資料處理狀態資訊
    "serverSide": false, // 預設為false 是否透過Server端處理分頁…等
    "stateSave": false, // 預設為false 在頁面刷新時，是否要保存當前表格資料與狀態
    "destroy": true, // 預設為false 是否銷毀當前暫存資料
    "info": true, // 預設為true　是否要顯示"目前有 x  筆資料"
    "autoWidth": true, // 預設為true　設置是否要自動調整表格寬度(false代表不要自適應)　　　　
    "scrollCollapse": false, // 預設為false 是否開始滾軸功能控制X、Y軸
    
    

    "ajax": "common/json/agent.json",
    columns: [
      { data: 'a_id',title: "員編", type: "num" },
      { data: 'a_name',title: "姓名", type: "string" },
      { data: 'dept',title: "部門", type: "string" },
      { data: 'section',title: "課別", type: "string" },
      { data: 'team',title: "組別", type: "string" },
      { data: 'capacity',title: "服務接收人數", type: "num" },
      { data: 'status',title: "帳號狀態", type: "string" },
      { data: 'permission',title: "使用者權限", type: "html" },
      { data: 'control',title: "操作", type: "html",
        render: function (data, type) {
          return '<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-secondary me-2">'+ data + '</a>';
        }
      }
    ],
    
    order: [],
    scrollX: true,
    
    columnDefs: [
      {"className": "dt-center", "targets": "_all"}
      // {
      //   targets: 0,
      //   render: DataTable.render.datetime('YYYY-MM-DD', 'YYYY-MM-DD', 'zh-tw')
      // },
      // {
      //   targets: 1,
      //   render: DataTable.render.datetime('HH:mm:ss', 'HH:mm:ss', 'zh-tw')
      // },
      // {
      //   targets: [7, 8, 9, 10, 11, 12],
      //   render: DataTable.render.datetime('X', 'HH:mm:ss', 'zh-tw')
      // },
    ],
    language: {
      url: "common/json/zh-HANT.json" 
    },
    layout: {
      top1: 'searchBuilder',
      bottom2Start: {
        buttons: ['copy', 'csv', 'excel']
      },
      topStart: 'pageLength',
      topEnd: 'search',
      bottomStart: 'info',
      bottomEnd: 'paging'
    },

  });

}

function initDataTable() {



  let reportTableType1 = new DataTable('#reportTableType-1', {

    /*設定屬性(預設功能)區塊*/
    "searching": true, // 預設為true 搜尋功能，若要開啟不用特別設定
    "paging": true, // 預設為true 分頁功能，若要開啟不用特別設定
    "ordering": true, // 預設為true 排序功能，若要開啟不用特別設定
    "sPaginationType": "full_numbers", // 分頁樣式 預設為"full_numbers"，若需其他樣式才需設定
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], //顯示筆數設定 預設為[10, 25, 50, 100]
    //"pageLength":'10', // 預設為'10'，若需更改初始每頁顯示筆數，才需設定
    "processing": true, // 預設為false 是否要顯示當前資料處理狀態資訊
    "serverSide": false, // 預設為false 是否透過Server端處理分頁…等
    "stateSave": false, // 預設為false 在頁面刷新時，是否要保存當前表格資料與狀態
    "destroy": true, // 預設為false 是否銷毀當前暫存資料
    "info": true, // 預設為true　是否要顯示"目前有 x  筆資料"
    "autoWidth": true, // 預設為true　設置是否要自動調整表格寬度(false代表不要自適應)　　　　
    "scrollCollapse": false, // 預設為false 是否開始滾軸功能控制X、Y軸
    
    

    "ajax": "common/json/data.json",
    columns: [
      { data: 'date',title: "日期", type: "date" },
      { data: 'time',title: "時間", type: "time" },
      { data: 'dept',title: "部門", type: "string" },
      { data: 'team',title: "組別", type: "string" },
      { data: 'a_id',title: "員編", type: "num" },
      { data: 'a_name',title: "員工姓名", type: "string" },
      { data: 'case',title: "進件量", type: "num" },
      { data: 'avg_resp_dur',title: "平均回應時間", type: "time" },
      { data: 'avg_chat_dur',title: "平均對談時間", type: "time" },
      { data: 'tot_chat_dur',title: "總對談時間", type: "time" },
      { data: 'tot_on_dur',title: "總上線時間", type: "time" },
      { data: 'tot_off_dur',title: "總離線時間", type: "time" },
      { data: 'tot_idle_dur',title: "總空閒時間", type: "time" },
    ],
    
    order: [],
    scrollX: true,
    
    columnDefs: [
      {"className": "dt-center", "targets": "_all"},
      {
        targets: 0,
        render: DataTable.render.datetime('YYYY-MM-DD', 'YYYY-MM-DD', 'zh-tw')
      },
      {
        targets: 1,
        render: DataTable.render.datetime('HH:mm:ss', 'HH:mm:ss', 'zh-tw')
      },
      {
        targets: [7, 8, 9, 10, 11, 12],
        render: DataTable.render.datetime('X', 'HH:mm:ss', 'zh-tw')
      },

    ],
    language: {
      url: "common/json/zh-HANT.json" 
    },
    layout: {
      top1: {
        searchBuilder: {
          conditions: {
            date: {
              '!between': null,
              'null': null,
              '!null': null
            }
          }
        }
      },
      bottom2Start: {
        buttons: ['copy', 'csv', 'excel']
      },
      topStart: 'pageLength',
      topEnd: 'search',
      bottomStart: 'info',
      bottomEnd: 'paging'
    },

  });

}



const dailyCaseChartDOM = document.querySelector('#dailyCaseChart');

if (dailyCaseChartDOM) {

  new Chart(dailyCaseChartDOM, {
    type: 'bar',
      data: {
        labels: ['0時', '1時', '2時', '3時', '4時', '5時', '6時', '7時', '8時', '9時', '10時', '11時', '12時', '13時', '14時', '15時', '16時', '17時', '18時', '19時', '20時', '21時', '22時', '23時'],
        datasets: [
          {
            label: '服務人數(小時)',
            data: [2, 2, 3, 1, 0, 0, 1, 2, 4, 8, 12, 15, 14, 20, 21, 25, 27, 30, 31, 28, 26, 20, 10, 6],
            borderWidth: 1,
            order: 3
            // backgroundColor: '#36a2eb'
          },
          {
            label: '斷線人數(小時)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 3, 4, 4, 6, 7, 5, 3, 1, 0, 0],
            borderWidth: 1,
            order: 2
            // backgroundColor: '#ff6384'
          },
          {
            label: '轉接電話人數(小時)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0],
            borderWidth: 1,
            order: 1
            // backgroundColor: '#4bc0c0'
          }
        ]
      },
      options: {
        legend: {
          onHover: (event, chartElement) => {
              event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
          }
        },
        
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true
          }
        },
        aspectRatio:  4.5,
        plugins: {
          title: {
            // display: true,
            // text: 'Chart.js Bar Chart - Stacked'
          },
          legend: {
            labels: {
              font: {
                  size: 16,
                  family: "system-ui, sans-serif"
              },
            }
          }
        }
      }
  });

}






dayjs.locale('zh-tw');

const currentTimeDOM = document.querySelector('#currentTime');

function updateTime() {
  // var now = dayjs(new Date(), 'YYYY/MM/DD hh:mm:ss');
  var now = dayjs().format('YYYY/MM/DD HH:mm:ss');
  currentTimeDOM.innerText = now;
}

setInterval(updateTime, 1000);


function toggleProfile() {
  document.querySelector('.grid-layout').classList.toggle('profile-hidden')
}





const agentInput = document.querySelector('#agentInput');
if (agentInput) {
  agentInput.addEventListener('keypress', function(event) {
    // if (event.key === 'Enter') {
    //   event.preventDefault();
    //     handleAgentMsgInput();
    // }
    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
      event.preventDefault();
      handleAgentMsgInput();
    }
  });
}

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (0+element.scrollHeight)+"px";
  console.log('element.scrollHeight:'+element.scrollHeight)
}


function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + "px";
}

function toggleEmoji() {
  document.querySelector('#toggleEmojiWrapper').classList.toggle('active');
  document.querySelector('#emojiWrapper').classList.toggle('in');
}

var emojiBtns = document.querySelectorAll('#emojiGroup .btn');
console.log(emojiBtns);

emojiBtns.forEach(emojiBtn => {
  emojiBtn.addEventListener('click', () => {
    console.log(emojiBtn.innerText);
    
    let text = emojiBtn.innerText;
    let position = agentInput.selectionStart;
    let before = agentInput.value.substring(0, position);
    let after = agentInput.value.substring(position, agentInput.value.length);
    agentInput.value = before + text + after;

    agentInput.focus();
  });
});


function handleAgentMsgInput() {

  

  var m = new Date();
  var timeString =
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + ":" +
    ("0" + m.getSeconds()).slice(-2);

  console.log(timeString);

  // const agentMsgHtml =   
  // '<div class="chatbox-msg-header">'+
  //     '<div class="chatbox-timestamp">'+ timeString +'</div>'+
  // '</div>'+
  // '<div class="chatbox-msg-body">'+
  //     '<div class="chatbox-bubble">'+ agentInput.value +'</div>'+
  // '</div>';

  const agentMsgHtml = 
  
    '<div class="msg-body">'+
      '<div class="msg-bubble">'+ agentInput.value +'</div>'+
    '</div>'+
    '<div class="msg-footer">'+
      '<span class="msg-timestamp">'+ timeString +'</span>'+
      '<span class="msg-read">已讀</span>'+
      '<a href="#" class="msg-unsend">收回</a>'+
    '</div>';
  

    var agentMsgDiv = document.createElement('div');
    agentMsgDiv.setAttribute('class', 'msg agent-msg');
    agentMsgDiv.innerHTML = agentMsgHtml;

    if(agentInput.value.length > 0) {
      document.querySelector('#chatContentBody').appendChild(agentMsgDiv);
      agentInput.value = '';
    }
    

    if (document.querySelector('#emojiWrapper').classList.contains('in')) toggleEmoji();

    var objDiv = document.querySelector('#chatContentBody');
    objDiv.scrollTop = objDiv.scrollHeight;

    agentInput.style.height = '1px';
}