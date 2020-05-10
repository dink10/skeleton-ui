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
      withCredentials([ string(credentialsId: 'NPM_AUTH', variable: 'NPM_AUTH') ])
      {
        sh 'git status'
        latestImageTag = z.buildImage()
      }
    }
    stage("Replace tag") {
        sh 'pwd; ls -lah; git status'
        z.replaceImage('k8s/yaml_ui.yaml',latestImageTag)
    }
    stage("Deploy Dev") {
        z.deployApp('devops1','devops1-default-eks','devops1-default-skeleton','k8s/yaml_ui.yaml')

        sh "sleep 30; kubectl get po -n devops1-default-skeleton"
    }
}

if(env.BRANCH_NAME == 'stage') {
  stage('Approve dev environment'){
      input "Deploy to Stage?"
  }

    stage('Verify dev'){
      input "Is dev ok?"
  }

  node("awscli") {
      stage("Mark latest image Dev") {
          z.promoteImage(imageName,"${latestImageTag}",'dev')
      }
      stage("Deploy Prod") {
          z.deployApp('prod','prod-defaulting-eks','stage-skeleton','k8s/ui.yaml')
          sh "sleep 30; kubectl get po -n stage-skeleton"
      }
  }

  stage('Verify stage'){
      input "Is stage ok?"
  }

  node("awscli") {
      stage("Mark latest image STAGE") {
          z.promoteImage(imageName,"${latestImageTag}",'stage')
      }
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
          z.deployApp('prod','prod-defaulting-eks','prod-defaulting-skeleton','k8s/yaml_ui.yaml')

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
