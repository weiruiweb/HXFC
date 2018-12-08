window.base={
    g_restUrl:'http://www.gxhxfc.com/api/public/index.php/api/v1/',

    getCityId:function(){
        if(localStorage.getItem('city_id')){
            return localStorage.getItem('city_id')
        }else{
            return 3
        };
    },
    
    getUserToken:function(callback){


        var param = this.GetRequest();
        console.log(param);
        if(param.code){
            var postData = {
                thirdapp_id:2,
                code:param.code,
            };
            var c_callback = (res)=>{
                console.log(res)
                if(res.token){
                    localStorage.setItem('user_token',res.token);
                    localStorage.setItem('user_no',res.info.user_no);
                    localStorage.setItem('user_info',res.info);
                    callback&&callback();
                }else{
                    alert('获取token失败')
                };
            };  
            this.getWxauthToken(postData,c_callback);
        }else if(localStorage.getItem('user_token')){
            callback&&callback();
        }else{
            var href =  window.location.href;
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cd6c5fcb1acb373&redirect_uri='+
            encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
        };
        
    },    

    getMerchantToken:function(callback){
        var href =  window.location.href;
        console.log('href',href);
        var token = localStorage.getItem('merchant_token');
        if(token){
           callback&&callback();
        }else{
            window.location.href = './login.html'
        };
    },

    getWxauthToken:function(param,callback) {
  
        var allParams = {
            url:'Wxauth',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams);
        
    },

    WxJssdk:function(param,callback) {
  
        var allParams = {
            url:'WxJssdk',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams);
    },

    getData:function(params){
        if(!params.type){
            params.type='get';
        }
        var that=this;
        $.ajax({
            type:params.type,
            url:this.g_restUrl+params.url,
            data:params.data,
            success:function(res){
                if(res.solely_code==201000){
                    var loca = window.location;
                    window.location.href = loca.origin + loca.pathname;
                }else if(res.solely_code==200000){
                	console.log(that.GetUrlRelativePath().substr(6,5));
                    if(that.GetUrlRelativePath().substr(5,4)=='user'||that.GetUrlRelativePath().substr(5,5)=='index'){
                        localStorage.removeItem('user_token');
                        localStorage.removeItem('user_no');
                        that.getUserToken();
                    }else if(that.GetUrlRelativePath().substr(5,8)=='merchant'){
                        localStorage.removeItem('merchant_token');
                        localStorage.removeItem('merchant_no');
                        window.location.href = './login.html'
                    };
                }else{
                    params.sCallback && params.sCallback(res);
                };
            },
            error:function(res){
                params.eCallback && params.eCallback(res);
            }
        });
    },

    articleList:function(param,callback) {
  
        var allParams = {
            url:'Common/Article/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    loginUp:function(param,callback) {
    
        $.ajax({ // $.post，告辞
            type: 'post',
            contentType: false, // 关关关！必须得 false
                                // 这个不关会扔一个默认值 application/x-www-form-urlencoded 过去，后端拿不到数据的！
                                // 而且你甚至不能传个字符串 'multipart/form-data'，后端一样拿不到数据！
            processData: false, // 关关关！重点
            url: 'http://solelytech.iicp.net/api/hualuzhuop/public/index.php/api/v1/Func/Common/loginByUp',
            data: param,
            success:function(res){
                callback && callback(res);
            },
            error:function(res){
                callback && callback(res);
            }
        });

    },

/**************************房天下**********************************/
//设置城市参数
    setCity(label){
        localStorage.setItem('city',label);
        window.location.reload();
    },
   findCityName(label){
    if(label=='2'){
        return '南宁'
    }else if(label=='3'){
        return '北海'
    }else if(label=='4'){
        return '钦州'
    }else if(label=='6'){
        return '防城港'
    }
  },
    GetList:function(param,callback) {
        var allParams = {
            url:'UserArticle/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    /************详情***********/
    getArticle:function(param,callback) {
        var allParams = {
            url:'UserArticle/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    /************首页新房推荐***********/
    NewRecomGetList:function(param,callback) {
        var allParams = {
            url:'UserContent/GetHomeTheme',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    HouseNews:function(param,callback) {
        var allParams = {
            url:'UserHouseNews/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    /************新房列表***************/
    NewHouseList:function(param,callback) {
        var allParams = {
            url:'UserNewHouse/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    NewHouseArticle:function(param,callback) {
        var allParams = {
            url:'UserNewHouse/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    newHouseSearch:function(param,callback) {
        var allParams = {
            url:'UserNewHouse/HouseSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    /**************二手房列表***************/
    secondHouseList:function(param,callback) {
        var allParams = {
            url:'UserSecondHouse/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    secondHouseArticle:function(param,callback) {
        var allParams = {
            url:'UserSecondHouse/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    secondHouseSearch:function(param,callback) {
        var allParams = {
            url:'UserSecondHouse/HouseSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    /**************出租房列表***************/
    rentHouseList:function(param,callback) {
        var allParams = {
            url:'UserRentHouse/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    rentHouseArticle:function(param,callback) {
        var allParams = {
            url:'UserRentHouse/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    rentHouseSearch:function(param,callback) {
        var allParams = {
            url:'UserRentHouse/HouseSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    /*****************商铺************************/
     UserShopsList:function(param,callback) {
        var allParams = {
            url:'UserShops/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    shopsHouseArticle:function(param,callback) {
        var allParams = {
            url:'UserShops/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    shopsHouseSearch:function(param,callback) {
        var allParams = {
            url:'UserShops/ShopsSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
     /*****************写字楼************************/
     OfficeHouseList:function(param,callback) {
        var allParams = {
            url:'UserOffice/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    officeHouseArticle:function(param,callback) {
        var allParams = {
            url:'UserOffice/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    officeHouseSearch:function(param,callback) {
        var allParams = {
            url:'UserOffice/OfficeSort',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 
    /*****************团购************************/
    userGroupList:function(param,callback) {
        var allParams = {
            url:'UserGroup/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    //发布租房房源
    rentHomeResouce:function(arrayData,callback){
      var params = {
        type:'POST',
        url:'UserRentHouse/Submit',
        data:arrayData,
        sCallback:function(data){
          callback&&callback(data);
        },
      }
      this.getData(params);
    },
    addMessage:function(param,callback) {
        var allParams = {
            url:'UserMessage/addMessage',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    sellHomeResouce:function(param,callback) {
        var allParams = {
            url:'UserSecondHouse/Submit',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    labelGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Label/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    orderItemGet:function(param,callback) {
  
        var allParams = {
            url:'Common/OrderItem/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    distriGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Distribution/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },     


    distriAdd:function(param,callback) {
  
        var allParams = {
            url:'Common/Distribution/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    flowLogGet:function(param,callback) {
  
        var allParams = {
            url:'Common/FlowLog/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },   

    userGet:function(param,callback) {
  
        var allParams = {
            url:'Base/User/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    addOrder(param,callback){
        var allParams ={
            url:'Func/Order/addOrder',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);       
    } ,

    orderDelete:function(param,callback){
        var allParams ={
            url:'Common/Order/delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    orderUpdate:function(param,callback){
        var allParams ={
            url:'Common/Order/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    orderGet:function(param,callback){
        var allParams ={
            url:'Common/Order/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    userInfoUpdate:function(param,callback) {
  
        var allParams = {
            url:'Common/UserInfo/update',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },   

    messageAdd:function(param,callback) {
  
        var allParams = {
            url:'Common/Message/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    messageGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Message/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    flowLogCompute(param,callback){
        var allParams ={
            url:'Common/FlowLog/compute',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    flowLogGet(param,callback){
        var allParams ={
            url:'Common/FlowLog/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    flowLogUpdate(param,callback){
        var allParams ={
            url:'Common/FlowLog/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    flowLogAdd(param,callback){
        var allParams ={
            url:'Common/FlowLog/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },




    productAdd:function(param,callback) {
  
        var allParams = {
            url:'Common/Product/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    productUpdate:function(param,callback) {
  
        var allParams = {
            url:'Common/Product/update',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    productGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Product/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    articleGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Article/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },



    messages:function(param,callback) {
  
        var allParams = {
            url:'UserMessage/addMessage',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 


    login:function(param,callback) {

        var allParams = {
            url:'Func/Common/loginByUp',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    checkComplete:function(obj){
        var pass = true;
        for(var key in obj){
          if(!obj[key]){
            pass = false;
          };
        };
        return pass;
        console.log(pass);
    },

    

    articleOne:function(param,callback) {
        var allParams = {
            url:'UserArticle/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    menuOne:function(param,callback) {
        var allParams = {
            url:'UserMenu/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeList:function(param,callback) {
        var allParams = {
            url:'UserContent/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeOne:function(param,callback) {
        var allParams = {
            url:'UserContent/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeNum:function(param,callback) {
        var allParams = {
            url:'UserContent/GetHomeTheme',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    categoryTree:function(param,callback) {
        var allParams = {
            url:'UserCategory/GetTree',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    cloneForm:function(form) {
        var res =  JSON.parse(JSON.stringify(form));   
        return res; 
    },
    
    getDataSet:function(e) {   
        return e.target.dataset; 
    },

    getSelectValue:function(e) {   
        return e.target.selectedOptions[0].text;
    },

    getHtmlValue:function(e) {   
        return e.target.innerText;
    },

    GetUrlRelativePath:function() {   
           
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");

　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
    },


    getDataset:function(ele){
        if(ele.dataset){
            return ele.dataset;
        }else{
            var attrs = ele.attributes,//元素的属性集合
                dataset = {},
                name,
                matchStr;

            for(var i = 0;i<attrs.length;i++){
                //是否是data- 开头
                matchStr = attrs[i].name.match(/^data-(.+)/);
                if(matchStr){
                    //data-auto-play 转成驼峰写法 autoPlay
                    name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                        return letter.toUpperCase();
                    });
                    dataset[name] = attrs[i].value;
                }
            }
            return dataset;
        }
    },



    findKeyFromArray:function(Array,key,value) {  
        var new_array = []; 
        for (var i = 0; i < Array.length; i++) {
            
            if(Array[i][key]&&Array[i][key] == value){
                new_array.push(Array[i])
                console.log('Array',Array[i])
            };
        };
        return new_array; 
    },
    
    GetRequest:function() {  
       var url = decodeURI(location.search); //获取url中"?"符后的字串  
       var theRequest = new Object();  
       if (url.indexOf("?") != -1) {  
          var str = url.substr(1);  //去掉“？”
          strs = str.split("&");  
          for(var i = 0; i < strs.length; i ++) {  
             theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          }  
       }  
       return theRequest;  
    },
    getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
         return vars;
    }, 


    computePageArr:function(self) {   
        self.allPages = Math.ceil(self.paginate['count']/self.paginate['pagesize']);
        console.log(self.allPages);
        console.log(self.paginate);
        self.pageArray = [];
        self.pageArray.push(self.paginate.currentPage);
        if(self.paginate.currentPage+1 <= self.allPages){
            if(self.paginate.currentPage+2 <= self.allPages){
                self.pageArray.push(self.paginate.currentPage+1);
                self.pageArray.push(self.paginate.currentPage+2);
            }else{
                self.pageArray.push(self.paginate.currentPage+1);
            }
        };
        if(self.paginate.currentPage-1 > 0){
            if(self.paginate.currentPage-2 > 0){
                self.pageArray.unshift(self.paginate.currentPage-1);
                self.pageArray.unshift(self.paginate.currentPage-2);
                
            }else{
                self.pageArray.unshift(self.paginate.currentPage-1);
            }
        };
         
    },

    changePage:function(dataSet,self) {   
        if(dataSet.type == 'next'){
            if(self.paginate.currentPage >= self.allPages){
                alert('已经到底啦')
            }else{
                self.paginate.currentPage++;
                self.getMainData();
            }
        };
        if(dataSet.type == 'back'){
            if(self.paginate.currentPage == 1){
                alert('已经没有啦')
            }else{
                self.paginate.currentPage--;
                self.getMainData();
            }
        };
         
    },

    linkTo:function(self) {   
        if(self.linkPage>self.allPages||self.linkPage<1){
            alert('没有那一页');
            self.linkPage = '';
        }else{
            self.paginate.currentPage = self.linkPage;
            self.getMainData();
        }
         
    },

    dealRes(res){
        if(res.solely_code == 100000){
            
            wx.showToast({
                title: res.msg,
                icon: 'succes',
                duration: 1000,
                mask:true
            });
            return true;

        }else{
            
            wx.showToast({
                title: res.msg,
                icon: 'fail',
                duration: 1000,
                mask:true
            });
            return false;
        }      
    },

    footOne(res,name,limit,objName){
        const self = this;
        if(localStorage.getItem(objName)){
          var history = localStorage.getItem(objName);
          var limitSum = self.getJsonLength(history);
          console.log(limitSum);
          
          if(history[res[name]]){
            history[res[name]] = res;
            localStorage.setItem(objName,JSON.stringify(history));
          }else{
            if(limitSum < limit){
              history[res[name]] = res;
            }else{
              const historyArray = self.jsonToArray(history,'push');
              historyArray.splice(0,1);
              historyArray.push(res);
              var history = {};
              for(var i=0;i<historyArray.length;i++){
                history[historyArray[i][name]] = historyArray[i];
                
              };
            }
            localStorage.setItem(objName,JSON.stringify(history));
          }
          
        }else{
          var history = {};
          history[res[name]] = res;
          localStorage.setItem(objName,JSON.stringify(history));
        }

    },

    updateFootOne(name,objName,fieldName,field){
        const self = this;
        if(localStorage.getItem(objName)){
          var history = localStorage.getItem(objName);
          console.log(history);
          if(history[name]){
            history[name][fieldName] = field;
            localStorage.setItem(objName,JSON.stringify(history));
          }
        }else{
          return false;
        }

    },

    deleteFootOne(name,objName){
        const self = this;
        if(localStorage.getItem(objName)){
          var history = localStorage.getItem(objName);
          console.log(history);
          if(history[name]){
            delete history[name];
            localStorage.setItem(objName,history);
          }
        }else{
          return false;
        }

    },

    getJsonLength(json){
        var length = 0;
        for(var item in json ){
            length++ 
        };
        return length;
    },

    jsonToArray(obj,type) {
        
        const result = [];
        for (let key in obj) {
            //result.push(key);
            if(type=='push'){
                result.push(obj[key]);
            }

            if(type=='unshift'){
                result.unshift(obj[key]);
            }
            
            
        }
        return result;
    },

    getStorageArray(storageName,key,value){
        const self = this;
        var array = JSON.parse(localStorage.getItem(storageName));
        if(key&&value&&array){
            var index = self.findItemInArray(array,key,value)[0];
            return array[index];
        }else if(array){
            return array
        }else{
            return false
        };
    },

    setStorageArray(storageName,item,key,limit,type='unshift'){

        const self = this;
        if(localStorage.getItem(storageName)){
            var array = JSON.parse(localStorage.getItem(storageName));
            if(array.length<limit){
                self.setItemInArray(array,item,key,type);
            }else{
                if(type=='unshift'){
                    array.splice(array.length-1,1);
                }else{
                    array.splice(0,1);
                };
                self.setItemInArray(array,item,key,type);
            };
        }else{
            var array = [];
            array[type](item);
        };
        array = JSON.stringify(array);
        localStorage.setItem(storageName,array);
        return true;

    },

    delStorageArray(storageName,item,key){

        const self = this;
        var array = JSON.parse(localStorage.getItem(storageName));
        var index = self.findItemInArray(array,key,item[key])[0];
        array.splice(index,1);
        array = JSON.stringify(array);
        localStorage.setItem(storageName,array);
        return true;

    },


    findItemInArray(array,fieldName,field){

        for(var i=0;i<array.length;i++){
            if(array[i][fieldName] == field){
                return [i,array[i]];
            }
        };
        return false;

    },

    setItemInArray(array,item,fieldName,type='push'){
        var findI = -1;
        for(var i=0;i<array.length;i++){
            if(array[i][fieldName] == item[fieldName]){
                findI = i;
            };
        };
        if(findI>=0){
            array[i] = item;
        }else{
            array[type](item);
        };
        return array;
    },



}

// console.log(this);