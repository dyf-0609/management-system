<template>
    <div class="register">
        <p>
            <input type="text" placeholder="请输入用户名" v-model="username">
        </p>
        <p>
            <input type="text" placeholder="请输入密码" v-model="password">  
        </p>
        <p>
            <button @click="registerAction">注册</button>
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
        registerAction(){
            axios.post(
                '/api/user/register',
                {
                    username:this.username,
                    password:this.password
                }
            )
            .then(data=>{
                // console.log(data);
                if(data.data.code===0){
                    //注册成功
                    alert(data.data.message);
                    this.$router.push('./login');
                }else{
                    //注册失败
                    alert(data.data.message);
                }
            })
            .catch(error=>{
                console.log(error);
                alert('注册失败');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.register{
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
            width:260px;
            height: 40px;
            background-color: rgba(16, 142, 233, 1);
            border-radius: 8px;
            cursor: pointer;
        }
    }
}
</style>