

pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        IMAGE_NAME = 'cloudpulse-react'
        CONTAINER_NAME = 'cloudpulse-app'
        DOCKER = 'C:/Users/HAI/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sibitharan/CloudPulse-React-AWS-Amplify.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build React Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"%DOCKER%" version'
                bat '"%DOCKER%" build -t cloudpulse-react:latest .'
            }
        }

        stage('Deploy Application') {
            steps {
                bat '"%DOCKER%" rm -f cloudpulse-app'
                bat '"%DOCKER%" run -d --name cloudpulse-app -p 8081:80 cloudpulse-react:latest'
            }
        }
    }
}
