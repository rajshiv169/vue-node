<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Profile Page</h2>
                    <a href="#" @click="onLogout">Logout</a>
                    <form>
                        <!-- name -->
                        <div class="a-spacing-top-medium">
                            <label>Name</label>
                            <input class="a-input-text" style="width:100%" v-model="name" :placeholder="$auth.$state.user.name"/>
                        </div>

                        <!-- email -->
                        <div class="a-spacing-top-medium">
                            <label>Email</label>
                            <input class="a-input-text" style="width:100%" v-model="email" :placeholder="$auth.$state.user.email"/>
                        </div>

                        <!-- password -->
                        <div class="a-spacing-top-medium">
                            <label>Password</label>
                            <input class="a-input-text" style="width:100%" v-model="password"/>
                        </div>

                        <!-- button -->
                        <hr/>
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br/>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    
    methods: {
        async onUpdateProfile() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            try {
                let response = await this.$axios.$put("/api/auth/user", data);
                //console.log(response);
                if(response.success){
                    this.name = "";
                    this.email = "";
                    this.password = "";

                    await this.$auth.fetchUser();
                }
                
            } catch(err){
                console.log(err);
            }
        },

        async onLogout() {
            try {
                await this.$auth.logout();
            } catch(err){
                console.log(err);
            }
        }
    }
}
</script>