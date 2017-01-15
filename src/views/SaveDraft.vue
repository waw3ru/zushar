<template>
<div class="ui container" id="save-draft">
    <div class="ui grid">
        <div class="centered eight wide column">
            <div class="ui basic segment">

                <h3 class="ui dividing header">
                    {{ ($store.state.workspace.status === 'create') ? 'Save': 'Update' }} Form
                </h3>

                <form class="ui form" novalidate @submit.prevent="submitForm">
                    <div class="field">
                        <label>Enter the name of the form:</label>
                        <div class="ui fluid input">
                            <input 
                                type="text" 
                                placeholder="enter the name of the form" 
                                v-model="current.name">
                        </div>
                    </div>

                    <div class="field">
                        <label>What is this form all about ?</label>
                        <div class="ui fluid input">
                            <textarea type="text" v-model="current.description"></textarea>
                        </div>
                    </div>


                    <button 
                        class="ui basic button" 
                        type="submit" :class="[($store.state.workspace.status==='update') ? 'blue' : 'green']">

                        <i class="save icon"></i>
                        {{ ($store.state.workspace.status === 'create') ? 'Save': 'Update' }} Form
                    </button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment'

export default{
    name: 'saveDraft',
    data() {
        return {
            current: {
                name: null,
                description: null
            }
        }
    },
    mounted() {
        if (this.$store.state.workspace.status==='update') {
            this.current.name = this.$store.state.workspace.form.metadata.name;
            this.current.description = this.$store.state.workspace.form.metadata.description;
        }
    },
    methods: {
        submitForm() {
            if (this.$store.state.workspace.status==='create') this.saveForm()
            if (this.$store.state.workspace.status==='update') this.updateForm()
        },
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
            };

            this.$store.dispatch('create_form', {
                TYPE: 'CREATE_FORM',
                metadata
            });

            this.$router.push({ name: 'viewDrafts' });
        },
        updateForm() {
            let metadata = Object.assign({}, this.$store.state.workspace.form.metadata, {
                name: this.current.name,
                description: this.current.description
            })
            metadata.timestamp.updated = moment().format('YYYY/MM/DD')
            
            this.$store.dispatch('update_form', {
                TYPE: 'UPDATE_FORM',
                metadata
            });

            this.$router.push({ name: 'viewDrafts' });

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