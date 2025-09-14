pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
        TESTING_SERVER = '50.17.114.180'   // Your testing server IP
        PRODUCTION_SERVER = 'xx.xx.xx.xx'  // Your production server IP
        DEPLOY_PATH = '/var/www/html'
        SSH_KEY = '/var/lib/jenkins/.ssh/AWS-KEY.pem' // Your EC2 PEM key
    }

    stages {
        stage('Build') {
            steps {
                echo '🔧 Building Website...'
                sh 'echo "No build step defined yet (e.g., npm install)"'
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo ' Deploying to Testing Server...'
                sh """
                    chmod 600 $SSH_KEY
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER 'sudo rm -rf $DEPLOY_PATH/*'
                    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r * ec2-user@$TESTING_SERVER:$DEPLOY_PATH
                """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo ' Running Selenium Tests...'
                sh 'echo "Run Selenium tests here (e.g., node selenium-tests/test_form.js)"'
            }
        }

        stage('Deploy to Production') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                echo ' Deploying to Production Server...'
                sh """
                    chmod 600 $SSH_KEY
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER 'sudo rm -rf $DEPLOY_PATH/*'
                    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r * ec2-user@$PRODUCTION*_
