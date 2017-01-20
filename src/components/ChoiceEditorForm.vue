<!-- created by waweru -->

<template>
    <form class="ui form" novalidate @submit.prevent="submitChoice(this.current)" v-if="mode!==null">
        <h5 class="ui header">{{ (mode==='edit') ? 'Edit': 'Add' }} Your Choice</h5>
        <div class="ui divider"></div>
        <div class="fields">
            <div class="field">
                <label>Enter the display text for the choice: </label>
                <div class="ui input">
                    <input 
                        type="text" 
                        placeholder="Display Text"
                        v-model.lazy="current.display"
                        name="display">
                </div>
            </div>
            <div class="field">
                <label>Enter the value for the choice: </label>
                <div class="ui input">
                    <input 
                        type="text" 
                        placeholder="Value for the choice"
                        v-model.lazy="current.value"
                        name="value">
                </div>
            </div>
        </div>

        <button class="ui basic blue button" type="submit">
            {{ (mode==='edit') ? 'Edit': 'Add' }} Choice
        </button>

    </form>
</template>

<script>
    export default {
        name: 'choiceEditorForm',
        props: {
            display: String,
            value: [String, Number],
            index: Number,
            mode: String,
            callback: Function
        },
        data() {
            return {
                current: {
                    display: this.display,
                    value: this.value,
                    index: this.index
                }
            };
        },
        methods: {
            submit(data) {
                // return new values to the parent node 
                this.callback({
                    display: this.current.display,
                    value: this.current.value,
                    index: this.current.index,
                    mode: this.mode
                });
                this.current.display = this.display;
                this.current.value = this.value;
                this.current.index = this.index;
            }
        }
    }
</script>

<style>
    
</style>