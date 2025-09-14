pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
            }
        }

        stage('Build') {
            steps {
                echo 'No build step needed for static site'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to /var/www/html'
                sh 'sudo cp index.html main.js style.css /var/www/html/'
            }
        }
    }
}
