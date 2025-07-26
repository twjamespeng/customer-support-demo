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

/* list container */
const listContainer = document.querySelector(".calltype-list-container");
if (listContainer) {


  const list = listContainer.querySelector(".calltype-list");
  let listItems = list.querySelectorAll(".calltype-list-item");
  let listItemNames = list.querySelectorAll(".calltype-list-item-name");




  listItemNames.forEach(item => item.addEventListener("keydown",keydown));
  function keydown (e){
    if(e.keyCode===13){
      e.target.blur()  
    }
  }


  let draggedTarget;
  let helper;


  listContainer.addEventListener("dragstart", function(e) {
    draggedTarget = e.target;
    draggedTarget.style.backgroundColor = "#fff";

    helper = document.createElement("div");
    helper.innerText = draggedTarget.querySelector(".calltype-list-item-name").value;
    helper.style.position = "absolute";
    helper.style.top = "-9999px";
    helper.style.padding = "4px 8px";
    helper.style.backgroundColor = "#000";
    helper.style.color = "#ddd";
    helper.style.fontSize = "13px";
    helper.style.fontFamily = "Consolas";
    document.querySelector("body").appendChild(helper);
    
    e.dataTransfer.setDragImage(helper, -20, -10);
  });

  listContainer.addEventListener("dragenter", function(e) {
    if (e.target !== draggedTarget && e.target.classList[0] === "calltype-list-item") {
      const ep = e.target.previousElementSibling;
      const en = e.target.nextElementSibling;
      const dp = draggedTarget.previousElementSibling;
      const dn = draggedTarget.nextElementSibling;

      if (!ep && !dn) {
        list.removeChild(draggedTarget);
        e.target.insertAdjacentElement("beforebegin", draggedTarget);
      } else if (!en && !dp) {
        list.removeChild(draggedTarget);
        e.target.insertAdjacentElement("afterend", draggedTarget);
      } else if (ep && ep != draggedTarget) {
        list.removeChild(e.target);
        list.removeChild(draggedTarget);
        ep.insertAdjacentElement("afterend", draggedTarget);
        draggedTarget.insertAdjacentElement("afterend", e.target);
      } else if (!ep) {
        list.removeChild(e.target);
        list.removeChild(draggedTarget);
        dn.insertAdjacentElement("beforebegin", e.target);
        e.target.insertAdjacentElement("beforebegin", draggedTarget);
      } else if (en && en != draggedTarget) {
        list.removeChild(e.target);
        list.removeChild(draggedTarget);
        en.insertAdjacentElement("beforebegin", draggedTarget);
        draggedTarget.insertAdjacentElement("beforebegin", e.target);
      } else if (!en) {
        list.removeChild(e.target);
        dp.insertAdjacentElement("afterend", e.target);
      }
    } 
  });

  listContainer.addEventListener("dragover", function(e) {
    e.preventDefault(); // why necessary ?
  });

  listContainer.addEventListener("drop", function(e) {
    e.preventDefault();
    draggedTarget.style.backgroundColor = "";
    helper.parentNode.removeChild(helper);
  });

}


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
    
    document.querySelector('#startDate').value = moment(lastweek).format('YYYY-MM-DD');
    document.querySelector('#endDate').value = moment(today).format('YYYY-MM-DD');
  }


  if ($('.modal-draggable').length) {
    $('.modal-draggable').draggable({
      handle: ".modal-header",
      containment: "document"
    });
  }

  $('#returnModalCollapse').on('show.bs.collapse', function(){
    $('#btnReturnModalCollapse').toggleClass('bi-arrows-angle-contract bi-arrows-angle-expand');
  });

  $('#returnModalCollapse').on('hide.bs.collapse', function(){
    $('#btnReturnModalCollapse').toggleClass('bi-arrows-angle-contract bi-arrows-angle-expand');
  });

  $('.dblclick-header').on('dblclick', function(){
    $('#returnModalCollapse').collapse('toggle');
  });


    


  


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

