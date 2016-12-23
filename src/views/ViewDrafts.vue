
<template>
    <div class="ui container" id="drafts">
        <div class="ui grid">
            <div class="centered sixteen wide column">
                <h2 class="ui center aligned header"> List of your drafts </h2>
                <div class="ui basic segment">
                    <table class="ui small celled table">
                        <thead>
                            <tr>
                                <th>Form Name</th>
                                <th>Creator</th>
                                <th>Status</th>
                                <th>Creation date</th>
                                <th v-for="options in 3" v-if="(forms.length > 0)"></th>
                            </tr>
                        </thead>
                        <tr v-for="(form, $index) in forms" :key="$index">
                            <td>{{ form.metadata.name }}</td>
                            <td>{{ form.metadata.creator }}</td>
                            <td>{{ form.metadata.status }}</td>
                            <td>{{ form.metadata.timestamp.creation }}</td>
                            <!-- options buttons -->
                            <td class="center aligned tbl-options info">
                                <i class="eye icon"></i> Preview Form
                            </td>
                            <td @click="updateForm($index)" class="warning center aligned tbl-options">
                                <i class="refresh icon"></i> Update Form
                            </td>
                            <td @click="removeForm(form.id)" class="error center aligned tbl-options">
                                <i class="trash icon"></i> Delete Form
                            </td>

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
        this.$store.dispatch('load_forms', {
            TYPE: 'LOAD_FORMS',
            forms: getForms()
        });
    },
    methods: {
        removeForm(id) {
            this.$store.dispatch('remove_form', {
                TYPE: 'REMOVE_FORM',
                id
            })
        },
        updateForm(index) {
            alert(`Not yet functioning`);
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
.tbl-options{
    cursor: pointer;
    background: rgba(3,169,244,.07);
    color: rgba(1,87,155,1);
}
</style>