<template>
  <el-card class="form box-card">
    <el-form
      :model="ruleForm"
      status-icon :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  export default {
    data() {
      // eslint-disable-next-line consistent-return
      const name = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the name'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else if (value < 18) {
              callback(new Error('Age must be greater than 18'));
            } else {
              callback();
            }
        }, 1000);
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        }
      };
      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: name, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // eslint-disable-next-line consistent-return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.info('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="scss">
  .form {
    width: 100%;
    max-width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
