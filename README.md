# Image processing api

Simple api that resizes an image with customized height and width

## Getting Started

### Scripts available 

* npm run build
* npm run lint
* npm run prettier
* npm run start
* npm run test

### How to use

* npm run build
* node build/.
* The server will listen to port 3000
* Endpoint : http://localhost:3000/main/process?height=(Height here)&width=(Width here)&imageName=(image name here)
* Available Images :
    * encenadaport
    * jford
    * icelandwaterfall
    * palmtunnel
    * santamonica
    
## Endpoint examples

* http://localhost:3000/main/process?height=400&width=200&imageName=santamonica
* http://localhost:3000/main/process?height=600&width=300&imageName=icelandwaterfall
