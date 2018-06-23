{
    Vue.component('theme',{
        template:`
        <div class="changeTheme"  @click="changeTheme = !changeTheme">
            <button class="colorDefault" @click = "setTheme('defalut')">默认</button>
            <button class="colorBlueness" @click = "setTheme('blueness')">有一点青</button>
            <button class="colorRed" @click = "setTheme('red')">有一点红</button>
        </div>
        `,
        methods:{
            setTheme(name){
                this.Theme = name
            }
        }
    })
}