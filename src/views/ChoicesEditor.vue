<!-- created by waweru -->

<template>

    <div class="ui container" id="choices-editor">
        <div class="ui grid">
            <div class="centered ten wide column">
                <router-link tag="button" class="ui left floated brown basic button" :to="{ name: 'editProperties' }">
                    <i class="chevron left icon"></i> Return to question editor
                </router-link>
            </div>

            <div class="centered twelve wide column" v-if="(question!==false)">
                <div class="ui basic segment">
                    <h3 class="ui header">
                        Editing Question Choices for #{{ $store.state.selectedQuestion+1 }}
                        <p class="sub header">Question type: {{ question.field }} from {{ question.fieldType }} components</p>
                    </h3>

                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>Choice display</th>
                                <th>Choice value</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(choice, $index) in question.choices" :key="$index" class="center aligned">
                                <td>{{ choice.display }}</td>
                                <td>{{ choice.value }}</td>
                                <td>
                                    <button class="ui tiny blue basic button">
                                        <i class="edit icon"></i>
                                        edit choice
                                    </button>
                                </td>
                                <td>
                                    <button class="ui tiny red basic button">
                                        <i class="remove icon"></i>
                                        remove choice
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>

            <div class="centered eight wide column">
                <choice-editor-form></choice-editor-form>
            </div>

            <div class="centered ten wide column" v-if="(question===false)">
                <h1 class="ui blue center aligned icon header">
                    <i class="remove circle outline icon"></i>
                    No Question 
                    <p class="sub header">
                        selected for editing.
                    </p>
                </h1>
            </div>
        </div>
    </div>

</template>

<script>
    import choiceEditorForm from '../components/ChoiceEditorForm.vue'

    export default {
        name: 'choicesEditor',
        components: {
            choiceEditorForm
        },
        computed: {
            question() {
                if (_.isNumber(this.$store.state.workspace.selectedQuestion) && this.$store.state.workspace.form.questions.length > 0) {
                    return this.$store.state.workspace.form.questions[this.$store.state.workspace.selectedQuestion]
                }
                else {
                    this.$store.commit('SELECT_QUESTION', null);
                    return false;
                }
            }
        }
                
    }
</script>

<style>
#choices-editor{
  background: #FFF;
  border: 1px solid rgba(0,0,0,0.1);
  border-top: 3px solid #212121;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}    
</style>