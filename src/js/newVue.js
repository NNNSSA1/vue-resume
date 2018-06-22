

{


    var app = new Vue({
        el: '#app',
        data: {
            editingName: false,
            loginpage: false,
            signUppage: false,
            signInpage: true,
            sharePage: false,
            shareLink:'',
            currentUser: {
                objectId: '',
                email: ''
            },
            resume: {
                name: '宋萌',
                gender: '男',
                birthday: '1995/12/06',
                jobTitle: '初级前端工程师',
                age: '23',
                phone: '15172545344',
                skills: [
                    { name: '请添加技能', description: '请添加内容' },
                    { name: '请添加技能', description: '请添加内容' },
                    { name: '请添加技能', description: '请添加内容' },
                    { name: '请添加技能', description: '请添加内容' }
                ],
                project:[
                    {name:'项目名称',url:'www.xxx.com',keyword:'关键字',content:'具体内容'},
                    {name:'项目名称',url:'www.xxx.com',keyword:'关键字',content:'具体内容'},
                    {name:'项目名称',url:'www.xxx.com',keyword:'关键字',content:'具体内容'}    
                ]
            },
            signUp: {
                email: '',
                password: ''
            },
            loginIn: {
                email: '',
                password: ''
            }
        },
        methods: {
            onEdit(key, value) {
                let arr = key.split('.')
                let result = this.resume
                for (let i = 0; i < arr.length; i++) {
                    if (i === arr.length - 1) {
                        result[arr[i]] = value
                    } else {
                        result = result[arr[i]]
                    }
                }
            },
            onClickSave() { //点击判断是否保存
                let currentUser = AV.User.current()
                if (!currentUser) {
                    this.loginpage = true

                } else {
                    this.saveResume()
                }
            },
            onClickShare() {
                this.sharePage = true
            },
            onSignUp() {//注册
                const user = new AV.User()
                //设置用户名
                user.setUsername(this.signUp.email)
                //设置密码
                user.setPassword(this.signUp.password)
                //设置email
                user.setEmail(this.signUp.email)
                user.signUp().then((user) => {
                    alert('注册成功')
                    user = user.toJSON()
                    this.loginpage = false
                    this.currentUser = {
                        objectId: user.objectId,
                        email: user.email
                    }
                    window.location.reload()
                }, function (error) {
                    console.log(error)
                })
            },
            outLoginIn() { //注销
                AV.User.logOut();
                // 现在的 currentUser 是 null 了
                alert('注销成功')
                window.location.reload()

            },
            onLoginIn() { //登录
                AV.User.logIn(this.loginIn.email, this.loginIn.password).then((user) => {
                    user = user.toJSON()
                    alert('登录成功')
                    this.loginpage = false
                    this.currentUser = {
                        objectId: user.objectId,
                        email: user.email
                    }
                    window.location.reload()
                }, function (error) {
                    switch (error.code) {
                        case 211:
                            alert('邮箱输入错误')
                            break
                        case 210:
                            alert('邮箱与密码不匹配')
                    }
                })
            },
            saveResume() {//保存
                let objectId = AV.User.current().toJSON().objectId
                var resume = AV.Object.createWithoutData('User', objectId);
                // 修改属性
                resume.set('resume', this.resume);  
                // 保存到云端
                resume.save()
                alert('保存成功')
            },
            getResume() {//获取数据
                var query = new AV.Query('User');
                query.get(this.currentUser.objectId).then((user) => {
                    user = user.toJSON()
                    Object.assign(this.resume, user.resume)
                }, (error) => {
                    console.log(error)
                });
            },
            addSkill(){//添加技能树
                this.resume.skills.push({ name: '请添加技能', description: '请添加技能描述' })
            },
            deleteSkill(index){
                this.resume.skills.splice(index,1)
            },
            addProject(){
                this.resume.project.push({name:'项目名称',url:'www.xxx.com',keyword:'关键字',content:'具体内容'} )
            },
            deleteProject(index){
                this.resume.project.splice(index,1)
            }
        }
    })

    let currentUser = AV.User.current()
    if (currentUser) {
        app.currentUser = currentUser.toJSON()
        console.log(location.href)
        app.shareLink = location.href + '?user_id='+ app.currentUser.objectId
        console.log(app.shareLink)
        app.getResume()
    }

}
