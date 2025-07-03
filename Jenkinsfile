pipeline {
  agent any

  environment {
    // ACR & Image settings
    ACR_NAME        = 'acematureacr'                                    // e.g. 'myregistry'
    IMAGE_REPO      = "${ACR_NAME}.azurecr.io/ace-fe"
    IMAGE_TAG       = "${env.BUILD_NUMBER}"
    FULL_IMAGE      = "${IMAGE_REPO}:${IMAGE_TAG}"

    // Helm settings
    HELM_RELEASE    = 'ace-fe-helmchart'
    HELM_CHART_PATH = './ace-fe-helmchart'
    HELM_NAMESPACE  = 'ace-project'

    // Jenkins credential IDs
    ACR_CRED_ID         = 'acr-creds'
    AZURE_SP_CRED_ID    = 'azure-sp'
    AZURE_TENANT_ID_ID  = 'azure-tenant-id'       // Secret Text
    AZURE_SUB_ID_ID     = 'azure-subscription-id' // Secret Text
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        script {
          docker.withRegistry("https://${ACR_NAME}.azurecr.io", ACR_CRED_ID) {
            def img = docker.build(FULL_IMAGE)
            img.push()
            // Optional: push latest tag
            // img.push('latest')
          }
        }
      }
    }

    stage('Deploy to AKS via Helm') {
      steps {
        script {
          // Define a temporary kubeconfig path
          def kubeconfig = 'kubeconfig-temp.yaml'

          // Use SP and other Azure credentials securely
          withCredentials([
            usernamePassword(credentialsId: AZURE_SP_CRED_ID, usernameVariable: 'AZ_CLIENT_ID', passwordVariable: 'AZ_CLIENT_SECRET'),
            string(credentialsId: AZURE_TENANT_ID_ID, variable: 'AZ_TENANT_ID'),
            string(credentialsId: AZURE_SUB_ID_ID, variable: 'AZ_SUBSCRIPTION_ID')
          ]) {
            sh """
              az login --service-principal -u $AZ_CLIENT_ID -p $AZ_CLIENT_SECRET --tenant $AZ_TENANT_ID
              az account set --subscription $AZ_SUBSCRIPTION_ID
              az aks get-credentials --resource-group <RG_NAME> --name <AKS_NAME> --file ${kubeconfig} --overwrite-existing

              export KUBECONFIG=${kubeconfig}
              helm dependency update ${HELM_CHART_PATH}

              helm upgrade --install ${HELM_RELEASE} ${HELM_CHART_PATH} \
                --namespace ${HELM_NAMESPACE} \
                --create-namespace \
                --set image.repository=${IMAGE_REPO} \
                --set image.tag=${IMAGE_TAG}
            """
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment succeeded: ${FULL_IMAGE}"
    }
    failure {
      echo "❌ Deployment failed"
    }
  }
}
