<template>
  <v-container>

<!--   <v-layout row class="mb-3" >

      <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">by project name</span>
            </v-btn>
          </template>
          <span class="caption text-lowercase">Sorts projects by name</span>
      </v-tooltip> 
      
      <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person') " v-on="on">
              <v-icon left small >mdi-account</v-icon>
              <span class="caption text-lowercase">Project by person</span>
            </v-btn>
          </template>
          <span class="caption text-lowercase">Sorts projects by person</span>
      </v-tooltip> 

    </v-layout>
    
--> 
    
    
    <template>
          <div class="text-left">
            <v-menu botton offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="grey"
                  v-bind="attrs"
                  v-on="on"
                >
                
                <span class="caption text-capitalize">Sort by</span>
                <v-icon right>mdi-chevron-down</v-icon>                
                </v-btn>
                
              </template>

              <v-list>
                
                <v-list-item>
                  <v-btn small text color="grey" @click="sortBy('project') " v-on="on">
                      <v-list-item-title>
                        <span class="caption text-capitalize">Project</span>
                      </v-list-item-title>
                  </v-btn>
                </v-list-item>
                
                <v-list-item>
                  <v-btn small text color="grey" @click="sortBy('person') " v-on="on">
                      <v-list-item-title>
                        <span class="caption text-capitalize">Person</span>
                      </v-list-item-title>
                  </v-btn>
                </v-list-item>
              
              </v-list>
            </v-menu>
            <v-btn small text color="grey" @click="atualizar()" v-on="on">
               <span class="caption text-capitalize">Refresh</span>
               <v-icon right small >mdi-refresh</v-icon>
            </v-btn>
          </div>
    </template>


    <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">

          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{project.title}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div class="text-right">
              <v-chip small :class="`${project.status}`" class="caption white--text"  >{{project.status}}</v-chip>
            </div>
          </v-flex>

        </v-layout>
        <v-divider></v-divider>
    </v-card>

  </v-container>
</template>

<script>
//import db from '@/fb'
import { http } from '@/config'



export default {
 data(){
   return{
     projects: []
   }
 },

 methods:{
   sortBy(prop){
     this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
     },
    atualizar(){
      http.get('projects/').then( res => {
      this.projects = res.data
      console.log(res.data)
    })
    }
   },

   mounted(){
      http.get('projects/').then( res => {
      this.projects = res.data
      console.log(res.data)
    })
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
}
</script>


<style>
  .project.Complete{
    border-left: 6px solid #3cd1c2;
  }

  .project.Ongoing{
    border-left: 6px solid orange ;
  }
  
  .project.Overdue{
    border-left: 6px solid tomato;
  }

  .v-chip.v-chip--no-color.theme--light.Complete{
    background: #3cd1c2;
  }
  
  .v-chip.v-chip--no-color.theme--light.Overdue{
    background: tomato;
  }

  .v-chip.v-chip--no-color.theme--light.Ongoing{
  background: orange;
}

</style>