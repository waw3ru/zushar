<template>
<div class="ui container" id="save-draft">
    <div class="ui grid">
        <div class="centered eight wide column">
            <div class="ui basic segment">

                <h3 class="ui dividing header">
                    Save Form
                </h3>

                <form class="ui form" novalidate @submit.prevent="saveForm">
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
                        type="submit">

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

import { mapState } from 'vuex'

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
    computed: {
        workspaceStatus: {
            get() {
                return this.$store.state.workspace.status
            },
            set(status) {
                if (status==='update') {
                    this.name = this.$store.workspace.form.metadata.name;
                    this.description = this.$store.workspace.form.metadata.deescription;
                }
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
            };

            this.$store.dispatch('create_form', {
                TYPE: 'CREATE_FORM',
                metadata
            });

            this.$store.dispatch('alert', {
                TYPE: 'CREATE_ALERT',
                alert: {
                    content: {
                        message: `Successfully saved the form to you local database.`,
                        icon: `thumbs up`,
                        heading: `Saved form`
                    },
                    level: 'success'
                },
                timeout: 3500
            })

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