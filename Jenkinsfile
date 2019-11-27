@Library('gismart-devops')
import org.gismart.DevOps
def z = new org.gismart.DevOps()

environment {
    AWS_DEFAULT_REGION='eu-west-1'
}
imageName = '978577353296.dkr.ecr.eu-west-1.amazonaws.com/skeleton-ui'
node ("awscli") {

  stage("Checkout") {
      checkout scm
  }
   stage("Build"){
       sh 'git status'
       latestImageTag = z.buildImage()
   }
    stage("Replace tag") {
        sh 'pwd; ls -lah; git status'
        z.replaceImage('k8s/yaml_admin.yaml',latestImageTag)
    }
    stage("Deploy Dev") {
        z.deployApp('devops1','devops1-default-eks','devops1-default-skeleton','k8s/yaml_admin.yaml')

        sh "sleep 30; kubectl get po -n devops1-default-skeleton"
    }
}

if(env.BRANCH_NAME == 'master') {
  stage('Approve dev environment'){
      input "Deploy to prod?"
  }

  node("awscli") {
      stage("Mark latest image DEV") {
          z.promoteImage(imageName,"app-${latestImageTag}",'dev')
      }
      stage("Deploy Prod") {
          z.deployApp('prod','prod-defaulting-eks','prod-defaulting-skeleton','k8s/yaml_admin.yaml')

          // Applying ingress configuration for appstor.com URL
          z.deployApp('prod','prod-defaulting-eks','prod-defaulting-skeleton','k8s/ingress/prod/appstor-com.yml')

          // Applying ingress configuration for short admin URL
          z.deployApp('prod','prod-defaulting-eks','prod-defaulting-skeleton','k8s/ingress/prod/skeleton-admin-gismart-xyz.yml')

          sh "sleep 30; kubectl get po -n prod-defaulting-skeleton"
      }
  }

  stage('Verify prod'){
      input "Is production ok?"
  }

  node("awscli") {
      stage("Mark latest image PROD") {
          z.promoteImage(imageName,"app-${latestImageTag}",'prod')
      }
  }
}