function openReturnModal(t) {
  $('tr').removeClass('active');
  t.closest('tr').classList.add('active');
  $('#modalEditReturn').modal('show');
}

$('#modalEditReturn').on('hidden.bs.modal', function(){
  $('tr').removeClass('active');
});


function initReturnTable() {


  let exportFormatter = {
    format: {
      body: function (data, row, column, node) {
        // Strip $ from salary column to make it numeric
        // return column === 5 ? data.replace(/[$,]/g, '') : data;
        return data;
      }
    }
  };

  let reportTableType1 = new DataTable('#returnTable', {

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
    "ajax": "common/json/return.json",
    fixedColumns: {
      end: 2  //凍結欄位功能
    },
    columns: [
      { data: 'case_order', title: '項次', type: "string" },
      { data: 'apply_date', title: '申請日期', type: "date" },
      { data: 'apply_time', title: '申請時間', type: "date" },
      { data: 'customer_id', title: '顧客編號', type: "string" },
      { data: 'order_id', title: '訂單編號', type: "string" },
      { data: 'goods_id', title: '退貨品號', type: "string" },
      { data: 'goods_name', title: '退貨商品', type: "string" },
      { data: 'goods_spec', title: '規格', type: "string" },
      { data: 'goods_amount', title: '退貨數量', type: "html",
        render: function (data, type) {

          //將數量依<br>來分開，再依情況加上樣式
          let amount = data.split('<br>');
          for (var i=0; i<amount.length; i++) {

            //數量大於1時, 字體變大變粗變色
            if (amount[i] > 1) {
              amount[i] = '<span class="fw-bold text-danger fs-5">'+ amount[i] +'</span>';
            } else if (amount[i] === null) {
              //拆出來如為空值,就什麼都不做
            }
            else {
              //數量為1時,就一般狀況處理
              amount[i] = '<span class="fs-6">'+ amount[i] +'</span>';
            }
          }
          

          //將加好樣式的數量，加上<br>,再重組回去
          let newData = "";
          for (var j=0; j<amount.length; j++) {
            
            //最後一個數量不加<br>
            if (j === amount.length -1) {
              newData = newData + amount[j];
            } else {
              newData = newData + amount[j] + '<br>';  
            }
            
          }
          return newData;
        }
      },
      { data: 'goods_reason', title: '退貨原因', type: "string" },
      { data: 'goods_note', title: '退貨原因備註', type: "string" },
      { data: 'edit_date', title:'編輯日期',  type: "date" },
      { data: 'edit_agent', title: '最後編輯人員', type: "string" },
      { data: 'case_status', title: '狀態', type: "html" },
      { data: 'control_action_1', type: "html",
        render: function (data, type) {
          return '<a href="javascript:void(0)" onclick="openReturnModal(this)" class="btn btn-secondary btn-open-return-modal">'+ data + '</a>';
        }
      }
    ],
    
    order: [],
    scrollX: true,
    columnDefs: [
      {
        //將指定column設定文字置中
        className: 'dt-center',
        targets: [0, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14]
      },
      {
        //設定複合查詢的預設條件(column 3,4,12)
        searchBuilder: {
          defaultCondition: 'contains'  //包含
        },
        targets: [3,4,12]
      },
      {
        //設定複合查詢的預設條件(column 13)
        searchBuilder: {
          defaultCondition: '=' //等於
        },
        targets: [13]
      }
    ],
    language: {
      url: "common/json/zh-HANT.json" 
    },
    layout: {
      top1: {
        searchBuilder: {
          //設定複合查詢的對象column
          columns: [3,4,12,13],
          //設定複合查詢可用的條件
          conditions: {
            //字串類型的欄位,只開放contains(包含)
            string: {
              '=': null,
              '!=': null,
              '!null': null,
              '<': null,
              '<=': null,
              '>': null,
              '>=': null,
              'null': null,
              'between': null,
              '!between': null,
              '!contains': null,
              'starts': null,
              '!starts': null,
              'ends': null,
              '!ends': null
            },
            //html類型的欄位,只開放=(等於)
            html: {
              '!=': null,
              '!null': null,
              '<': null,
              '<=': null,
              '>': null,
              '>=': null,
              'null': null,
              'between': null,
              '!between': null,
              'contains': null,
              '!contains': null,
              'starts': null,
              '!starts': null,
              'ends': null,
              '!ends': null
            }

          }
        }
      },
      bottom2Start: {
        buttons: [
          {
            extend: 'excelHtml5',
            title: '退貨訂單處理' + moment().format('YYYYMMDD'),
            text: '匯出Excel',
            exportOptions: {
              //設定要匯出的欄位
              columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
              format: {
                body: function(data, row, column, node) {

                  if (typeof data === 'string' || data instanceof String) {
                    data = data.replace( /<br\s*\/?>/ig, "\n"); //convert <br> tag to newline 
                    data = data.replace(/[ \t]+/g, ' '); //remove unwanted tabs
                    data = data.split(/\r?\n/); //split by newline
                    data = data.map(s => s.trim()); // trim all string in array
                    data = data.filter(item => item); //remove empty array string
                    data = data.join('\n'); //recreate clean string
                  }

                  data = $('<p>' + data + '</p>').text();
                
                  console.log('data:'+data);
                  return (column === 5 || column === 8) ? "\0" + data : data;
                }
              }
            },
            customize: function( xlsx ) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              $('row c', sheet).attr('s', '55');

              var col = $('col', sheet);
              col.each(function () {
                $(this).attr('width', 15);
              });
              $(col[0]).attr('width', 5);
              $(col[4]).attr('width', 20);
              $(col[6]).attr('width', 45);
              $(col[9]).attr('width', 20);
              $(col[10]).attr('width', 20);
            }
          }
        ]
      },
      topStart: {
        search: {
          text: '快速搜尋：'
        }
      },
      topEnd: 'pageLength',
      bottomStart: 'info',
      bottomEnd: 'paging'
    },

  });

}

