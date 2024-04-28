# USER APPLICATION

## Basic Information

- Running on port 3001 


## Dockerizing the User  Application

Create docker image locally
```
docker build -t <your_docker_image_name> -f ./docker/Dockerfile.user .
```
To run the docker image

```
docker run -d -p 3001:3001 <your_docker_image_name>
```
> Important note

- Make sure to add your postgress url in .env file

	OR
	
- If running locally then make sure to start postgress at port **5432** by adding to the same network 