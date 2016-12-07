
<template>
    <div class="ui container" id="drafts">
        <div class="ui grid">
            <div class="centered sixteen wide column">
                <h2 class="ui center aligned header"> List of your drafts </h2>
                <div class="ui basic segment">
                    <table class="ui celled table">
                        <thead>
                            <tr class="right aligned">
                                <th># No.</th>
                                <th>Name</th>
                                <th>Creator</th>
                                <th>Status</th>
                                <th>Creation date</th>
                            </tr>
                        </thead>
                        <tr v-for="(form, $index) in forms" :key="form.id" class="center aligned">
                            <td>{{ $index + 1 }}</td>
                            <td>{{ form.metadata.name }}</td>
                            <td>{{ form.metadata.creator }}</td>
                            <td>{{ form.metadata.status }}</td>
                            <td>{{ form.metadata.timestamp.creation }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getForms } from '../vuex/database'

export default {
    name: 'ViewDrafts',
    computed: {
        ...mapState({
            forms: state => state.forms
        })
    },
    mounted() {
        this.$store.commit('CLEAR_FORMS');
        this.$store.dispatch('load_forms', {
            TYPE: 'LOAD_FORMS',
            forms: getForms()
        });
    },
    methods: {
        removeQuestion(id) {
            this.$store.dispatch('remove_question', {
                TYPE: 'REMOVE_QUESTION',
                id
            });
        }
    }
}
</script>

<style>
#drafts{
    background: #FFF;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
}
</style>

<!--
    load a list of all forms
    have functions: load form to workspace, remove form
-->