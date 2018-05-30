let nodeNum = 0;
let nodes = [];

let connectingNodes = new Set([]);

function generateNewNode(){
    return {
        id: nodeNum++,
        content: "",
        connections: null,
    };
}



function setCurrentNode(node){
    currentNode = node;
}

function getConnectingNodesHtml(){
    let connectingNodes = document.getElementById('new-node-connections');
    while(connectingNodes.firstChild){
        connectingNodes.removeChild(connectingNodes.firstChild);
    }
    return connectingNodes;
};

function renderConnectingNodes(){
    console.log('attempting render');
    // update for set
    let connectingNodesHtml = getConnectingNodesHtml();
    let connectingNodesArray = Array.from(connectingNodes);

    for(let i = 0; i < connectingNodesArray.length; i++){
        let node = connectingNodesArray[i];
        let nodeHtml = document.createElement('li');
        let nodeText = document.createTextNode(node.id);
        let removeNodeButton = document.createElement('button');
        let removeNodeButtonText = document.createTextNode('Remove');
        removeNodeButton.appendChild(removeNodeButtonText);
        removeNodeButton.setAttribute('data-node-id', node.id);
        removeNodeButton.addEventListener('click', removeNodeFromCollection);
        nodeHtml.appendChild(nodeText);
        nodeHtml.appendChild(removeNodeButton);
        connectingNodesHtml.appendChild(nodeHtml);
    }
}

function removeNodeFromCollection(){
    let idNodeToRemove = parseInt(this.getAttribute('data-node-id'));
    connectingNodes.forEach(function(node){
        if(node.id === idNodeToRemove){
            connectingNodes.delete(node);
        }
    });
    renderConnectingNodes();
}

let newNodeCreatorButton = document.getElementById('new-node-creator');
let nodeConnectionEditorButton = document.getElementById('node-connector-editor');

newNodeCreatorButton.onclick = function(){
    let newNodeContent = document.getElementById('new-node-content').value;
    let newNode = generateNewNode();
    newNode.content = newNodeContent;
    newNode.connections = new Set(connectingNodes);
    console.log(connectingNodes);

    nodes.push(newNode);

    clearContentTextArea();
    clearConnectingNodes();
    drawNodes();
}

function clearContentTextArea(){
    let content = document.getElementById('new-node-content');
    content.value = '';
}

function clearConnectingNodes(){
    connectingNodes.clear();
    renderConnectingNodes();

}

let nodeObjects = document.getElementsByClassName('node');
for(let i = 0; i < nodeObjects.length; i++){
    nodeObjects[i].addEventListener('click', getNode, false);
}

function getNode(){
    return this;
}


nodeConnectionEditorButton.onclick = function(){
    let nodes = document.getElementsByClassName('node');
    for(let i = 0; i < nodes.length; i++){
        nodes[i].style.border = '3px dotted black';
    }
}

function getNodeMap(){
    let gameMap = document.getElementById('game-map');
    while(gameMap.firstChild){
        gameMap.removeChild(gameMap.firstChild);
    }
    return gameMap;
}

function drawNodes(){

    let gameMap = getNodeMap();

    nodes.map(node => {
        let htmlNode = document.createElement('div');
        htmlNode.classList.add('node');

        let nodeId = node.id;
        let htmlNodeHeader = document.createElement('h4');
        let htmlNodeHeaderText = document.createTextNode(nodeId);
        htmlNodeHeader.appendChild(htmlNodeHeaderText);
        htmlNode.appendChild(htmlNodeHeader);

        let nodeContent = node.content;
        let htmlNodeContent = document.createElement('p');
        let htmlNodeContentText = document.createTextNode(nodeContent);
        htmlNodeContent.appendChild(htmlNodeContentText);
        htmlNode.appendChild(htmlNodeContent);
        
        let nodeConnections = node.connections;

        htmlNode.addEventListener('click', addNodeToCollection);

        gameMap.appendChild(htmlNode);
    

    });
}


function addNodeToCollection(){
    // TODO: Find a better way of tracing the ID
    let clickedNodeId = parseInt(this.firstChild.innerText);
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].id === clickedNodeId){
            connectingNodes.add(nodes[i]);
        }
    }
    renderConnectingNodes();
}