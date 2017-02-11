<!-- created by waweru -->

<template>
    <form class="ui form" novalidate>
        <div 
            class="fields" 
            :class="{ 
                'grouped': (properties.displayFormat==='vertical'), 
                'vertical': (properties.displayFormat==='horizontal') 
            }">

            <label class="que-label" v-if="properties.label">{{properties.label}}</label>

            <div class="field" v-for="(choice, $index) in properties.choices" :key="$index">
                <div class="ui checkbox">
                    <input type="checkbox" name="multiselect" :value="choice.value">
                    <label>{{ choice.display }}</label>
                </div>
            </div>

        </div>

        <p class="content" v-if="properties.instructions">
          {{ properties.instructions }}
        </p>
    </form> 
</template>

<script>
    import 'semantic/dist/components/transition.js'
    import 'semantic/dist/components/dropdown.js'
    
    export default {
        name: 'multiSelect',
        props: {
            properties: {
            type: Object,
            default: () => { return {} }
            }
        },
        mounted() {
            $(`.ui.checkbox`).checkbox()
        }
    }
</script>

<style>
.que-label{
    font-weight: bold;
}
</style>