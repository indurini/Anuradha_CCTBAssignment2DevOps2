pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
        TESTING_SERVER = '50.17.114.180'   // WebServer EC2
        PRODUCTION_SERVER = 'xx.xx.xx.xx'  // TODO: Replace with actual Prod server IP
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
                sshagent(['aws-ssh-key']) { // Use the ID of your Jenkins SSH credential
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "sudo rm -rf $DEPLOY_PATH/*"
                        ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "git clone $REPO_URL $DEPLOY_PATH"
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
                sshagent(['aws-ssh-key']) { // Use the same credential or another if different
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "sudo rm -rf $DEPLOY_PATH/*"
                        ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL $DEPLOY_PATH"
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
