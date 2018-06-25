{
    Vue.component('app-aside',{
        props:['logoutshow'],
        template:`
        <aside>
            <div class="upButton">
                <ul>
                    <li>
                        <button @click="$emit('save')">保存</button>
                    </li>
                    <li>
                        <button @click="$emit('preview')">预览</button>
                    </li>
                    <li>
                        <button @click="$emit('share')">分享</button>
                    </li>
                    <li>
                        <button @click="$emit('print')">打印</button>
                    </li>
                    <li>
                        <button @click="$emit('changetheme')">换肤</button>
                    </li>

                </ul>
            </div>
            <div class="downButton">
                <button  @click="$emit('outlogin')"  v-show = "logoutshow" v-cloak>登出</button>
            </div>
        </aside>
        `,
    })
}
