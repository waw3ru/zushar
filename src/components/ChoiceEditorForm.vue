<!-- created by waweru -->

<template>
    <form class="ui form" novalidate>
        <h5 class="ui header">Edit Your Choice</h5>
        <div class="ui divider"></div>
        <div class="fields">
            <div class="field">
                <label>Enter the display text for the choice: </label>
                <div class="ui input">
                    <input type="text" placeholder="Display Text">
                </div>
            </div>
            <div class="field">
                <label>Enter the value for the choice: </label>
                <div class="ui input">
                    <input type="text" placeholder="Value for the choice">
                </div>
            </div>
        </div>

        <button class="ui basic blue button">Add Choice</button>
    </form>
</template>

<script>
    export default {
        name: 'choiceEditorForm',
        props: ['display', 'value', 'index']
    }
</script>

<style>
    
</style>