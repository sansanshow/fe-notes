<template>
<section class="login-container">
    <el-row type="flex" class="login-header" justify="center">
        <h3>系统登录</h3>
    </el-row>
    <el-row type="flex" justify="center">
        <el-form :model="login" status-icon :rules="rules" ref="loginForm" label-width="60px" class="login-form">
            <el-form-item label="用户名" prop="uname">
                <el-input type="password" v-model="login.uname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="login.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('login')">提交</el-button>
                <el-button @click="resetForm('login')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</section>
</template>
<script>
export default {
    name: 'Index',
    data () {
        return {
            login: {
                uname: '',
                pass: ''
            },
            rules: {
            }
        }
    },
    methods: {
        submitForm () {
            const params = Object.assign({}, this.login)
            this.$api.login(params).then((res) => {
                console.log(res)
                this.$router.push('/home')
            })
        }
    },
    created () {
        // this.$http.get('/user/login').then((res) => {
        //     console.log(res)
        // })
    }
}
</script>
<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    position: relative;
    .login-header {
        padding-top: 160px; 
    }
    .login-form {
        position: relative;
        border-radius: 10px;
        padding: 20px;
        padding-top: 40px;
        background: #2E3B4B;
        width: 450px;
        height: 220px;
    }
}
</style>
