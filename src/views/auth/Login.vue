<template>
    <div class="login">
        <p>
            <input type="text" placeholder="请输入用户名  dd" v-model="username">
        </p>
        <p>
            <input type="password" placeholder="请输入密码  1" v-model="password"> 
        </p>
        <p>
            <button @click="loginAction">登录</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        loginAction(){
            axios.post(
                '/api/user/login',
                {
                    username:this.username,
                    password:this.password
                }
            )
            .then(data=>{
                if(data.data.code===0){
                    //登录成功
                    this.$store.dispatch('user/changeLoginAction',true);
                    this.$router.push({name:'home'});
                }else{
                    //登录失败
                    alert(data.data.message);
                }
            })
            .catch(error=>{
                alert('登录失败');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    margin-top: 30px;
    p{
        text-align: center;
        line-height: 50px;
        input{
            width: 250px;
            height: 24px;
            padding: 2px;
        }
        button{
            width: 260px;
            line-height: 40px;
            height: 40px;
            background-color: rgba(16, 142, 233, 1);
            border-radius: 8px;
            cursor: pointer;
        }
    }
}
</style>