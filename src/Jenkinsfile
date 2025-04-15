pipeline {
    agent any

    environment {
        BUILD_DIR = "dist" // Directory where the production build will be generated
        DEPLOY_DIR = "/var/www/react-crash-course" // Directory on the server to deploy the app
    }

    stages {
        stage('Checkout Code') {
            steps {
               echo 'Hello World'
                // Clone the repository
                git branch: 'main', url: 'https://github.com/skolarkar/meal-search-app/'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                // Build the React app for production
                sh 'npm run dev -- --port 3000'
            }
        }

       
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}