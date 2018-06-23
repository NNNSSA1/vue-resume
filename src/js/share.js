{
    Vue.component('share',{
        props:['shareLink'],
        template:`
        <div class="sharePage"v-cloak>
            <h4>请将下面的链接复制发送给你想要转发人。</h4>
            <span class="closeShare" @click="$emit('close-share')">x</span>
            <textarea readonly>{{shareLink}}</textarea>
        </div>
        `,
    })

}