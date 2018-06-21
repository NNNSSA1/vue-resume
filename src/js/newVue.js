{


    var app = new Vue({
        el: '#app',
        data: {
            editingName: false,
            loginpage:false,
            signUppage:false,
            signInpage:true,
            currentUser:{
                id:'',
                email:''
            },
            resume: {
                name: '宋萌',
                gender: '男',
                birthday: '1995/12/06',
                jobTitle: '初级前端工程师',
                age: '23',
                phone: '15172545344'
            },
            signUp:{
                email:'',
                password:''
            },
            loginIn:{
                email:'',
                password:''
            }
         

        },
        methods: {
            onEdit(key,value) {
                this.resume[key] = value
            },
            onClickSave(){ //保存
                let currentUser = AV.User.current()
                if(!currentUser){
                    this.loginpage = true
                
                }else{
                    this.saveResume()
                }
            },
            onSignUp(){//注册
                const user = new AV.User()
                //设置用户名
                user.setUsername(this.signUp.email)
                //设置密码
                user.setPassword(this.signUp.password)
                //设置email
                user.setEmail(this.signUp.email)
                user.signUp().then(function(user){
                    console.log(user)
                },function(error){
                    console.log(error)
                })
            },
            outLoginIn(){ //注销
                AV.User.logOut();
                // 现在的 currentUser 是 null 了
                alert('注销成功')
                window.location.reload()

            },
            onLoginIn(){ //登录
                AV.User.logIn(this.loginIn.email, this.loginIn.password).then( (user)=>{
                    user = user.toJSON()
                    alert('登录成功')
                    this.loginpage = false
                    this.currentUser = {
                        id:user.objectId,
                        email:user.email
                    }
                  }, function (error) {
                        switch(error.code){
                            case 211:
                            alert('邮箱输入错误')
                            break
                            case 210:
                            alert('邮箱与密码不匹配')
                        }
                  })
            },
            saveResume(){
                let id = AV.User.current().id
                var resume = AV.Object.createWithoutData('User',id);
                // 修改属性
                resume.set('reusme', this.resume);
                // 保存到云端
                resume.save();
            },
            getResume(){
                var query = new AV.Query('User');
                query.get(this.currentUser.id).then(function (user) {
                    console.log(id)
                }, function (error) {
                    console.log(error)
                });
            }
        }
    })

    let currentUser = AV.User.current()
    if(currentUser){
        app.currentUser = currentUser
    }

}
