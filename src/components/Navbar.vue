<template>
    <nav>

    <v-snackbar
        color="success"
        v-model="snackbar"
        top
    >
        {{text}}
        <template v-slot:action="{ attrs }">
            <v-btn text color = "white" v-bind="attrs"  @click="snackbar = false" class = "caption">Close</v-btn>
        </template>
    </v-snackbar> 

    <v-snackbar
        color="red"
        v-model="snackbar2"
        top
    >
        {{text2}}
        <template v-slot:action="{ attrs }">
            <v-btn text color = "white" v-bind="attrs"  @click="snackbar2 = false" class = "caption">Close</v-btn>
        </template>
    </v-snackbar> 

        <v-toolbar flat app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span >Ninja</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" color="grey">
                        <v-icon left>mdi-chevron-down</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>
                            <v-icon>{{link.icon}}</v-icon>
                            {{ link.text }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn text color="grey">
                <span>Sign out</span>
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer temporary v-model="drawer" app class="indigo">

            <v-layout column align-center >
                <v-flex class="mt-5" >
                    <v-avatar size="100">
                        <img src="/avatar-1.png">
                    </v-avatar>
                    <p class="white--text subheading mt-1">The net Ninja</p>
                </v-flex>
            </v-layout>

            <v-flex class="my-4">
                <Popup @projectAdded="snackbar=true" @projectError="snackbar2=true"/>
            </v-flex> 

            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action >
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content >
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
              
        </v-navigation-drawer>
      
    </nav>
</template>

<script>
import Popup from './Popup'
export default {
  components: { Popup },
    data(){
        return{
            drawer: false,
            alert:true,
            links: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-folder', text: 'My Projects', route: '/projects'},
                {icon: 'mdi-account', text: 'Team', route: '/team'},
            ],
            snackbar:false,
            text: 'Project added with Sucessfull ',
            snackbar2:false,
            text2: 'Unexpected error',
        }
    }
}
</script>