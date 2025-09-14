pipeline {
    agent any

    environment {
        DEPLOY_USER = "ec2-user"
        TEST_SERVER = "50.17.114.180"
        PROD_SERVER = "your-prod-server-ip" // Replace with actual IP if needed
        SSH_KEY = "/var/lib/jenkins/.ssh/AWS-KEY.pem"
        REPO_URL = "https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo " Checking out code from GitHub..."
                git branch: 'master', url: "${REPO_URL}"
            }
        }

        stage('Build') {
            steps {
                echo "🔧 Building Website..."
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
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${TEST_SERVER} '
                            sudo rm -rf /var/www/html/* &&
                            git clone ${REPO_URL} /var/www/html &&
                            echo " Deployment to Testing Server complete."
                        '
                    else
                        echo " ERROR: SSH key not found at ${SSH_KEY}"
                        exit 1
                    fi
                """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo "🧪Running Selenium Tests..."
                sh '''
                    cd selenium-tests
                    node test_validation.js || echo " Selenium test failed"
                '''
            }
        }

        stage('Deploy to Production') {
            when {
                expression { return env.PROD_SERVER != "your-prod-server-ip" }
            }
            steps {
                echo " Deploying to Production Server..."
                sh """
                    if [ -f ${SSH_KEY} ]; then
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${DEPLOY_USER}@${PROD_SERVER} '
                            sudo rm -rf /var/www/html/* &&
                            git clone ${REPO_URL} /var/www/html &&
                            echo " Deployment to Production Server complete."
                        '
                    else
                        echo " ERROR: SSH key not found at ${SSH_KEY}"
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
