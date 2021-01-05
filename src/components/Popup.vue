<template>
  
  <div class="text-center">
  
    <v-dialog v-model="dialog" width="600">

      <template v-slot:activator="{ on, attrs }">
        <v-btn class="success" dark v-bind="attrs" v-on="on">Add New Project</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add a New Project</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
            :rules="inputRules"
            label="Title"
            v-model="title"
            prepend-icon="mdi-folder"
            ></v-text-field>

            <v-textarea
            :rules="inputRules"
            label="Information"
            v-model="content"
            prepend-icon="mdi-pencil"
            ></v-textarea>


            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  readonly
                  :rules="inputRules"
                  v-model="dateFormatted"
                  label="Due date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date"
                no-title
                scrollable
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>

            <v-btn color="success mx-0 mt-3" @click="submit" :disabled="loading" :loading="loading">Add Project</v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="close">fechar</v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>

   
    
  </div>
    
</template>

<script>
import Project from '@/project'
import { http } from '@/config'


export default {
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      dialog: false,
      title: '',
      content: '',
      inputRules: [
      v => v.length >= 3 || 'Minimum lenght is 3 characters' 
      ],
      loading: false,
      errors: [],
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods:{
      submit(){
        if(this.$refs.form.validate()){
            this.loading = true
            const project = {
              title: this.title,
              content: this.content,
              due: this.dateFormatted,
              person: 'The Net Ninja',
              status: 'Ongoing'
            }
            http.post('projects/',project).then(()=>{
              this.title = ''
              this.content = ''
              this.dialog = false
              this.loading = false
              this.menu1 = false
              this.$refs.form.reset()
              this.$emit('projectAdded')
            }).catch( e => {
              this.$emit('projectError')
              this.loading = false
              this.errors = e.response.data.errors
            })
        }
      },

      salvar(){
       Project.salvar(this.project).then(()=>{
        })

      },
       close() {
         this.dialog = false
         this.title = ''
         this.content = ''
         this.$refs.form.reset()
      },
    

      formatDate (date) {
          if (!date) return null

          const [year, month, day] = date.split('-')
          return `${day}/${month}/${year}`
      },

      parseDate (date) {
          if (!date) return null

          const [day, month, year] = date.split('/')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
  }
   
}
</script>