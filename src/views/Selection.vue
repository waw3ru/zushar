<!-- created by waweru -->

<template>
    <div class="ui container" id="selection-component">
        <!-- list of selection components menu -->
        <div class="ui two column grid">
            <div class="centered three wide column">
                <div class="ui secondary pointing vertical menu">
                <div class="header item">Selection Components</div>
                <a class="item" :class="{'blue active': (activeComponent.txt===component.txt) }"
                    v-for="component in components" 
                    @click.prevent="(activeComponent = component);">

                    <i :class="component.icon" class="icon"></i>
                    {{ component.txt }}

                </a>
                </div>
            </div>
            
            <!-- preview component -->
            <div class="centered column">
                <div class="ui stacked segments" >

                    <h4 class="ui top attached header">
                        <i class="icon" :class="activeComponent.icon"></i> 
                        {{ activeComponent.txt }} Text Input
                    </h4>
                    
                    <div class="ui center aligned basic segment">
                        <button class="ui brown labeled icon button"
                        @click.prevent="addComponent">
                        <i class="plus icon"></i>
                        Add question to workspace
                        </button>
                    </div>

                    <div class="ui basic segment">
                        <h5 class="ui dividing header">Component Preview</h5>
                        <template v-if="(activeComponent.txt === 'Dropdown')">
                            <dropdown
                            :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                            </dropdown>
                        </template>
                        <template v-if="(activeComponent.txt === 'Multiselect')">
                            <multi-select
                            :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                            </multi-select>
                        </template>
                        <template v-if="(activeComponent.txt === 'Multichoice')">
                            <multi-choice
                            :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                            </multi-choice>
                        </template>
                    </div>

                    <div class="ui secondary segment">
                        <h5 class="ui grey dividing header">Component Properties Editor</h5>
                        <template v-if="(activeComponent.txt === 'Dropdown')">
                            <dropdown-editor :save="saveProps"></dropdown-editor> 
                        </template>
                        <template v-if="(activeComponent.txt === 'Multichoice')">
                            <multichoice-editor :save="saveProps"></multichoice-editor> 
                        </template>
                        <template v-if="(activeComponent.txt === 'Multiselect')">
                            <multiselect-editor :save="saveProps"></multiselect-editor> 
                        </template>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { selection } from '../vuex/questionTypes.js'
    
    import dropdown from '../components/selection/DropdownPreview.vue'
    import multiSelect from '../components/selection/MultiselectPreview.vue'
    import multiChoice from '../components/selection/MultichoicePreview.vue'
    import dropdownEditor from '../components/selection/DropdownPropertiesEditor.vue'
    import multiselectEditor from '../components/selection/MultiselectPropertiesEditor.vue'
    import multichoiceEditor from '../components/selection/MultichoicePropertiesEditor.vue'
    

    export default {
        name: 'Selection',
        components: {
            dropdown,
            multiSelect,
            multiChoice,
            dropdownEditor,
            multiselectEditor,
            multichoiceEditor
        },
        data() {
            return {
                components: [
                    { txt: 'Dropdown', icon: 'chevron down' },
                    { txt: 'Multichoice', icon: 'selected radio' },
                    { txt: 'Multiselect', icon: 'checkmark box' }
                ],
                activeComponent: { txt: 'Dropdown', icon: 'text cursor' },
                inputTemplates: Object.assign({}, selection)
            }
        },
        methods: {
            saveProps(data, cb = function () {}) {
                this.inputTemplates[data.type] = Object.assign({}, data.props);
                cb();
            },
            addComponent() {

                let component = this.activeComponent.txt.toLowerCase();
                this.$store.dispatch('add_question', {
                    TYPE: 'ADD_QUESTION',
                    question: this.inputTemplates[component]
                })
                this.inputTemplates[component] = Object.assign({}, selection[component]);

            }
        }
    }
</script>

<style>
#selection-component{
    background: #FFF;
    border: 1px solid rgba(0,0,0,0.1);
    border-top: 3px solid sienna;
    padding-top: 30px;
    padding-bottom: 20px;
}
</style>