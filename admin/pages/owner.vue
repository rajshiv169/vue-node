<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Add a new owner</h2>

                    <form>
                        <!-- Name -->
                        <div class="a-spacing-top-medium">
                            <label>Title</label>
                            <input class="a-input-text" style="width:100%" v-model="title"/>
                        </div>

                        <!-- About -->
                        <div class="a-spacing-top-medium">
                            <label>About</label>
                            <input class="a-input-text" style="width:100%" v-model="about"/>
                        </div>

                        <!-- Photot -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0px">Add Photo</label>
                            <div class="a-row a-spacing-top-medium">
                                <label class="choosefile-button">
                                    <i class="fal fa-plus"></i>
                                    <input type="file" @change="onFileSelected"/>
                                    <p style="margin-top: -70px; width:100%">{{ fileName }}</p>
                                </label>
                            </div>
                        </div>

                        <!-- button -->
                        <hr/>
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br/>
                    <b-list-group>
                        <b-list-group-item 
                        v-for="owner in owners" 
                        :key="owner._id"> 
                            {{owner.title}} 
                        </b-list-group-item>
                    </b-list-group>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $axios }){
        try {
            let response = await $axios.$get("http://localhost:3000/api/owners") 
            return {
                owners : response.owners
            }
        } catch(err){
            console.log(err);
        }
    },

    data() {
        return {
            title: "",
            about: "",
            selectedFile: null,
            fileName: ""
        }
    },
    
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },

        async onAddOwner(){
           try {
                let data = new FormData();
                data.append("title", this.title);
                data.append("about", this.about);
                data.append("photo", this.selectedFile, this.selectedFile.name);
                let response = await this.$axios.$post("http://localhost:3000/api/owners",data);
                
                if(response.status){
                    this.owners.push({title: this.title});
                }
           } catch(err) {
               console.log(err);

           }
        }
    }
}
</script>