cd ./k8s/
kubectl apply -f user
kubectl apply -f nginx-configmap.yaml
kubectl apply -f nginx-gateway.yaml
kubectl port-forward svc/nginx-gateway 4000:80

urls:
localhost:4000/login/
localhost:4000/register/
localhost:4000/saga/

para probar nuevas cosas recomiendo subirlo a docker hub y cambiarlo en el respectivo .yaml