<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="text-center">
                        <a href="#"><img src="/img/logo-black.png"/></a>
                    </div>
                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-large form-box">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small a-spacing-small-edit">Create account</h1>
                            </div>
                            <!-- Your Name -->
                            <div class="a-row a-spacing-base">
                                <label for="ap_customer_name" class="a-form-label">Your name</label>
                                <input type="text" id="ap_customer_name" 
                                class="a-input-text form-control auth-autofocus auth-require-field auth-contact-verification-request-info"
                                v-model="name"/>
                            </div>
                            <!-- Your Email -->
                            <div class="a-row a-spacing-base">
                                <label for="ap_customer_name" class="a-form-label">Email</label>
                                <input type="email" id="ap_customer_name" 
                                class="a-input-text form-control auth-autofocus auth-require-field auth-contact-verification-request-info"
                                v-model="email"/>
                            </div>
                            <!-- Password -->
                            <div class="a-row a-spacing-base">
                                <label for="ap_customer_name" class="a-form-label">Password</label>
                                <input type="password" id="ap_customer_name" class="a-input-text form-control auth-autofocus auth-require-field auth-contact-verification-request-info"
                                v-model="password"/>
                                <div class="a-alert-container">
                                    <div class="a-alert-content">Password must be at least 6 characters</div>
                                </div>
                            </div>
                            <!-- button -->
                            <div class="a-row a-spacing-extra-large mb-4">
                                <span class="a-button-primary">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onSignup">
                                            Create your Amazon account
                                        </span>
                                    </span>
                                </span>
                                <div class="a-row a-spacing-top-medium a-size-small">
                                    <b>
                                        By Creating an account, you agree to Amazon's
                                        <a href="#">Conditions of Use</a> and
                                        <a href="#">Privacy Notice</a>
                                    </b>
                                </div>
                            </div>

                            <hr/>
                            <div class="a-row">
                                <b>
                                    Already have an account?
                                    <nuxt-link to="/login" class="a-link-emphasis">Sign in</nuxt-link>
                                </b>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "none",

    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },

    methods : {
        async onSignup() {
            try {
                let data = {
                    name : this.name,
                    email : this.email,
                    password : this.password
                };

                
                let response = await this.$axios.$post("/api/auth/signup",data);
                console.log(response);

                if(response.success) {
                    // console.log("we're here");
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        } 
                    });
                    // let response_auth = await this.$auth.loginWith('local', { data: {
                    //     email: this.email,
                    //     password: this.password
                    // } });
                    // console.log(response_auth);
                }

                this.$router.push("/");
            } catch(err){
                console.log(err);
            }
        }
    }
};
</script>

<style>
.form-box {
    padding: 0px 15px 30px 15px;
}

.a-spacing-small-edit {
    margin-left: -17px ;
}

</style>