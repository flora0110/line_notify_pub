var lineToken = "hE5WKAXHMphSAQqqzLmRahFNmWCLvErbp4yYkatIPWH";
var words = ""; //用空格分隔輸入要搜索的字符（示例）
var f_body = 0; // 0：不顯示通知中的文本，1：顯示通知中的文本
var interval = 1; //確認幾分鐘前的


function send_line(Me) {
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
        'headers': {
           'Authorization': 'Bearer ' + lineToken,
        },
        'method': 'post',
        'payload': {
            'message': Me
        }
    });
}

function fetchContactMail() {
 //取得間隔
 var now_time= Math.floor(new Date().getTime() / 1000) ;//現在時刻を変換
 var time_term = now_time - ((60 * interval) + 3); //秒3秒
 
 //検索条件指定
var strTerms = '(subject:{' + words + '} is:unread after:'+ time_term + ')';
 
 //取得
 var myThreads = GmailApp.search(strTerms);
 var myMsgs = GmailApp.getMessagesForThreads(myThreads);
 var valMsgs = [];
lMsgs = [];
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


function main() {
 new_Me = fetchContactMail()
 if(new_Me.length > 0){
   for(var i = new_Me.length-1; i >= 0; i--){
     send_line(new_Me[i])
   }
 }
}
