Page({
  data:{
    // text:"这是一个页面"
    id1:"back",
    id2:'clear',
    id3:'negative',
    id4:'+',
    id5:'-',
    id6:'9',
    id7:'8',
    id8:'7',
    id9:'6',
    id10:'5',
    id11:'4',
    id12:'*',
    id13:'3',
    id14:'2',
    id15:'1',
    id16:'÷',
    id17:'0',
    id18:'.',
    id19:'history',
    id20:'=',
    screenData:'0',
    arr:[],
    logs:[],
    flag:true,
    cal:true,
    goOn:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  history:function(){
    wx.navigateTo({
      url:'../list/list'
    })
  },
  clickButton:function(event){
     //点击的id
      var id = event.target.id;
      //input框的值
      var data= this.data.screenData
    
      // console.log(data)
           //点击的是退格时
      if(id==this.data.id1){
        //input框里面的值为0时，不做操作直接返回
        console.log(1)
        if(data==0){
          return
        }else{
            //截取退格后的数值
            data = data.substring(0,data.length-1);
            //截取后的值为空 或者 0 时
            if(data=='' || data==0){
               data=0;
            }
            //更新input框里面得值
            this.setData({screenData:data});
            //删除数组里面的最后一个数值
            this.data.arr.pop();
        }
      }
      //按下清空的事件
      else if(id==this.data.id2){

        //设置input的值为0；
        this.setData({screenData:0});
        //数组值为清空 this.data.length=0;
        this.data.arr=[];
        console.log('清空')
      }
      //按下正负号的事件
      else if(id == this.data.id3){
        console.log('正负号')
        // 如果input框里面的值为0 不做修改
        if(data==0){
          return 
        }
        //根据第一个符号来决定操作
        var firstSimber = data.substring(0,1);
        //如果是'-',
        if(firstSimber=='-'){
          data = data.substring(1,data.length);
          //删除第一个符号 -
          this.data.arr.shift()
        }else{
          data='-'+data;
          //把'-'放在数组最前面
          this.data.arr.unshift('-');
        }
        //更新input值
        this.setData({screenData:data});
      }
      //如果是 ‘=’      
      else if(id == this.data.id20){
         console.log('等于')
        if(data == 0){
          return;
        }
        // console.log('等于')
        //获取最后一个值
        var lastWord = data.substring(data.length-1,data.length)
       //最后一个不是数字
        if(isNaN(lastWord)){
          return
        }
          var sum = '';
          var operator = '';
          var optArr = [];
          var arr = this.data.arr; 
          console.log(arr)
          for (var i in arr){
              //判断数组里面的值是否为数 或者 .
             if(isNaN(arr[i])==false || arr[i] == this.data.id18){
                sum +=arr[i];
              
                console.log(sum)
               
              }else{
                 operator = arr[i];
                 optArr.push(sum)
                 optArr.push(operator);
                 sum = '';
              }
         }
         optArr.push(sum)
          //计算结果
          var result = 0;
          if(optArr[0]=='-'){
            result=0;
          }else{
            result =  Number(optArr[0])*1.0;
            console.log(result)
          }
          console.log(optArr)
          for(var i = 0 ;i<optArr.length;i++){
            
            if(isNaN(optArr[i])){
              console.log(optArr[i])
              if(optArr[i]==this.data.id4){
                //等于号
                result +=Number(optArr[i+1]); 
              }else if(optArr[i]==this.data.id5){
                result -= Number(optArr[i+1]); 
              }else if(optArr[i]==this.data.id12){
                 result *= Number(optArr[i+1]);
              }else if(optArr[i]==this.data.id16){
                result /= Number(optArr[i+1]);
              }
            }        
            console.log(result)
          }
          //存入数据
          this.data.logs.push(data+'='+result);
          console.log( this.data.logs)
          //放入缓存之中
          wx.setStorageSync('callogs',this.data.logs);
          console.log(wx.getStorageSync('callogs'))
          this.data.arr=[];
          //将结果放在arra数组里面
          this.data.arr.push(result);
          //设置input框的值
          result = result + ' ';
          this.setData({
            screenData:result,
            flag:true,
            goOn:false,
            });
         
      }
      //按下的其他事件
      else{
          // console.log(3);
          if(id == this.data.id4 || id == this.data.id5 || id== this.data.id5
          || id == this.data.id12 ||  id== this.data.id16){
            if(this.data.flag==false || this.data.screenData == 0){
              return
            }
          }
        if(this.data.goOn){
            
            if( data == 0 ) {
              data = id;
            } else {
              data += id;
            }
           console.log(data);
            this.setData( { screenData: data });
            this.data.arr.push( id );
             console.log(this.data.screenData)
          } else{
            // console.log("数字");
                  this.setData({
                  screenData:id,
                  goOn:true,
                });
                 this.data.arr=[];
                this.data.arr.push(id);
          }
        }          
         
        if(id == this.data.id4 || id == this.data.id5 || id== this.data.id5
          || id == this.data.id12 ||  id== this.data.id16){
            this.setData({flag:false});
        }     
     
  }
})