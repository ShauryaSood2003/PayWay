# MERCHANT APPLICATION

## Basic Information

- Running on port 3000


## Dockerizing the Merchant Application

Create docker image locally
```
docker build -t <your_docker_image_name> -f ./docker/Dockerfile.merchant .
```
To run the docker image

```
docker run -d -p 3000:3000 <your_docker_image_name>
```
> Important note

- Make sure to add your postgress url in .env file

	OR
	
- If running locally then make sure to start postgress at port **5432** by adding to the same network 