<template>
  <div class="team">

      <v-container class="my-5" >

          <v-layout row wrap>
              <v-flex xs12 sm6 lg3  v-for="person in team" :key="person.name" >
                  <v-card class="text-center ma-3">
                    <v-responsive class="pt-4">
                       image goes here
                    </v-responsive> 
                    <v-card-text>
                        <div class="subheading"> {{person.name}} </div>
                        <div class="grey--text"> {{person.role}} </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn small text color="grey">
                            <v-icon small left>mdi-message</v-icon>
                            <span>Message</span>
                        </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-flex>
          </v-layout>
          
      </v-container>

  </div>
</template>

<script>
export default {
  data(){
    return{
        team: [
            { name: 'The Net Ninja', role: 'Web developer' },
            { name: 'Ryu', role: 'Graphic designer' },
            { name: 'Chun Li', role: 'Web developer' },
            { name: 'Gouken', role: 'Social media maverick' },
            { name: 'Yoshi', role: 'Sales guru'}
        ]
    }
  }
}
</script>