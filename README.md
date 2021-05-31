# line_notify
## line notify service
1. 申請權杖(先記下來)
2. 將linenotify加入一群組
## google apps scripts
1. send_line
```
function send_line(Me) {
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {//模擬登入
        'headers': {
           'Authorization': 'Bearer ' + lineToken, //lineToken = 權杖的代碼
        },
        'method': 'post',       //動作為post
        'payload': {
            'message': Me       //post 的內容
        }
    });
}
```
2. fetchContactMail()
```
function fetchContactMail() {
 //取得間隔
 var now_time= Math.floor(new Date().getTime() / 1000) ;//現在時刻轉換
 var time_term = now_time - ((60 * interval) + 3); //秒3秒
 
 //検索条件指定
var strTerms = '(subject:{' + words + '} is:unread after:'+ time_term + ')';
 
 //取得
 var myThreads = GmailApp.search(strTerms);
 var myMsgs = GmailApp.getMessagesForThreads(myThreads); //檢索指定線程中的所有消息
 var valMsgs = [];                      //要回傳的內容
 for(var i = 0; i < myMsgs.length;i++){
   //擷取如果是ilearning的或學校信件
   if(/iLearning/.test(myMsgs[i].slice(-1)[0].getSubject()) || /nchu.edu/.test(myMsgs[i].slice(-1)[0].getFrom())){
    valMsgs[i] = " " + myMsgs[i].slice(-1)[0].getDate().getMonth() + "/"+ myMsgs[i].slice(-1)[0].getDate().getDate() 
      + " " + myMsgs[i].slice(-1)[0].getDate().getHours() + ":" + myMsgs[i].slice(-1)[0].getDate().getMinutes() 
      + "\n[from]" + myMsgs[i].slice(-1)[0].getFrom()
      + "\n" + myMsgs[i].slice(-1)[0].getSubject()
    if(f_body == 1){
      valMsgs[i] = valMsgs[i] + "\n\n[Message]\n"+ myMsgs[i].slice(-1)[0].getPlainBody();
    }
   }
 }
 
 return valMsgs;
}

```
3. 執行main()
4. 設定觸發條件 -> 時間
