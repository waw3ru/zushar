<!-- created by waweru -->

<template>

    <div class="ui container" id="choices-editor">
        <div class="ui grid">
            <div class="centered ten wide column">
                <router-link tag="button" class="ui left floated green basic button" :to="{ name: 'editProperties' }">
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
                                    <button 
                                        class="ui mini blue basic button"
                                        @click="select_choice($index, 'edit')">
                                            <i class="edit icon"></i>
                                            edit
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        class="ui mini red basic button"
                                        @click="removeChoice($index)">
                                        <i class="remove icon"></i>
                                        remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    <button 
                        class="ui yellow labeled icon button"
                        @click="select_choice(null, 'add')">
                            <i class="add square icon"></i>
                            Add a New Choice
                    </button>

                </div>
            </div>

            <div class="centered eight wide column" v-if="(question!==false)">
                <form class="ui form" novalidate v-if="editMode!==null">
                    <h5 class="ui header">{{ (editMode==='edit') ? 'Edit': 'Add' }} Your Choice</h5>
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

                    <button 
                        class="ui basic blue button" 
                        type="submit"
                        @click.prevent="submitChoice(current)">
                        {{ (editMode==='edit') ? 'Edit': 'Add' }} Choice
                    </button>

                </form>
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

    export default {
        name: 'choicesEditor',
        data() {
            return {
                editMode: null,
                current: {
                    display: null,
                    value: null,
                    index: null
                }
            }
        },
        computed: {
            question() {
                let selectedQuestion, 
                    question; 

                if (_.isNumber(this.$store.state.workspace.selectedQuestion) && this.$store.state.workspace.form.questions.length > 0) {
                    selectedQuestion = this.$store.state.workspace.selectedQuestion;
                    question = this.$store.state.workspace.form.questions[selectedQuestion];
                    return question;
                }
                else {
                    this.$store.commit('SELECT_QUESTION', null);
                    return false;
                }
            }
        },
        methods: {
            select_choice(choice, mode) {

                switch (mode) {
                    case 'add':
                        this.current.display = null;
                        this.current.value = null;
                        this.current.index = null;
                        this.editMode = mode;
                        break;
                    case 'edit':
                        this.current.display = this.question.choices[choice].display;
                        this.current.value = this.question.choices[choice].value;
                        this.current.index = choice;
                        this.editMode = mode;
                        break;
                }

            },
            submitChoice(opts) {
                if (this.editMode === 'add') {
                    this.addChoice({
                        display: opts.display,
                        value: opts.value    
                    });
                }
                if (this.editMode === 'edit') {
                    this.editChoice({
                        display: opts.display,
                        value: opts.value,
                        index: opts.index    
                    });
                }

                this.current.display = null;
                this.current.value = null;
                this.current.index = null;
                this.editMode = null;
            },
            addChoice(opts) {
                /*
                * mutate store to sync new choice
                * */
                this.$store.commit('ADD_CHOICE', {
                    display: opts.display,
                    value: opts.value
                })
            },
            editChoice(opts) {
                /*
                * mutate the store to sync the choices
                * */
                this.$store.commit('EDIT_CHOICE', {
                    index: opts.index,
                    choice: {
                        display: opts.display,
                        value: opts.value
                    }
                })
            },
            removeChoice(index) {
                /*
                * mutate the store
                * */

                if (this.question.choices.length < 3) {
                    this.$store.dispatch('create_alert', {
                        TYPE: 'CREATE_ALERT',
                        heading: 'Error!',
                        message: `Cannot have less than two choices`,
                        icon: 'warning sign',
                        timeout: 4000,
                        level: 'error'
                    });
                    return 0;
                }
                else {
                    this.$store.commit('REMOVE_CHOICE', {
                        index
                    });
                    return 0;
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