<template>
  <div class="projects"> 

    <v-snackbar
        color="success"
        v-model="snackbar"
        top
    >
        Informações atualizadas
        <template v-slot:action="{ attrs }">
            <v-btn text color = "white" v-bind="attrs"  @click="snackbar = false" class = "caption">Close</v-btn>
        </template>
    </v-snackbar> 

    <v-container class="my-5">
       <v-btn small text color="grey" @click="atualizar()" v-on="on">
               <span class="caption text-capitalize">Refresh</span>
               <v-icon right small >mdi-refresh</v-icon>
       </v-btn> 


        <v-expansion-panels  v-for="project in myProject" :key="project" >
          <v-expansion-panel class="my-5">
            <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
            <v-expansion-panel-content >
              <v-card>
                <v-card-text class="px-4 grey--text">
                  <div class="font-weight-bold">Due by {{project.due}}</div>
                  <div>{{project.content}}</div>
                </v-card-text>
              </v-card>
                
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <v-btn>
                        <v-icon  small >mdi-pencil</v-icon>
                        <span class="caption text-capitalize">Edit</span>
                      </v-btn>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-card>
                    <v-form class="px-3" ref="form">
                      <v-text-field
                      :rules="inputRules"
                      label="Title"
                      v-model="project.title"
                      prepend-icon="mdi-folder"
                      ></v-text-field>

                      <v-textarea
                      :rules="inputRules"
                      label="Information"
                      v-model="project.content"
                      prepend-icon="mdi-pencil"
                      ></v-textarea>


                      <v-menu
                        ref="menu3"
                        v-model="menu3"
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
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="date = parseDate(dateFormatted)"
                            v-on="on"
                          ></v-text-field>

                           <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            @input="menu3 = false"
                            v-bind="attrs"
                            v-on="on"
                          ></v-date-picker>
                        </template>
                      </v-menu>
                      <v-btn color="success mx-0 mt-3" @click="salvar(project)" :disabled="loading" :loading="loading">Save</v-btn>
                      <v-btn color="success mx-0 mt-3" @click="atualizar()" >Cancel</v-btn>
                    </v-form>

                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

            </v-expansion-panel-content>
                <v-btn small text color="grey" @click="deletar(project.id)" v-on="on">
                  <v-icon  small >mdi-close</v-icon>
                  <span class="caption text-capitalize">Delete</span>
                </v-btn>
          </v-expansion-panel>
        </v-expansion-panels>
   
<!--
    <v-dialog v-model="dialog" width="600">

      <template v-slot:activator="{ on, attrs }">
        <v-btn small text color="grey" class="caption text-capitalize"  v-bind="attrs"  v-on="on"  @click="editar(project)">
          <v-icon  small >mdi-pencil</v-icon>
          <span class="caption text-capitalize">Edit</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Edit Project</v-card-title>
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
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>

            <v-btn color="success mx-0 mt-3" @click="submit" :disabled="loading" :loading="loading">Save</v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="close">Close</v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog> -->

    </v-container>
        

  </div>
</template>

<script>
//import db from '@/fb'
import { http } from '@/config'

export default {
data: vm => ({
      projects:[],
      title: '',
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      inputRules: [
        v => v.length >= 3 || 'Minimum lenght is 3 characters' 
      ],
      menu3: false,
      loading: false,
      snackbar: false,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      date: new Date().toISOString().substr(0, 10),
  }),

  computed:{
    myProject(){
      return this.projects.filter(project => {
        return project.person === 'The Net Ninja'
      })
    },
     computedDateFormatted () {
        return this.formatDate(this.date)
      },
  },
  methods:{
    atualizar(){
      http.get('projects/').then( res => {
      this.projects = res.data
      console.log(res.data)
      this.menu3 = false
      })
    },
    deletar(id){
      if(confirm('Are you sure you want to delete this project ?')){  
        http.delete('projects/'+id).then( () => {
            http.get('projects/').then( res => {
            this.projects = res.data
            console.log(res.data)
            this.menu3 = false
            })
        })
      }
    },
    editar(project){
      this.dialog = true
      this.title = project.title
    },
    salvar(project){
            this.loading = true
            project.due = this.dateFormatted
            http.patch('projects/'+project.id,project).then( ()=>{
            this.loading = false
            this.snackbar = true
              http.get('projects/').then( res => {
              this.projects = res.data
              console.log(res.data)
              this.menu3 = false
              })
            })
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
  },

   watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
  

/*
  created(){
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added'){
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
  }
*/
  mounted(){
      http.get('projects/').then( res => {
      this.projects = res.data
      console.log(res.data)
    })
   },
   
    
}
</script>