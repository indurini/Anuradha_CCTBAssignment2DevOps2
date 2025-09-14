pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
        TESTING_SERVER = '50.17.114.180'   // Replace with actual Testing server IP
        PRODUCTION_SERVER = 'xx.xx.xx.xx'  // Replace with actual Production server IP
        DEPLOY_PATH = '/var/www/html'
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
                sshagent(['aws-ec2-key']) {  // Use your Jenkins SSH credential ID here
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER 'sudo rm -rf $DEPLOY_PATH/*'
                        ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER 'git clone $REPO_URL $DEPLOY_PATH'
                    """
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo ' Running Selenium Tests...'
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        sh 'node selenium-tests/test_form.js'
                        sh 'node selenium-tests/test_validation.js'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS')
                }
            }
            steps {
                echo ' Deploying to Production Server...'
                sshagent(['aws-ec2-key']) {  // Use the same Jenkins SSH credential ID
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER 'sudo rm -rf $DEPLOY_PATH/*'
                        ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER 'git clone $REPO_URL $DEPLOY_PATH'
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished with status: ${currentBuild.currentResult}"
        }
    }
}
