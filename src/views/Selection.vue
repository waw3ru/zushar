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
                        <button class="ui orange labeled icon button"
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
                            <multiselect
                            :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                            </multiselect>
                        </template>
                        <template v-if="(activeComponent.txt === 'Multichoice')">
                            <multichoice
                            :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                            </multichoice>
                        </template>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { selection } from '../vuex/questionTypes.js'
    
    import dropdown from '../components/selection/DropdownPreview.vue'
    import multiselect from '../components/selection/MultiselectPreview.vue'
    import multichoice from '../components/selection/MultichoicePreview.vue'

    export default {
        name: 'Selection',
        components: {
            dropdown,
            multiselect,
            multichoice
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