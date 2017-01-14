<!-- created by waweru -->

<template>
    <form class="ui form" novalidate @submit.prevent="saveProps(current)">
        <div class="field">
            <label>Enter the question</label>
            <div class="ui fluid input">
                <input type="text" v-model.lazy="current.label" 
                placeholder="Enter label">
            </div>
        </div>

        <div class="field">
            <label>Enter the question's instruction if any exist</label>
            <div class="ui fluid input">
                <input type="text" v-model.lazy="current.instructions" 
                placeholder="Enter instruction">
            </div>
        </div>

        <div class="grouped fields">
            <div class="field">
                <div class="ui radio checkbox">
                    <input 
                        type="radio" 
                        v-model="current.displayFormat" 
                        name="display"
                        :value="'horizontal'">
                    <label>Display the choices horizontally ?</label>
                </div>
            </div>

            <div class="field">
                <div class="ui radio checkbox">
                    <input 
                        type="radio" 
                        v-model="current.displayFormat" 
                        name="display"
                        :value="'vertical'">
                    <label>Display the choices vertically ?</label>
                </div>
            </div>

        </div>

        <div class="field">
            <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden" 
                v-model.lazy="current.isMandatory" :value="true">
                <label>Should the question be mandatory to answer ?</label>
            </div>
        </div>

        <button class="ui teal button">
            <i class="wizard icon"></i> Add / Edit question choices
        </button>

        <div class="ui divider"></div>

        <button class="ui large labeled icon button" type="submit">
            <i class="save icon"></i> Save the Properties 
        </button>

    </form>
</template>

<script>
    import 'semantic/dist/components/checkbox.js'
    import { selection } from '../../vuex/questionTypes.js'

    export default {
        name: 'multichoiceEditor',
        props: {
            save: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                current: Object.assign({}, selection.multichoice)
            }
        },
        methods: {
            saveProps(data) {
                this.save({
                    type: 'multichoice',
                    props: Object.assign({}, data)
                })
            }
        },
        mounted() {
            if (!_.isEmpty(this.properties)) {
                this.current = Object.assign({}, this.properties)
            }
            $(`.ui.checkbox`).checkbox()
            $(`.ui.radio.checkbox`).checkbox()
        }
    }
</script>

<style>
    
</style>