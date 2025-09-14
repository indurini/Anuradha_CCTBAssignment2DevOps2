pipeline {
    agent any

    environment {
        TEST_RESULT_FILE = 'test_result.txt'
        REPO_URL = 'https://github.com/indurini/Anuradha_CCTBAssignment2DevOps2.git'
        TESTING_SERVER = '50.17.114.180' // WebServer EC2
        PRODUCTION_SERVER = 'your-production-server-ip' // Replace with actual IP
    }

    stages {
        stage('Build') {
            steps {
                echo '🔧 Building Website...'
                // Add build steps here if needed (e.g., npm install)
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo ' Deploying to Testing Server...'
                sh """
                    ssh ec2-user@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                    ssh ec2-user@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo '🧪 Running Selenium Tests...'
                script {
                    try {
                        sh 'node selenium-tests/test_form.js'
                        sh 'node selenium-tests/test_validation.js'
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    } catch (Exception e) {
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    return readFile(env.TEST_RESULT_FILE).trim() == 'true'
                }
            }
            steps {
                echo ' Deploying to Production Server...'
                sh """
                    ssh ec2-user@$PRODUCTION_SERVER "sudo rm -rf /var/www/html/*"
                    ssh ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL /var/www/html"
                """
            }
        }
    }
}
