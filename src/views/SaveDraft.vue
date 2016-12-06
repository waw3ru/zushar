<template>
<div class="ui container" id="save-draft">
    <div class="ui grid">
        <div class="centered eight wide column">
            <div class="ui basic segment">
                <h3 class="ui dividing header">Save as Draft</h3>
                <form class="ui form" novalidate @submit.prevent="saveForm">
                    <div class="field">
                        <label>Enter the name of the form:</label>
                        <div class="ui fluid input">
                            <input type="text" placeholder="enter the name of the form" v-model="current.name">
                        </div>
                    </div>

                    <div class="field">
                        <label>What is this form all about ?</label>
                        <div class="ui fluid input">
                            <textarea type="text" v-model="current.description"></textarea>
                        </div>
                    </div>


                    <button class="ui basic button" type="submit">
                        <i class="save icon"></i>
                        Save Form
                    </button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default{
    name: 'saveDraft',
    data() {
        return {
            current: {
                name: '',
                description: ''
            }
        }
    },
    methods: {
        saveForm() {
            let metadata = {
                name: (_.isEmpty(this.current.name)) ? 'Untitled Form' : this.current.name,
                timestamp: {
                    creation: null,
                    updated: null
                },
                creator: null,
                status: null,
                description: (_.isEmpty(this.current.description)) ? 'no description' : this.current.description
            }

            if (this.$store.state.form.questions.length > 1) {
                this.$store.dispatch('create_form', {
                    TYPE: 'CREATE_FORM',
                    metadata
                });
            }


            this.$router.push({ name: 'Workspace' });
        }
    }
}
</script>

<style>
    #save-draft{
        background: #FFF;
        border: 1px solid rgba(0,0,0,0.1);
        border-top: 4px solid #0097A7;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>