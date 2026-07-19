pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Environment') {
            steps {
                sh 'docker version'
                sh 'docker compose version'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker compose build backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker compose build frontend'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:8000/health/'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
