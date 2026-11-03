
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        IMAGE_NAME = 'cloudpulse-react'
        CONTAINER_NAME = 'cloudpulse-app'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sibitharan/CloudPulse-React-AWS-Amplify.git'
            }
        }

        stage('Build Docker Image') {
    steps {
        bat '"C:/Users/HAI/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe" version'

        bat '"C:/Users/HAI/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe" build -t cloudpulse-react:latest .'
    }
}

        stage('Build React Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t cloudpulse-react:latest .'
            }
        }
    }
}
