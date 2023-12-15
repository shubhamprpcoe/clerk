#Zoom Auth microservice

How to run docker image?

cd cleark
docker build .
docker run <ID that genrated>

<!-- eg:   docker run sha256:18fcb44ca2485db132a92aeee0f10cf868e58969b5013afd3220bbc59e50213c -->

How to kill docker terminal?

docker ps
copy CONTAINER ID
docker kill <CONTAINER ID>
<!-- eg: docker kill e3de97091930 -->