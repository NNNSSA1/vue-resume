{
    Vue.component('edit-span', {
        props: ['value'],
        template: `
            <span class="editSpan">
                <span v-show='!editing'>{{value}}</span>
                <input v-show='editing' type="text" v-model='value' @input='triggleEdit'>
                <button v-show='!editing' v-on:click = 'editing = !editing'>编辑</button>
                <button v-show='editing' v-on:click = 'editing = !editing'>保存</button>
            </span>
        `,
        data() {
            return {
                editing: false,
            }
        },
        methods: {
            triggleEdit(e) {
                this.$emit('edit', e.target.value)
            }
        }
    })
}