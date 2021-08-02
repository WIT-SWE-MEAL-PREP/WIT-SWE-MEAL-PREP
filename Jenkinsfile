node {
  def app
  
  stage('Clone Repository') {
    checkout scm
  }
  
  stage('Build image') {
    app = docker.build("nodeapp", "./mealprep/")
    
  }
  
  stage('Push image to ECR') {
    docker.withRegistry(
      'https://431260421084.dkr.ecr.us-east-2.amazonaws.com',
      'ecr:us-east-2:gdp.aws.credentials'){
      app.push('latest')
    }
  }
}
