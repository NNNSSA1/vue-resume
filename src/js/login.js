{
    Vue.component('login',{
        template:`
            <div class="signInForm"  v-cloak>
                <form class="formIn" @submit.prevent="onLoginIn">
                <h2>登录</h2>
                <span class="closeSign" @click="$emit('close-login')">关闭</span>
                <div class="row">
                    <input type="text" name="phone" v-model="loginIn.email" placeholder="请输入邮箱地址">
                </div>
                <div class="row">
                    <input type="password" name="password" v-model="loginIn.password" placeholder="请输入密码">
                </div>
                <div class="action">
                    <input type="submit"></input>
                    <a @click="onClickSignUp">点击注册</a>
                </div>
                </form>
            </div>
        `,
        data(){
            return { loginIn: {email: '',password: ''}}  
            },
        methods:{
            onLoginIn() { //登录
                AV.User.logIn(this.loginIn.email, this.loginIn.password).then((user) => {
                    user = user.toJSON()
                    alert('登录成功')
                    this.$emit('login',user)
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
            onClickSignUp(){
                this.$emit('gotosignup')
            },
        }
    })
}