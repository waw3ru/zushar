<!-- created by waweru -->

<template>
    <form class="ui form" novalidate>
        <div 
            class="fields" 
            :class="{ 
                'grouped': (properties.displayFormat==='vertical'), 
                'vertical': (properties.displayFormat==='horizontal') 
            }">

            <label for="choices" v-if="properties.label">{{properties.label}}</label>

            <div class="field" v-for="choice in properties.choices" :key="$index">
                <div class="ui radio checkbox">
                    <input type="radio" name="choices" :value="choice.value">
                    <label>{{ choice.display }}</label>
                </div>
            </div>

        </div>
    </form>
</template>

<script>
    import 'semantic/dist/components/transition.js'
    import 'semantic/dist/components/dropdown.js'

    export default {
        name: 'multichoice',
        props: {
            properties: {
                type: Object,
                default: () => { return {} },
                required: true
            }
        },
        mounted() {
            $(`.ui.radio.checkbox`).checkbox()
        }
    }
</script>

<style>

</style>