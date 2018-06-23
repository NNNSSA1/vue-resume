{

    Vue.component('main-inner',{
        props:['mode','displayResume'],
        template:`
            <div class="mainInner">
                <section class="resume">
                    <h1>
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.name' v-on:edit="onEdit('name',$event)"></edit-span >
                    </h1>
                    <p>应聘职位：
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.jobTitle' v-on:edit="onEdit('jobTitle',$event)"></edit-span>
                    </p>
                    <p>
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.birthday' v-on:edit="onEdit('birthday',$event)"></edit-span>
                        |
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.gender' v-on:edit="onEdit('gender',$event)"></edit-span>
                        |
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.age' v-on:edit="onEdit('age',$event)"></edit-span>
                        |
                        <edit-span  :disabled="mode === 'preview'" v-bind:value='displayResume.phone' v-on:edit="onEdit('phone',$event)"></edit-span>
                    </p>
                </section>
                <section class="skill">
                    <h2>技能</h2>
                    <ul class="skillList">
                        <li v-for="skill,index in displayResume.skills">
                            <edit-span  :disabled="mode === 'preview'" :value="skill.name" v-on:edit="onEdit('skills.' + index + '.name',$event)"></edit-span>
                            <div class="description">
                                <edit-span  :disabled="mode === 'preview'" :value="skill.description" v-on:edit="onEdit('skills.' + index + '.description',$event)"></edit-span>
                            </div>
                            <span class="deleteSkill" v-if="index>=2 &&mode === 'edit'" @click="deleteSkill(index)">x</span>
                        </li>
                        <div v-if ="mode === 'edit'"  class="addSkill">
                            <span @click="addSkill">点击添加技能</span>
                        </div>

                    </ul>
                </section>
                <section class="production">
                    <h2>项目经历</h2>
                    <ol class="productionList">
                        <li v-for="item,index in displayResume.project">
                                <h3> <edit-span  :disabled="mode === 'preview'" v-bind:value="item.name" v-on:edit="onEdit('project.'+ index +'.name',$event)"></edit-span> </h3>
                                <div class="productionIntro">
                                    <edit-span   :disabled="mode === 'preview'" v-bind:value="item.url" v-on:edit="onEdit('project.'+ index +'.url',$event)" ></edit-span>
                                    <edit-span   :disabled="mode === 'preview'" v-bind:value="item.keyword" v-on:edit="onEdit('project.'+ index +'.keyword',$event)"></edit-span>
                                </div>
                            <edit-span   :disabled="mode === 'preview'" v-bind:value="item.content" v-on:edit="onEdit('project.'+ index +'.content',$event)"></edit-span>
                            <span class="deleteProject"  v-if="index>=2 && mode === 'edit'"  @click="deleteProject(index)">x</span>
                        </li>
                        <div v-if ="mode === 'edit'"  class="addProject">
                            <span @click="addProject">点击添加项目</span>
                        </div>
                    </ol>
                </section>
            </div>
        `,
        methods:{
            addSkill() { //添加技能树
                app.resume.skills.push({
                    name: '请添加技能',
                    description: '请添加技能描述'
                })
            },
            addProject() { //添加项目经验
                app.resume.project.push({
                    name: '项目名称',
                    url: 'www.xxx.com',
                    keyword: '关键字',
                    content: '具体内容'
                })
            },
            deleteSkill(index) { //删除技能树
                app.resume.skills.splice(index, 1)
            },

            deleteProject(index) { //删除项目经验
                app.resume.project.splice(index, 1)
            },
        }
    })
}