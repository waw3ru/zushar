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

        <div class="field">
            <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden" 
                v-model.lazy="current.isMandatory" :value="true">
                <label>Should the question be mandatory to answer ?</label>
            </div>
        </div>

        <router-link 
            class="ui teal button" 
            v-if="$route.name==='editProperties'"
            :to="{ name: 'choicesEditor' }"
            tag="button">

            <i class="wizard icon"></i> Add / Edit question choices
        </router-link>

        <div class="ui divider"></div>

        <button class="ui large labeled icon button" tabindex="0" type="submit">
            <i class="save icon"></i> Save the Properties 
        </button>

    </form>
</template>

<script>
    import 'semantic/dist/components/checkbox.js'
    import { selection } from '../../vuex/questionTypes.js'

    export default {
        name: 'dropdownEditor',
        props: {
            save: {
                type: Function,
                required: true
            },
            properties: {
                type: Object,
                default: () => { return {} }
            }
        },
        data() {
            return {
                current: Object.assign({}, selection.dropdown)
            }
        },
        methods: {
            saveProps(data) {
                this.save({
                    type: 'dropdown',
                    props: Object.assign({}, data)
                })
            }
        },
        mounted() {
            if (!_.isEmpty(this.properties)) {
                this.current = Object.assign({}, this.properties)
            }
            $(`.ui.checkbox`).checkbox()
        }
    }
</script>

<style>
    
</style>