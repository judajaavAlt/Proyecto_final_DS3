Para ejecutar este microservicio:

1. minikube start
2. cd k8s
3. kubectl apply -f user
4. kubectl apply -f nginx-configmap.yaml
5. kubectl apply -f nginx-gateway.yaml
6. kubectl port-forward svc/nginx-gateway 4000:80

URLS:
localhost:4000/login/
localhost:4000/register/
localhost:4000/saga/
