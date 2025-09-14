pipeline {
    agent any

    environment {
        // Example: define environment variables here if needed
        DEPLOY_USER = "ec2-user"
        TEST_SERVER = "50.17.114.180"
        PROD_SERVER = "your-prod-server-ip"
        SSH_KEY = "/var/lib/jenkins/.ssh/AWS-KEY.pem"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo " Checking out code from GitHub..."
                git branch: 'master', url: 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
            }
        }

        stage('Build') {
            steps {
                echo "🔧 Building Website..."
                // Example: run npm install if it is a Node.js app
                sh '''
                    echo "No build steps defined yet (e.g., npm install)"
                    # npm install
                    # npm run build
                '''
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo " Deploying to Testing Server..."
                sh """
                    if [ -f ${SSH_KEY} ]; then
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${TEST_SERVER} 'sudo rm -rf /var/www/html/*'
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${TEST_SERVER} 'echo "Files cleaned. Ready for deployment."'
                    else
                        echo "ERROR: SSH key not found at ${SSH_KEY}"
                        exit 1
                    fi
                """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo "🧪 Running Selenium Tests..."
                // Add Selenium test commands here
                sh '''
                    echo "No Selenium tests configured yet"
                    # python -m pytest tests/selenium
                '''
            }
        }

        stage('Deploy to Production') {
            steps {
                echo " Deploying to Production Server..."
                sh """
                    if [ -f ${SSH_KEY} ]; then
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${PROD_SERVER} 'sudo rm -rf /var/www/html/*'
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${PROD_SERVER} 'echo "Files cleaned. Ready for deployment."'
                    else
                        echo "ERROR: SSH key not found at ${SSH_KEY}"
                        exit 1
                    fi
                """
            }
        }
    }

    post {
        success {
            echo " Pipeline finished successfully!"
        }
        failure {
            echo " Pipeline finished with failure."
        }
        always {
            echo " Pipeline execution completed."
        }
    }
}
