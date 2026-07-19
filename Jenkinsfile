pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                echo "========== WORKSPACE =========="
                pwd

                echo "========== DOCKER =========="
                docker --version

                echo "========== DOCKER COMPOSE =========="
                docker compose version
                '''
            }
        }
stage('Login to ECR') {
    steps {
        sh './platform/cicd/scripts/ecr-login.sh'
    }
}

        stage('Build Backend') {
            steps {
                sh '''
                echo "========== BUILDING BACKEND =========="
                docker compose build backend
                '''
            }
        }

stage('Build Frontend') {
    steps {
        sh '''
        echo "========== BUILDING FRONTEND =========="
        docker compose build frontend
        '''
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

    success {
        echo '✅ Deployment Successful'
    }

    failure {
        echo '❌ Deployment Failed'

        sh 'docker compose ps'

        sh 'docker compose logs backend --tail=50'

        sh 'docker compose logs frontend --tail=50'
    }

    always {
        sh 'docker image ls'
    }
}
    
}
