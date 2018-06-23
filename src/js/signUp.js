{
    Vue.component('sign-up',{
        data(){
            return { signUp: {email: '', password: '' }}
        },
        template:`
        <div class="signUpForm" v-cloak>
            <form @submit.prevent="onSignUp" class="formUp">
                <h2>注册</h2>
                <span class="closeSign" @click="$emit('close-signup')">关闭</span>
                <div class="row">
                    <input type="text" name="phone" v-model="signUp.email" placeholder="请输入邮箱地址">
                </div>
                <div class="row">
                    <input type="password" name="password" v-model="signUp.password" placeholder="请输入密码">
                </div>
                <div class="action">
                    <input type="submit"></input>
                    <a @click="onClickLogin">已有账号点击登录</a>
                </div>
            </form>
        </div>
        `,
        methods:{
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
                    this.$emit('signUp',user)
                    this.signUppage = false
                }, function (error) {
                    alert(error.rawMessage)
                })
            },
            onClickLogin(){
                this.$emit('goToLogin')
            }
        }
    })

}