<!-- created by waweru -->

<template>
    <form class="ui form" novalidate>
        <div class="field" :class="{ 'required': properties.isMandatory }">
            <label v-if="properties.label">{{properties.label}}</label>
            <select class="ui dropdown" :id="id">
                <option 
                    v-for="choice in properties.choices" 
                    :key="$index" 
                    :value="choice.value">
                    {{ choice.display}}
                </option>
            </select>
        </div>

        <p class="content" v-if="properties.instructions">
          {{ properties.instructions }}
        </p>

    </form>
</template>

<script>
    import uuid from 'uuid'

    import 'semantic/dist/components/transition.js'
    import 'semantic/dist/components/dropdown.js'
    
    export default {
        name: 'dropdown',
        props: {
            properties: {
                type: Object,
                default: () => { return {} },
                required: true
            },
            id: {
                type: String,
                default: uuid.v1()
            }
        },
        mounted() {
            $(`#${this.id}`).dropdown({
                on: 'click',
                transition: 'fade up'
            })  
        }
    }
</script>

<style>

</style>