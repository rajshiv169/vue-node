<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Add a new category</h2>

                    <form>
                        <div class="a-spacing-top-medium">
                            <label>Title</label>
                            <input class="a-input-text" style="width:100%" v-model="title"/>
                        </div>

                        <!-- button -->
                        <hr/>
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onAddCategory">Add category</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br/>
                    <b-list-group>
                        <b-list-group-item v-for="category in categories" :key="category._id"> {{category.title}} </b-list-group-item>
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
            let response = await $axios.$get("http://localhost:3000/api/categories") 
            return {
                categories : response.categories
            }
        } catch(err){
            console.log(err);
        }
    },

    data() {
        return {
            title: ""
        }
    },
    
    methods: {
        async onAddCategory(){
           try {
                let data = {title: this.title};
                let response = await this.$axios.$post("http://localhost:3000/api/categories",data);
                
                if(response.status){
                    this.categories.push(data);
                }
           } catch(err) {
               console.log(err);
           }
        }
    }
}
</script>