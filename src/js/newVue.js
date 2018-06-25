{
    var app = new Vue({
        el: '#app',
        data: {
            editingName: false,
            signUppage: false,
            signInpage: false,
            sharePage: false,
            changeTheme: false,
            logoutshow: false,
            shareLink: '请先登录',
            currentUser: {
                objectId: '',
                email: ''
            },
            previewUser: {
                objectId: '',
            },
            previewResume: {},
            resume: {
                name: '姓名',
                gender: '男',
                birthday: '出生年月',
                jobTitle: '职位名称',
                age: '年龄',
                phone: '手机号',
                skills: [{
                        name: '请添加技能',
                        description: '请添加内容'
                    },
                    {
                        name: '请添加技能',
                        description: '请添加内容'
                    },
                    {
                        name: '请添加技能',
                        description: '请添加内容'
                    },
                    {
                        name: '请添加技能',
                        description: '请添加内容'
                    }
                ],
                project: [{
                        name: '项目名称',
                        url: 'www.xxx.com',
                        keyword: '关键字',
                        content: '具体内容'
                    },
                    {
                        name: '项目名称',
                        url: 'www.xxx.com',
                        keyword: '关键字',
                        content: '具体内容'
                    },
                    {
                        name: '项目名称',
                        url: 'www.xxx.com',
                        keyword: '关键字',
                        content: '具体内容'
                    }
                ]
            },
            mode: 'edit',
            Theme: 'default'
        },
        watch: {
            'currentUser.objectId': function (newvalue, oldvalue) {
                if (newvalue) {
                    this.getResume(this.currentUser).then((resume) => {
                        this.resume = resume
                    })
                }
            }
        },
        computed: {
            displayResume() {
                if (this.mode === 'preview') {
                    return this.previewResume
                } else {
                    return this.resume
                }
                //   return this.mode === 'preview' ? this.previewResume :this.resume 
            }
        },
        methods: {
            onClickSave() { //点击判断是否保存
                let currentUser = AV.User.current()
                if (!currentUser) {
                    this.signInpage = true
                } else {
                    this.saveResume()
                }
            },
            onClickShare() {
                if (this.currentUser.objectId) {
                    this.sharePage = true
                    this.shareLink = location.href + '?user_id=' + app.currentUser.objectId
                } else {
                    alert('请先登录')
                }
            },
            onLogin(user){
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                app.logoutshow = true
                this.signInpage = false
            },
            outLoginIn() { //注销
                AV.User.logOut()
                // 现在的 currentUser 是 null 了
                app.logoutshow = false
                alert('注销成功')
                window.location.reload()
            },
            saveResume() { //保存
                let objectId = AV.User.current().toJSON().objectId
                let resume = AV.Object.createWithoutData('User', objectId);
                console.log(resume)
                // 修改属性
                resume.set('resume', this.resume);
                // 保存到云端
                resume.save()
                alert('保存成功')
            },
            getResume(user) { //获取数据
                var query = new AV.Query('User');
                return query.get(user.objectId).then((user) => {
                    let resume = user.toJSON().resume
                    return resume
                }, (error) => {
                    console.log(error)
                });
            },  
            print() { //打印项目
                window.print()
            },

        }
    })


    //获取当前用户的ID
    let currentUser = AV.User.current()
    if (currentUser) {
        app.logoutshow = true
        app.currentUser = currentUser.toJSON()
        app.getResume(app.currentUser).then((resume) => {
            app.resume = resume
        })
    }
    // 获取预览用户的ID
    let search = location.search
    let regex = /user_id=([^&]+)/
    let matchs = search.match(regex)
    let userID
    if (matchs) {
        userID = matchs[1]
        app.mode = 'preview'
        app.getResume({
            objectId: userID
        }).then((resume) => {
            app.previewResume = resume
        })
    }

}