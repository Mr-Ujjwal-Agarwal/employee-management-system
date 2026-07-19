pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login ECR') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'aws-ecr',
                usernameVariable: 'AWS_ACCESS_KEY_ID',
                passwordVariable: 'AWS_SECRET_ACCESS_KEY'
            )
        ]) {
            sh './platform/cicd/scripts/ecr-login.sh'
        }
    }
}

        stage('Build Images') {
            steps {
                sh './platform/cicd/scripts/build.sh'
            }
        }

        stage('Push Images') {
            steps {
                sh './platform/cicd/scripts/push.sh'
            }
        }

        stage('Deploy') {
            steps {
                sh './platform/cicd/scripts/deploy.sh'
            }
        }

        stage('Health Check') {
            steps {
                sh './platform/cicd/scripts/healthcheck.sh'
            }
        }
    }

    post {
        always {
            sh './platform/cicd/scripts/cleanup.sh'
        }
    }
}