const dailyCaseChartDOM = document.querySelector('#dailyCaseChart');


if (dailyCaseChartDOM) {


  const dailyCaseChart = new Chart(dailyCaseChartDOM, {
    type: 'bar',
      data: {
        labels: ['0時', '1時', '2時', '3時', '4時', '5時', '6時', '7時', '8時', '9時', '10時', '11時', '12時', '13時', '14時', '15時', '16時', '17時', '18時', '19時', '20時', '21時', '22時', '23時'],
        datasets: [
          {
            label: '線上服務人數(小時)',
            data: [2, 2, 3, 1, 0, 0, 1, 2, 4, 8, 12, 15, 14, 20, 21, 25, 27, 30, 31, 28, 26, 20, 10, 6],
            borderWidth: 1,
            order: 3
            // backgroundColor: '#36a2eb'
          },
          {
            label: '離開人數(小時)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 3, 4, 4, 6, 7, 5, 3, 1, 0, 0],
            borderWidth: 1,
            order: 2
            // backgroundColor: '#ff6384'
          },
          {
            label: '電話服務人數(小時)',
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
        maintainAspectRatio: true,
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

  window.addEventListener('resize', ()=>{
    dailyCaseChart.resize();
    dailyCaseChart.render(true);
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
// console.log(emojiBtns);

emojiBtns.forEach(emojiBtn => {
  emojiBtn.addEventListener('click', () => {
    console.log(emojiBtn.innerText);
    
    let text = emojiBtn.innerText;
    // let text = emojiBtn.innerHTML;
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

  // var newAgentInputValue = replaceEmojis(agentInput.value);


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



function replaceEmojis(str) {

    var emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

    if (str.match(emojiRE)) {
      str = '<span class="fs-4">' + str + '</span>';
    }

    return str;
}




/*
// Make the DIV element draggable:
var draggableModals = document.querySelectorAll('.modal-draggable')
draggableModals.forEach(draggableModal => {
  dragElement(draggableModal)
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt.querySelector(".modal-header")) {
    // if present, the header is where you move the DIV from:
    elmnt.querySelector(".modal-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";


  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/